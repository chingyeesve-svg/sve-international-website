export async function requestObject(request:Request, limit=12000):Promise<Record<string,unknown>|null> {
  const origin=request.headers.get('origin')
  const host=request.headers.get('host') || new URL(request.url).host
  if(origin) {
    try { if(new URL(origin).host!==host) return null } catch { return null }
  }
  if(!request.headers.get('content-type')?.startsWith('application/json')) return null
  const reader=request.body?.getReader()
  if(!reader) return null
  try {
    const decoder=new TextDecoder()
    let size=0, text=''
    while(true) {
      const {done,value}=await reader.read()
      if(done) break
      size+=value.byteLength
      if(size>limit) { await reader.cancel();return null }
      text+=decoder.decode(value,{stream:true})
    }
    const parsed=JSON.parse(text+decoder.decode())
    return parsed && typeof parsed==='object' && !Array.isArray(parsed) ? parsed : null
  } catch {return null}
}
export const field=(value:unknown,max:number):string =>
  typeof value==='string' && value.trim().length<=max ? value.trim() : ''
