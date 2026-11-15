import type { Metadata } from 'next'
import './technology.css'

export const metadata: Metadata = {
  title: 'Applied Technology & AI | SVE International',
  description: 'AI strategy, data governance and digital transformation advisory aligned with business outcomes, oversight and responsible implementation.',
}

const layers = [
  { number: '01', title: 'FOUNDATIONS', detail: 'Data governance, risk and digital trust' },
  { number: '02', title: 'INTELLIGENCE', detail: 'Information architecture and AI readiness' },
  { number: '03', title: 'OPERATING MODEL', detail: 'People, processes and transformation' },
  { number: '04', title: 'DECISIONS', detail: 'Strategy, accountability and execution' },
]
const services = [
  ['AI Strategy & Readiness', 'Identify appropriate AI opportunities, constraints and governance priorities.'],
  ['Data Governance', 'Build accountable practices for information quality, access and stewardship.'],
  ['Digital Transformation', 'Align technology change with operating models, people and business objectives.'],
  ['Technology Risk & Oversight', 'Strengthen controls, vendor oversight and implementation governance.'],
]
export default function AppliedTechnologyAI() {
  return <main className="sve-tech" id="main">
    <section className="sve-tech-hero">
      <div className="sve-tech-hero-copy">
        <p className="sve-tech-eyebrow">SVE INTERNATIONAL / APPLIED TECHNOLOGY & AI</p>
        <h1>Smarter technology.<br/><em>Stronger business.</em></h1>
        <p className="sve-tech-lead">AI strategy, data governance and digital transformation, built around your business.</p>
        <a className="sve-tech-cta" href="#technology-services">Explore our advisory focus</a>
      </div>
      <div className="sve-tech-visual" aria-label="Four connected advisory layers, from foundations to decisions">
        <div className="sve-tech-grid" aria-hidden="true" />
        <div className="sve-tech-signal" aria-hidden="true"><i/><i/><i/></div>
        <div className="sve-tech-stack">
          {layers.map((layer, i) => <div className="sve-tech-plane" key={layer.number} style={{animationDelay: `${i * -.8}s`}}>
            <span className="sve-tech-plane-index">{layer.number}</span>
            <span className="sve-tech-plane-text"><strong>{layer.title}</strong><small>{layer.detail}</small></span>
            <span className="sve-tech-plane-circuit" aria-hidden="true"/>
          </div>)}
        </div>
        <p className="sve-tech-visual-caption">CONNECTED ADVISORY INTELLIGENCE <span>● LIVE SYSTEM</span></p>
      </div>
    </section>
    <section className="sve-tech-intro">
      <p className="sve-tech-eyebrow">TECHNOLOGY WITH PURPOSE</p>
      <h2>From digital complexity to <em>commercial clarity.</em></h2>
      <p>We help organisations assess technology priorities, establish responsible governance and coordinate transformation across functions and markets. Our role is strategic advisory and implementation oversight, not a claim to develop proprietary AI infrastructure.</p>
    </section>
    <section className="sve-tech-services" id="technology-services">
      <p className="sve-tech-eyebrow">OUR ADVISORY FOCUS</p>
      <h2>Where technology meets strategy.</h2>
      <div className="sve-tech-cards">{services.map(([title,description],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className="sve-tech-method">
      <div><p className="sve-tech-eyebrow">CONNECTED DELIVERY</p><h2>Four layers.<br/><em>One coherent direction.</em></h2><p>Our approach connects trusted foundations to actionable business decisions, with oversight embedded throughout.</p></div>
      <ol>{layers.map(x=><li key={x.number}><span>{x.number}</span><div><strong>{x.title}</strong><p>{x.detail}</p></div></li>)}</ol>
    </section>
    <section className="sve-tech-close"><p className="sve-tech-eyebrow">LET'S CONNECT</p><h2>Technology should move your business forward.</h2><a className="sve-tech-cta" href="/ask-sve#enquiry">Discuss your priorities</a></section>
  </main>
}
