import pages from './content.json'
import { PageContent } from './page-content'
export default function Home() {
  return <PageContent page={pages.find(x => x.slug==='home')!}/>
}
