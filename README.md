# SVE International Group Corporate Website 2027 · v0.1

This Next.js migration uses the approved WordPress site as its reference. It includes the corporate and advisory pages, leadership profiles, 11 named jurisdictions plus the Other Jurisdictions pathway, and the Insights catalogue. WordPress and production DNS are outside this repository's deployment scope.

## Run

```sh
npm ci
npm run build
npm run start
```

The committed content snapshot is self-contained. The optional import script takes selected WordPress page and Insights exports named `wordpress-source.json` and `wordpress-insights.json` at the repository root; the raw exports are ignored. Assets in `public/media` replace matching WordPress filenames when the snapshot is regenerated.

## Preview and release

Deploy the migration branch to the existing Vercel project as a protected preview. The default search engine metadata prevents indexing during review.

The migration uses the supplied SVE logo. The private WordPress media server returned HTTP 403 for its original media; `scripts/missing-media.json` lists the assets to import. Preview fallbacks are decorative. Restore the original SK Lai & Partners logo, leadership portraits, hero photographs and other editorial assets before public release.

Publication catalogue entries are available; the article bodies remain in WordPress with editorial verification marked draft. Confirm clearance before including them in the release source. Publication requests go to Ask SVE with the selected publication prefilled; the site does not publish or automatically send the files.

Configure `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` in the Vercel project with a verified sender. The form checks five questions and privacy acknowledgement; delivery is disabled until the environment variables are present. Add platform rate limiting to the enquiry and AI endpoints before enabling them publicly. Verify a real submission reaches info@sve-int.com and the reply-to is correct. The form never displays a success message unless the email provider accepts the submission.

Ask SVE can return links from the site directory without credentials. Set `SVE_AI_MODEL` to an approved Vercel AI Gateway model; use Vercel OIDC authentication or `AI_GATEWAY_API_KEY`. Verify live AI responses in the protected preview before enabling public access.

Use Vercel deployment preview URLs for testing. Do not change the WordPress site or any production DNS setting.
