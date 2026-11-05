# Portfolio 2.0 validation

Validated 2026-11-05 on the `portfolio-2.0` development branch. No merge, Pages configuration change or deployment was performed.

## Completed checks

- `python scripts/validate.py`: four case studies, 20 unique IDs, 45 links, four active assets, local anchors, source mappings and resume PDF signature passed.
- `node --check assets/js/phase2.js`: passed.
- `node --test tests/feed.test.cjs`: nine tests passed. Includes hostile API strings/URLs/counts; offline, HTTP failure, malformed, empty and timeout responses; activity ordering and filtering; storage failure; theme/navigation; reduced motion and missing IntersectionObserver.
- `git diff --check`: passed after whitespace cleanup.
- Browser preview: desktop at 1280px, tablet at 768px, mobile at 390px and 320px. Document widths stayed within the viewport. Both themes inspected; light-theme persistence survived reload. Mobile menu opens/closes, Escape restores focus, and the PATIENTRA disclosure opens with Enter. Its architecture asset loads. The blank original mobile menu icon was corrected.
- Browser console: no warnings or errors recorded during the inspected preview interactions. Live repository feed loaded six recently updated repositories.
- Normal text/accent colors retain the existing tokens; light-mode primary-button and contact-panel text backgrounds were adjusted for readability. Visible focus outlines and reduced-motion overrides are present. This is not a full screen-reader or accessibility certification.
- All four GitHub project URLs and all linked GitHub source/evidence URLs returned HTTP 200 (24 GitHub URLs including profile/listing links).
- Existing `ElijahC-DataCloud.pdf` exists, has a PDF signature and retains its original path. No resume content was rewritten.
- `.nojekyll` keeps the site and Markdown evidence register as static files on Pages. Relative links and assets preserve project-subpath compatibility.

## External service observations

The optional HTTP audit returned 24/27 HTTP 200 results. Its nonzero exit reflects these external-service checks, not a clean all-links result:

- PATIENTRA prototype initially timed out. Browser follow-up successfully loaded **PATIENTRA · Controlled live prototype**, displaying synthetic-only/read-only labels and a token entry form. Authenticated data access was not tested.
- RISING's Streamlit URL caused the script's redirect-loop error. Browser follow-up reached the official sleeping-app page. The URL resolves, but the dashboard is currently sleeping; no running dashboard functionality is claimed.
- LinkedIn returned HTTP 999 to the automated checker. Its existing owner-supplied URL is retained; profile content was not independently verified.

The local HTTP preview returned 200. Historical AWS and BigQuery measurements were inspected in repository documentation, code and screenshots, not rerun against cloud services. The [evidence register](portfolio-evidence.md) records each boundary.

## Remaining review items

- Review the existing resume for legacy employment or monetary claims before approving deployment.
- No hackathon award or placement was substantiated; the page claims team participation only.
- RISING dashboard may require waking at the hosting service; PATIENTRA data access requires a maintainer-issued token. Neither secret nor token is included in the portfolio.
- The dependency-free DOM test harness checks behavior/security paths, not full browser rendering. Browser inspection supplements it; full cross-browser, assistive-technology and hosted Pages validation remain owner review steps.
- Merge and deployment require explicit owner approval.
