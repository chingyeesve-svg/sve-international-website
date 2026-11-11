'use client'
import { useState,type FormEvent } from 'react'
import { publications,enquiryTopics } from '../catalogue'
type Reply={answer:string;mode:'directory'|'ai';sources:{title:string;href:string;text:string}[]}
export default function Concierge({topic,market,online}:{topic:string;market:string;online:boolean}) {
  const [answer,setAnswer]=useState<Reply|null>(null)
  const [asking,setAsking]=useState(false)
  const [askError,setAskError]=useState('')
  const [status,setStatus]=useState('')
  const [sending,setSending]=useState(false)
  const [success,setSuccess]=useState(false)

  async function ask(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form=event.currentTarget
    setAsking(true);setAskError('');setAnswer(null)
    try {
      const res=await fetch('/api/concierge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:new FormData(form).get('query')})})
      const result=await res.json()
      if(!res.ok){setAskError(result.error||'Please try again.');return}
      setAnswer(result)
    } catch {setAskError('Ask SVE is temporarily unavailable. Please use the enquiry form or contact our team.')}
    finally{setAsking(false)}
  }

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form=event.currentTarget
    const data=new FormData(form)
    setSending(true);setSuccess(false);setStatus('')
    try{
      const res=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...Object.fromEntries(data),market,consent:data.get('consent')==='on'})})
      const body=await res.json()
      if(!res.ok){setStatus(body.error||'Please try again or email our team.');return}
      setSuccess(true);setStatus('Thank you. Your enquiry was sent to the SVE team.');form.reset()
    }catch{setStatus('Your enquiry could not be sent. Please try again or email our team.')}
    finally{setSending(false)}
  }

  return <div className="concierge-grid site-section">
    <section className="form-panel" aria-labelledby="ask-title">
      <p className="kicker">Find the right pathway</p><h2 id="ask-title">Ask SVE</h2>
      <p>Explore SVE’s services, markets and publications. Please don’t enter confidential or personal information here.</p>
      <form onSubmit={ask}><label htmlFor="query">What would you like to explore?</label><textarea id="query" name="query" required maxLength={500} rows={3} placeholder="For example: Which services can help with market entry into Singapore?"/>
        <button className="sve-button" disabled={asking}>{asking?'Finding information…':'Find guidance'}</button>
      </form>
      {askError&&<p role="alert">{askError}</p>}
      {answer&&<div className="concierge-answer" aria-live="polite"><p className="kicker">{answer.mode==='ai'?'AI concierge':'Website directory'}</p><p>{answer.answer}</p><ul>{answer.sources.map(x=><li key={x.href}><a href={x.href}>{x.title}</a></li>)}</ul></div>}
      <p className="support-links"><a href="https://wa.me/601127166016" target="_blank" rel="noopener noreferrer">WhatsApp SVE</a><a href="/contact">Contact options</a></p>
    </section>
    <section className="form-panel" id="enquiry" aria-labelledby="enquiry-title">
      <p className="kicker">Speak to our team</p><h2 id="enquiry-title">Send an enquiry</h2>
      {market&&<p>Jurisdiction: <strong>{market}</strong></p>}
      <form onSubmit={submit}>
        <label htmlFor="topic">1. Publication or enquiry topic</label>
        <select id="topic" name="topic" required defaultValue={topic}>
          <option value="">Select a topic</option><optgroup label="Corporate enquiries">{enquiryTopics.map(x=><option key={x}>{x}</option>)}</optgroup>
          <optgroup label="Publications">{publications.map(x=><option key={x}>{x}</option>)}</optgroup>
        </select>
        <label htmlFor="full-name">2. Full name</label><input id="full-name" name="name" autoComplete="name" required maxLength={120}/>
        <label htmlFor="business-email">3. Business email</label><input id="business-email" name="email" type="email" autoComplete="email" required maxLength={254}/>
        <label htmlFor="organisation">4. Organisation</label><input id="organisation" name="organisation" autoComplete="organization" required maxLength={160}/>
        <label htmlFor="purpose">5. How can we help?</label><textarea id="purpose" name="purpose" required maxLength={1500} rows={3}/>
        <div className="honey" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
        <label className="consent"><input type="checkbox" name="consent" required/><span>I agree that SVE International may use this information to review and respond to my enquiry. See our <a href="/privacy-policy">Privacy Policy</a>.</span></label>
        {online?<button className="sve-button" disabled={sending}>{sending?'Sending…':'Submit enquiry'}</button>:
        <p role="status">Online submission is unavailable. <a href={'mailto:info@sve-int.com?subject='+encodeURIComponent(topic||'SVE International enquiry')}>Email the SVE team</a>.</p>}
        {status&&<p role={success?'status':'alert'}>{status}</p>}
      </form>
    </section>
  </div>
}
