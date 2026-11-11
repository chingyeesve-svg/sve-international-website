import articles from './articles.json'
export const markets = [
  ['Singapore','singapore-business-advisory'],
  ['Malaysia','malaysia-business-advisory'],
  ['Johor–Singapore SEZ','johor-singapore-sez-advisory'],
  ['Labuan IBFC','labuan'],
  ['Dubai / DMCC','dubai-dmcc-business-advisory'],
  ['Hainan Free Trade Port','hainan-free-trade-port-advisory'],
  ['Hong Kong','hong-kong-business-advisory'],
  ['Shanghai','shanghai-china-market-entry'],
  ['Timor-Leste','timor-leste-investment-advisory'],
  ['Indonesia','indonesia-market-entry'],
  ['Thailand','thailand-market-entry'],
  ['Other Jurisdictions','other-jurisdictions'],
] as const
export const enquiryTopics = [
  'Strategic advisory and business transformation',
  'Cross-border expansion and market entry',
  'Corporate governance and risk',
  'Investment readiness and transactions',
  'General corporate enquiry',
]
export const publications = [...new Set([
  ...articles.map(x => x.publication),
  'Frozen Wealth, Broken Family — Brochure',
  'Frozen Wealth, Broken Family',
  'Human Capital',
  'Caring for the Future: Reimagining ASEAN’s Ageing Landscape with Dignity and Purpose',
  'IR 4.0 and the Malaysian Legal System',
  'NFT as Digital Proof of Escrow',
])].sort()
export const enquiryHref = (publication: string) => '/ask-sve?publication='+encodeURIComponent(publication)+'#enquiry'
