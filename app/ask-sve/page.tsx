import Concierge from './concierge'
import { enquiryTopics,markets,publications } from '../catalogue'
export const metadata={title:'Ask SVE',description:'Explore SVE’s services and publications or send an enquiry to our team.'}
export default async function AskSVE({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const params=await searchParams
  const requested=typeof params.publication==='string'?params.publication:''
  const subject=typeof params.topic==='string'?params.topic:''
  const market=markets.find(([label])=>label===params.market)?.[0]||''
  const topic=publications.includes(requested)?requested:enquiryTopics.includes(subject)?subject:market?enquiryTopics[1]:subject?enquiryTopics[4]:''
  const online=Boolean(process.env.RESEND_API_KEY&&process.env.ENQUIRY_FROM_EMAIL)
  return <main id="main"><section className="plain-hero"><p className="kicker">SVE International</p><h1>How can we help?</h1><p>Find a relevant advisory pathway, request a publication or tell us about your business objectives.</p></section><Concierge topic={topic} market={market} online={online}/></main>
}
