import type { NextConfig } from 'next'
const config:NextConfig = {
  poweredByHeader:false,
  async redirects() {
    return [
      {source:'/home',destination:'/',permanent:true},
      {source:'/insights-layout-qa-v01',destination:'/insights',permanent:true},
      {source:'/insights-publication-enquiry-qa-v01',destination:'/ask-sve',permanent:true},
      {source:'/privacy-notice-3',destination:'/privacy-policy',permanent:true},
    ]
  },
  async headers() {
    return [{source:'/:path*',headers:[
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'X-Frame-Options',value:'DENY'},
    ]}]
  },
}
export default config
