# SVE International Corporate Website 2027 — initial implementation

This repository was empty when the project was resumed on 9 November 2026. The first implementation adds a responsive Insights landing page and a five-question publication enquiry form.

## Current scope
- SVE palette: Midnight Navy #091B3B, Royal Indigo #29358C, Signature Orange #F28C45, Cool White #F7F9FD.
- Insights library scaffold with enquiry-led access (no automatic publication downloads).
- Five questions: publication, name, work email, organisation, intended use.
- Separate consent checkbox, spam honeypot, and server-side validation.
- Vercel endpoint sends enquiry details to info@sve-int.com via Resend when configured.

## Deployment requirements
1. Import this GitHub repository into Vercel. Deploy the root as a static site with the /api function.
2. Configure RESEND_API_KEY and ENQUIRY_FROM_EMAIL in Vercel project environment variables. Verify the sender domain with Resend. Never commit credentials.
3. Confirm inbox delivery and reply-to behavior with an end-to-end test. **Email delivery has not yet been verified.**
4. Configure rate limiting and bot protection before public launch; the honeypot alone is insufficient.
5. Approve and publish privacy notice and retention terms.

## Outstanding content
- Import approved publication titles, summaries and source links from the SVE Google Drive folders.
- Exclude the two specifically withheld publications (“The Legal Pulse…” and “When Children Turn…”).
- Replace the temporary text wordmark with the original approved SVE logo asset, after obtaining the actual asset.
- Expand the remaining corporate pages based on approved website blueprint.
- Review legal entity and regulatory wording before launch.

Do not represent the catalogue as complete until approved source material is imported.
