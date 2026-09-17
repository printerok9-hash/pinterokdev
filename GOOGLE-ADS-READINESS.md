# Pinterok business printer repair advertising

Reviewed 17 September 2026. The owner confirmed that Pinterok will serve businesses and organisations exclusively.

Google explicitly allows advertising technical support provided exclusively to businesses. Consumer third-party support, including hardware repairs, remains prohibited. Eligibility is based on the actual service and destination, not a list of forbidden words. These changes do not guarantee approval.

Sources: [Third-party consumer technical support](https://support.google.com/adspolicy/answer/13527027?hl=en), [Misrepresentation](https://support.google.com/adspolicy/answer/6020955?hl=en).

## Website changes

- Replaced residential service offers throughout the local public source, including header/footer, homepage, About, service descriptions, location content, FAQs, blog defaults, metadata and structured data.
- Added an explicit business/organisational-only statement and residential-booking exclusion. The enquiry consent, chatbot introduction and Calendly wrapper explain the business audience.
- Retained the independent-provider disclosure and qualified business remote assistance accurately. Repair, configuration and maintenance remain genuine services, not disguised under different names.
- Removed the unsupported best-service/best-price promotion and immediate remote-availability claims.
- Retained existing contact details: +44 7441448082 and printerok9@gmail.com. Their ownership and operation were not independently verified.

## Outstanding before launching ads

1. Deploy the reviewed frontend and backend changes. No deployment or Google Ads campaign was performed in this task.
2. Update existing database content using the migration below. Published services, FAQs, posts and reviews can override local defaults; all customised content requires a human accuracy review. Do not rewrite customer testimonials to make them appear to be business reviews.
3. Confirm actual engineer coverage. Existing city pages reference London, Manchester, Birmingham, Leeds, Liverpool, Glasgow, Bristol, Sheffield and Nottingham. The pages now ask customers to confirm coverage, but each advertised area still needs verification before targeting it.
4. Supply verified opening hours, legal/trading entity details and an appropriate public business address. These were not available in the inspected source. A domain email can improve consistency if one is actually configured; do not publish a fabricated mailbox.
5. Confirm call-out/diagnostic charges, VAT treatment, cancellation/refund terms and any repair warranty. Existing Terms contain pricing and cancellation guidance, but no explicit refund process. Do not invent commercial terms. Preserve applicable customer rights.
6. Review the external Calendly event name, description, intake questions and confirmation messages for business-only eligibility. The website wrapper cannot change that external account.
7. Review the deployed site, including database-backed pages, mobile layout, phone links and booking flow. Confirm that production metadata uses the real NEXT_PUBLIC_SITE_URL, not its localhost fallback. Match the Google Ads advertiser identity to the real business.

## Existing database content

The backend's initial seed runs only once. Changing initial-content.json does not update previously stored records.

From the printerokdevkend directory, with MONGODB_URI configured:

```powershell
node migrations/business-only-content.js
node migrations/business-only-content.js --apply
```

The first command is a dry run. The second updates only fields still matching their original seed values, preserves customised fields, and reports records needing manual review. Repeat execution is safe. The migration reports remaining residential wording without hiding content from visitors. Review exclusion statements separately from offers to residential customers. Back up the content database before applying a production migration.

No database URI was available locally, so the production migration has not been run.

## Verification performed

- Production build and TypeScript compilation passed.
- ESLint reported no errors and three existing unused-state warnings in the homepage.
- Local browser checks confirmed the desktop/mobile homepage renders, business-only enquiry wording appears, and booking and London location pages load. No page errors were reported. Calendly was unconfigured locally, so its phone fallback was verified rather than the external booking service. No enquiries were submitted.
- Migration checks against an isolated in-memory database passed: dry run makes no changes, matching seed fields update, repeat execution is safe, and customised fields remain unchanged.
- All eight draft headlines and four descriptions passed their respective 30/90-character checks.

## Draft search ads

Use only for the confirmed business-only service after the outstanding items are resolved. Headlines are at most 30 characters and descriptions at most 90 characters.

Headlines:

- Business Printer Repair UK
- Office Printer Repair Service
- Commercial Printer Maintenance
- On-Site Printer Engineers
- Business Printer Servicing
- Book a Business Repair Visit
- Independent Printer Repairs
- Office Printer Maintenance

Descriptions:

- Printer repairs exclusively for businesses and organisations. Check local availability.
- Reduce office downtime with on-site diagnosis and business printer maintenance.
- Independent printer engineers. Share your business postcode and model to request a visit.
- Discuss servicing and maintenance plans for your business printers. Enquire with Pinterok.

Suggested destination: the deployed business homepage or relevant business service page. No manufacturer affiliation or guaranteed response time is implied.

## Initial keyword scope

Use phrase and exact match for: business printer repair, office printer repair, commercial printer repair, business printer maintenance, office printer maintenance, printer engineer for business, office photocopier repair, commercial printer servicing. Add location variants only for verified coverage.

Example: `"office printer repair"` and `[office printer repair]`.

Review negative keywords for residential and irrelevant demand: home, residential, personal printer, free, DIY, manual, driver download, how to fix, customer service number, HP support number, Canon support number, technical support phone number, jobs, career, salary, used printer, buy printer, printer setup at home. Select negative match types deliberately and review real search terms; negatives alone do not establish policy compliance.

Do not advertise residential repair, manufacturer support numbers, official/authorised repair status, or a service area or maintenance contract you cannot actually deliver.
