# SVE International — Headless WordPress integration v0.1

## Architecture
- WordPress staging: `https://sveinternationalgroupcorporate.wpcomstaging.com` (site ID 258527627, private). Editorial source, left unchanged.
- Next.js/Vercel: approved cinematic presentation and application workflows, access protected.
- `app/wordpress.ts`: server-only read adapter. Disabled unless explicitly enabled and credentials configured.

## Activation requirements
Set these **server-side Vercel environment variables**, never `NEXT_PUBLIC_*`:
- `SVE_WP_HEADLESS_ENABLED=true`
- `SVE_WP_USERNAME=<dedicated WordPress integration username>`
- `SVE_WP_APPLICATION_PASSWORD=<WordPress application password>`

Use a dedicated minimum-permission WordPress integration account if the site supports application passwords. Confirm the private staging site's REST API accepts application-password authentication before enabling. Keep credentials in Vercel secrets; do not commit or print them.

## Safety gates
1. The adapter reads a limited allowlist of WordPress pages and never changes WordPress content.
2. No frontend page consumes WordPress HTML yet. This prevents Gutenberg scripts, unsafe markup, and unreviewed editorial changes from replacing the approved Next.js design.
3. Test authenticated fetch in the protected environment. If WordPress/Jetpack returns 401/403, do not disable privacy or access protection. Resolve the WordPress REST authentication route first.
4. Establish an approved mapping from WordPress fields/blocks to Next.js components. Validate and sanitize any rich text on the server before rendering.
5. Add editorial preview and controlled publish workflow, then test revisions, media permissions, SEO, navigation, accessibility, and rollback.
6. Maintain Vercel SSO and `noindex,nofollow` until management launch approval.

## Status
Adapter committed; not activated. No credentials were requested or stored. Existing Next.js content remains the source of rendered pages. WordPress staging and the corporate domain are unchanged.
