/** SVE editorial contract v0.1. Only fields explicitly mapped here may override approved Next.js presentation. */
export const wordpressPageMapping = {
  'applied-technology-ai': {section:'technology',mode:'editorial-metadata',preserve:'cinematic-four-layer-hero'},
  'market-intelligence': {section:'intelligence',mode:'editorial-metadata',preserve:'market-data-and-motion'},
  'leadership': {section:'leadership',mode:'editorial-metadata',preserve:'five-approved-leaders'},
  'expertise': {section:'expertise',mode:'editorial-metadata',preserve:'interactive-service-layout'},
  'global-presence': {section:'markets',mode:'editorial-metadata',preserve:'twelve-market-pathways'},
  'group-ecosystem': {section:'ecosystem',mode:'editorial-metadata',preserve:'approved-sve-skl-relationship'},
} as const
export type WordPressMappedSlug = keyof typeof wordpressPageMapping
export function isWordPressMappedSlug(value:string):value is WordPressMappedSlug {
  return Object.prototype.hasOwnProperty.call(wordpressPageMapping,value)
}
