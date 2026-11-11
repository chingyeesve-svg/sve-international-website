import pages from '../content.json'
import { notFound } from 'next/navigation'
import { PageContent } from '../page-content'
type Props = {params: Promise<{slug:string}>}
const other = {id:0,slug:'other-jurisdictions',title:'Other Jurisdictions',html:'<section class="plain-hero"><p class="kicker">Global Presence</p><h1>Other Jurisdictions</h1><p>Considering a market beyond those listed? Share your proposed location and business objectives with our team.</p></section><section class="site-section"><a class="sve-button" href="/ask-sve?market=Other%20Jurisdictions#enquiry">Contact us to explore</a> <a href="/global-presence">View all jurisdiction pathways</a></section>'}
const all = [...pages.filter(x=>x.slug!=='home'),other]
export function generateStaticParams() { return all.map(x=>({slug:x.slug})) }
export const dynamicParams=false
export async function generateMetadata({params}:Props) {
  const {slug}=await params
  const page=all.find(x=>x.slug===slug)
  return page ? {title:page.title} : {}
}
export default async function Page({params}:Props) {
  const {slug}=await params
  const page=all.find(x=>x.slug===slug)
  if(!page) notFound()
  return <PageContent page={page}/>
}
