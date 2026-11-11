"""Build the site content snapshot from the selected WordPress page and Insight exports."""
import html, json, re
from pathlib import Path
from urllib.parse import urlsplit, unquote, quote

root = Path(__file__).resolve().parent.parent
pages = json.loads((root/'wordpress-source.json').read_text())
insights = json.loads((root/'wordpress-insights.json').read_text())
assets = root/'public/media'
aliases = {'/insights-layout-qa-v01':'/insights','/privacy-notice-3':'/privacy-policy',
           '/insights-publication-enquiry-qa-v01':'/ask-sve', '/home':'/',
           '/insights/frozen-wealth-broken-families-estate-planning-and-family-protection':'/insights/frozen-wealth-broken-families-why-every-malaysian-needs-a-will'}
asset_url = r'https://sveinternationalgroupcorporate\.wpcomstaging\.com/wp-content/uploads/[^\s\'"<>),]+'
missing = set()

def asset(u):
    name=unquote(urlsplit(u).path.split('/')[-1])
    if name.startswith('sve-international-approved-logo') or name == 'sve-international-user-approved-logo.jpeg':
        name='sve-international-approved-logo-cropped.jpg'
    if (assets/name).is_file():
        return '/media/'+quote(name)
    missing.add(name)
    return '/media/editorial-fallback.svg'

def rewrite_link(m):
    tag, delimiter, raw = m.groups()
    url=html.unescape(raw)
    if url.startswith('https://sveinternationalgroupcorporate.wpcomstaging.com/'):
        url=url.removeprefix('https://sveinternationalgroupcorporate.wpcomstaging.com')
    if url.startswith('/') and not url.startswith('//'):
        parsed=urlsplit(url)
        path=parsed.path.rstrip('/') or '/'
        path=aliases.get(path,path)
        if path == '/insights/the-legal-pulse-of-ageing':
            path='/insights-publications-library'
        url=path+('?' + parsed.query if parsed.query else '')+('#'+parsed.fragment if parsed.fragment else '')
    if re.match(r'\s*(?:javascript|data|vbscript):',url,re.I):
        url='#'
    return f'{tag}{delimiter}{html.escape(url,quote=True)}{delimiter}'

def transform(x):
    c=x['content']
    # Replace plugin-backed blocks with real site sections.
    c=re.sub(r'<!-- wp:jetpack/contact-form\b.*?<!-- /wp:jetpack/contact-form -->',
             '<div class="wp-block-jetpack-contact-form"><a class="sve-button" href="/ask-sve?topic=Corporate%20enquiry#enquiry">Open enquiry form</a></div>',c,flags=re.S)
    c=c.replace('<!-- wp:sve/jurisdictions /-->','<!-- render:markets -->')
    c=c.replace('<!-- wp:sve/leadership /-->','<!-- render:leadership -->')
    c=c.replace('<!-- wp:sve/insights-browser /-->','<!-- render:insights -->')
    c=re.sub(r'<!-- (?!render:).*?-->', '', c,flags=re.S)
    # The withheld Legal Pulse card is removed, not redirected to another publication.
    if x['slug']=='insights-publications-library':
        c=re.sub(r'<article\b[^>]*>(?:(?!</article>).)*?the-legal-pulse-of-ageing(?:(?!</article>).)*?</article>', '', c,flags=re.S)
    c=re.sub(r'(\bhref\s*=\s*)(["\'])([^"\']+)\2',rewrite_link,c,flags=re.I)
    c=re.sub(asset_url,lambda m:asset(m[0]),c)
    # Imported editor styles scope some selectors to WordPress's body page ID.
    c=re.sub(r'body\.page-id-(\d+)',r'.page-id-\1',c)
    # Do not describe a decorative fallback as a photograph or logo.
    c=re.sub(r'<img\b[^>]*src="/media/editorial-fallback.svg"[^>]*>',lambda m:
         re.sub(r'\balt="[^"]*"', 'alt=""', m[0]) if 'alt="' in m[0] else m[0].replace('<img','<img alt=""',1),c)
    if x['slug']=='global-presence':
        def market_cta(match):
            card=match[0]
            label=re.search(r'<h3[^>]*>(.*?)</h3>',card,re.S)
            if not label: return card
            name=html.unescape(re.sub(r'<[^>]+>','',label[1])).strip()
            if name=='Other Jurisdictions':
                card=card.replace('/contact?market=Other%20Jurisdictions','/other-jurisdictions').replace('>Contact us</a>','>Explore jurisdiction</a>')
            return card.replace('</div></article>',f'<a class="sp-market-card__link market-enquiry" href="/ask-sve?market={quote(name)}#enquiry">Contact us to explore</a></div></article>')
        c=re.sub(r'<article class="sp-market-card(?: [^"]*)?".*?</article>',market_cta,c,flags=re.S)

    c=re.sub(r'(<a\b[^>]*>)([^<]*?)\s*[↗→]\s*(</a>)',r'\1\2\3',c,flags=re.I)
    return {'id':x['id'],'slug':x['slug'],'title':html.unescape(x['title']),'html':c}

articles=[]
for item in insights:
    title=html.unescape(item['title'])
    c=item['content']
    pub=re.search(r'publication=([^"\s]+)',c)
    publication=unquote(pub[1]) if pub else title
    # List only catalogue information until the editorial draft is cleared for public release.
    articles.append({'slug':item['slug'],'title':title,'publication':publication,
                     'excerpt':html.unescape(item['excerpt']), 'description':item['meta']['advanced_seo_description']})
compiled = [transform(p) for p in pages]
(root/'app/content.json').write_text(json.dumps(compiled,ensure_ascii=False,indent=2)+'\n')
(root/'app/articles.json').write_text(json.dumps(articles,ensure_ascii=False,indent=2)+'\n')
(root/'scripts/missing-media.json').write_text(json.dumps(sorted(missing),ensure_ascii=False,indent=2)+'\n')
print(f'Imported {len(compiled)} pages and {len(articles)} catalogue entries; {len(missing)} staging assets unavailable.')
