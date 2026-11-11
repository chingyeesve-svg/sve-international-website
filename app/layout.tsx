import './style.css'
import type { Metadata } from 'next'

export const metadata:Metadata = {
  title:{ default:'SVE International | Global Strategic Advisory',template:'%s | SVE International' },
  description:'Strategic advisory, governance and cross-border coordination for organisations navigating complex markets and consequential decisions.',
  robots:{index:false,follow:false},
}
const nav = [['About','about-sve'],['Expertise','expertise'],['Leadership','leadership'],['Global Presence','global-presence'],['Insights','insights'],['Contact','contact']]
const footer = [['Group Ecosystem','group-ecosystem'],['Careers','careers'],['FAQs','frequently-asked-questions'],['Privacy Policy','privacy-policy'],['Terms of Use','terms-of-use'],['Website Disclaimer','website-disclaimer'],['Cookie Notice','cookie-notice'],['Terms of Business','terms-of-business'],['Accessibility','accessibility-statement'],['Scam Warning','scam-warning']]
const items = () => nav.map(([label,path])=><a key={path} href={'/'+path}>{label}</a>)
export default function Layout({children}: {children:React.ReactNode}) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><header className="site-header">
    <a className="brand" href="/" aria-label="SVE International home"><img src="/media/sve-international-approved-logo-cropped.jpg" width={208} height={52} alt="SVE International"/></a>
    <nav aria-label="Main navigation" className="desktop-nav">{items()}<a className="sve-button" href="/ask-sve">Ask SVE</a></nav>
    <details className="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile navigation">{items()}<a href="/ask-sve">Ask SVE</a></nav></details>
  </header>{children}
  <footer className="site-footer"><div><strong>SVE International</strong><p>Singapore Headquarters · Malaysia Regional Office</p><a href="mailto:info@sve-int.com">info@sve-int.com</a></div>
    <nav aria-label="Corporate and legal">{footer.map(([label,path])=><a href={'/'+path} key={path}>{label}</a>)}</nav>
    <p className="copyright">© 2027 SVE International. All rights reserved.</p>
  </footer></body></html>
}
