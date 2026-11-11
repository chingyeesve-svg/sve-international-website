import articles from './articles.json'
import { markets, enquiryHref } from './catalogue'

export const marketCards = () => <section className="site-section" id="market-intelligence"><p className="kicker">Global presence</p><h2>Local Perspectives. Broader Opportunities.</h2><div className="site-cards">{markets.map(([name,slug]) => <article key={slug}><h3><a href={'/'+slug}>{name}</a></h3><a href={'/ask-sve?market='+encodeURIComponent(name)+'#enquiry'}>Contact us to explore</a></article>)}</div></section>
export const insightCards = () => <section className="site-section" id="latest"><p className="kicker">SVE Insights</p><h2>All news &amp; insights</h2><div className="site-cards">{articles.map(({slug,title,excerpt,publication}) => <article key={slug}><h3><a href={'/insights/'+slug}>{title}</a></h3><p>{excerpt}</p><a href={enquiryHref(publication)}>Request publication</a></article>)}</div></section>

export function PageContent({page}: {page:{id:number;slug:string;title:string;html:string}}) {
  const slices = page.html.split(/<!-- render:(markets|leadership|insights) -->/)
  return <main className={'wp-content page-id-'+page.id} id="main">
    {slices.map((part,i) => i%2===0 ? <div key={i} dangerouslySetInnerHTML={{__html:part}}/> :
      part==='markets' ? <div key={i}>{marketCards()}</div> :
      part==='insights' ? <div key={i}>{insightCards()}</div> :
      <section className="site-section" key={i}><p className="kicker">Leadership</p><h2>Meet the people behind our work.</h2><a className="sve-button" href="/leadership">Explore leadership</a></section>)}
  </main>
}
