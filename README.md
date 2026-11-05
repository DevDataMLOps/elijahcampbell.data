# Elijah Campbell — Portfolio 2.0

Evidence-driven Cloud & Data Engineering portfolio, built on the existing static GitHub Pages site. The original design tokens, dark/light themes, terminal hero, navigation, reveal effects and generic architecture are retained. No build framework is required.

Four curated case studies stay independent of the live GitHub activity feed: ZIPCO, PATIENTRA, Project RISING and Telecom Data Revolution. Each presents the challenge, solution, controls, documented outcome, significance, evidence, stack and limitations. Expand a card for engineering detail.

## Project structure

```text
index.html                         Homepage and four static case studies
assets/css/phase2.css               Existing theme/layout plus scoped extensions
assets/js/phase2.js                 Theme, navigation, reveal and safe GitHub feed
assets/images/patientra-architecture.png  Source architecture screenshot
ElijahC-DataCloud.pdf               Existing downloadable resume
docs/portfolio-evidence.md          Claim register and pinned source evidence
docs/validation.md                  Completed checks and review limitations
tests/feed.test.cjs                 Dependency-free behavior/security checks
scripts/validate.py                 Static HTML, links, assets and evidence checks
```

Legacy template assets remain intact. Only `phase2.css` and `phase2.js` drive the homepage.

## Local preview

Requires Python 3 and Node.js for checks; no dependency installation or compilation:

```sh
git switch portfolio-2.0
python -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/>. Stop with Ctrl+C. Test both themes, mobile navigation, keyboard focus, expandable cards, resume and API fallback. Relative asset paths support the `/elijahcampbell.data/` Pages prefix.

## Checks

```sh
python scripts/validate.py
node --check assets/js/phase2.js
node --test tests/feed.test.cjs
python scripts/validate.py --external
```

The optional external check needs network access. Service wake-up, anti-bot responses and outages must be reported separately from source/asset failures. Tests make no cloud changes and require no secrets. See [validation results](docs/validation.md).

## Evidence standards

See the [evidence register](docs/portfolio-evidence.md). Every published project quantity identifies its baseline, comparison, method, source, limitations and verification level. Repository-supported measurements are not claimed as independent reruns. Synthetic data is explicit; team and individual contributions are separate. Training is not presented as employment. Scan reductions are not realized financial savings.

## Deployment — approval required

All upgrade work stays on `portfolio-2.0`. Review its pull request and evidence before authorizing a merge. This task does not deploy or change Pages settings.

After owner approval only: merge to `main` and use the repository's existing GitHub Pages source. If configuration is needed, select **Deploy from a branch → main → /(root)** in Settings → Pages. Preserve the project URL <https://devdatamlops.github.io/elijahcampbell.data/>. Verify the deployed page, resume, both themes and external links. There is no build step and no deployment workflow added by this upgrade.

## Review checklist

- [ ] Approve evidence boundaries and Amdari project-based training wording.
- [ ] Review the existing resume for consistency with the updated page.
- [ ] Supply hackathon award evidence if a placement should be added.
- [ ] Confirm desktop/tablet/mobile layout, keyboard navigation and reduced motion.
- [ ] Confirm GitHub fallback, theme persistence and readable light/dark contrast.
- [ ] Approve merge/deployment explicitly.
