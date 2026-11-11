import { enquiryTopics, publications, markets } from '../../catalogue'
import { requestObject, field } from '../request'

const respond=(error:string,status:number)=>Response.json({error},{status})
export async function POST(request:Request) {
  const b=await requestObject(request)
  if(!b) return respond('Please check your enquiry and try again.',400)
  if(b.website) return Response.json({ok:true})
  const name=field(b.name,120), email=field(b.email,254), organisation=field(b.organisation,160)
  const purpose=field(b.purpose,1500), topic=field(b.topic,240), market=field(b.market,60)
  const allowedTopic=publications.includes(topic)||enquiryTopics.includes(topic)
  if(b.consent!==true||!name||!organisation||!purpose||!allowedTopic||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||(market&&!markets.some(([label])=>label===market))) {
    return respond('Complete all five questions and acknowledge the privacy notice.',400)
  }

  const key=process.env.RESEND_API_KEY, from=process.env.ENQUIRY_FROM_EMAIL
  if(!key||!from) return respond('Online submission is unavailable. Please contact info@sve-int.com.',503)
  const subject=(publications.includes(topic)?'Publication request: ':'Corporate enquiry: ')+topic
  try {
    const response=await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},
      body:JSON.stringify({
        from,to:['info@sve-int.com'],reply_to:email,subject,
        text:['SVE International website enquiry','Topic: '+topic,market?'Jurisdiction: '+market:'',
          'Name: '+name,'Email: '+email,'Organisation: '+organisation,'Purpose: '+purpose,
          'Privacy acknowledgement: Yes'].filter(Boolean).join('\n\n'),
      }),
      signal:AbortSignal.timeout(10000)
    })
    if(!response.ok) {
      console.error('Enquiry provider response status:',response.status)
      return respond('We could not deliver your enquiry. Please try again or email info@sve-int.com.',502)
    }
    return Response.json({ok:true})
  } catch {
    console.error('Enquiry provider request failed')
    return respond('We could not deliver your enquiry. Please try again or email info@sve-int.com.',502)
  }
}
