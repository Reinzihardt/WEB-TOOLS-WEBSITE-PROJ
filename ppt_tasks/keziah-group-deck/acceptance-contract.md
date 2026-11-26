# Acceptance contract

| ID | Level | Requirement | Expected evidence in rendered output | Status |
|---|---|---|---|---|
| R1 | MUST | Build an 11-slide editable PowerPoint for the I-DCSAD Group 4 website defense. | PPTX and PDF each contain 11 slides/pages; PPTX has speaker notes on all 11 slides. | PASS |
| R2 | MUST | Follow the requested dark/stone color rhythm and use the exact ink, stone, cream, gold, and olive brand colors with Cormorant Garamond and Montserrat. | Source and rendered slides use ink on 1/6/10/11 and stone on the others; typography and palette checked across all slides. | PASS |
| R3 | MUST | Keep readable type high-contrast, with body text at least 16 pt and no low-contrast gray content. | PPTX text-run audit found no non-empty text below 16 pt; text colors are ink, cream, or gold. | PASS |
| R4 | MUST | Use 11 distinct, requested slide compositions; avoid recurring eyebrows, numbered card grids, boxed paragraphs, summary banners, and pagination. | All 11 PNGs inspected; layouts vary by slide and no prohibited recurring elements appear. | PASS |
| R5 | MUST | Include the labeled homepage placeholder on slide 4 and proportional desktop/tablet/mobile frames on slide 6. | Frames and labels visible in `slide04.png` and `slide06.png`. | PASS |
| R6 | MUST | Keep slides 7 and 8 visibly marked `[TENTATIVE]`. | Both slides show high-contrast `[TENTATIVE]` labels. | PASS |
| R7 | MUST | Leave `ForPresent/` unchanged and provide the rewritten source plus regenerated PPTX. | `ppt_tasks/keziah-group-deck/build_deck.py` rebuilt `Keziah-Group-Presentation.pptx`; no `ForPresent/` files were edited. | PASS |

Rules:

- Do not rewrite a MUST requirement merely to fit an output.
- Every MUST requires visible evidence in the rendered pages.
- Record `PASS`, `NEEDS_REVISION`, or `BLOCKED` with evidence.
- Screenshot placeholders and tentative content are intentional requirements, not completion defects.

