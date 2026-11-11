import articles from '../../articles.json'
import { enquiryHref } from '../../catalogue'
import { notFound } from 'next/navigation'
type Props = {params: Promise<{article:string}>}
export function generateStaticParams() {return articles.map(x=>({article:x.slug}))}
export const dynamicParams=false
export async function generateMetadata({params}:Props) {
  const {article}=await params
  const data=articles.find(x=>x.slug===article)
  return data ? {title:data.title,description:data.description} : {}
}
export default async function Insight({params}:Props) {
  const {article}=await params
  const data=articles.find(x=>x.slug===article)
  if(!data) notFound()
  return <main id="main"><section className="plain-hero"><p className="kicker">SVE Insights</p><h1>{data.title}</h1></section><article className="site-section narrow"><h2>What this insight explores</h2><p>{data.summary}</p><p><a className="sve-button" href={enquiryHref(data.publication)}>Request full insight</a></p><a href="/insights">Back to Insights</a></article></main>
}
