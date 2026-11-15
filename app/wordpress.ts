/**
 * SVE headless WordPress adapter (v0.1).
 * Server-only. Private staging content is never fetched by the browser.
 * Activation requires an explicit environment flag and server credentials.
 */
import 'server-only'

export type WPPage = {
  id:number
  slug:string
  status:string
  modified:string
  title:{rendered:string}
  excerpt?:{rendered:string}
  content?:{rendered:string}
  featured_media?:number
}
const site = 'https://sveinternationalgroupcorporate.wpcomstaging.com'
const allowed = new Set(['about-sve','expertise','leadership','global-presence','group-ecosystem','market-intelligence','applied-technology-ai','insights'])
export const wordpressEnabled = () => process.env.SVE_WP_HEADLESS_ENABLED === 'true'
const credentials = () => {
  const user=process.env.SVE_WP_USERNAME
  const password=process.env.SVE_WP_APPLICATION_PASSWORD
  if(!user||!password) return null
  return 'Basic '+Buffer.from(user+':'+password).toString('base64')
}
export async function getWordPressPage(slug:string):Promise<WPPage|null> {
  if(!wordpressEnabled()||!allowed.has(slug)) return null
  const auth=credentials()
  if(!auth) return null
  try {
    const response=await fetch(site+'/wp-json/wp/v2/pages?slug='+encodeURIComponent(slug)+'&_fields=id,slug,status,modified,title,excerpt,content,featured_media',{
      headers:{Authorization:auth,Accept:'application/json'},
      next:{revalidate:300},
      signal:AbortSignal.timeout(8000)
    })
    if(!response.ok) return null
    const pages:WPPage[]=await response.json()
    const page=pages.find(x=>x.slug===slug&&x.status==='publish')
    return page??null
  } catch {return null}
}
/** Only metadata is consumed by default. Gutenberg HTML is not injected into the cinematic frontend. */
export async function getWordPressPageMetadata(slug:string) {
  const page=await getWordPressPage(slug)
  return page?{id:page.id,slug:page.slug,modified:page.modified,title:page.title.rendered}:null
}
