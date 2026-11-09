// Vercel serverless endpoint. Configure RESEND_API_KEY and ENQUIRY_FROM_EMAIL in Vercel.
// The sender domain must be verified with the email provider before submissions work.
const LIMIT=10000;
function clean(value,max){return typeof value==='string'?value.trim().slice(0,max):''}
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'})}
 const raw=JSON.stringify(req.body||{});if(raw.length>LIMIT)return res.status(413).json({error:'Payload too large'});
 const b=req.body||{};if(b.website)return res.status(200).json({ok:true});
 if(b.consent!=='on')return res.status(400).json({error:'Consent required'});
 const publication=clean(b.publication,200),name=clean(b.name,120),email=clean(b.email,254),organisation=clean(b.organisation,160),purpose=clean(b.purpose,1500);
 if(!publication||!name||!organisation||!purpose||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'Invalid enquiry'});
 const key=process.env.RESEND_API_KEY,from=process.env.ENQUIRY_FROM_EMAIL;
 if(!key||!from)return res.status(503).json({error:'Email delivery is not configured'});
 const message=['SVE International — publication enquiry','Publication: '+publication,'Name: '+name,'Email: '+email,'Organisation: '+organisation,'Purpose: '+purpose,'Consent: Yes'].join('\n\n');
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:['info@sve-int.com'],reply_to:email,subject:'Publication enquiry — '+publication.replace(/[\r\n]/g,' ').slice(0,100),text:message})});if(!response.ok){console.error('Email provider rejected request',response.status);return res.status(502).json({error:'Delivery failed'})}return res.status(200).json({ok:true})}catch(e){console.error('Email provider unavailable');return res.status(502).json({error:'Delivery failed'})}
}
