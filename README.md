# GLiCor — Glosario de Lingüística de Corpus

A bilingual (Spanish/English) specialised glossary of corpus linguistics terminology, built from a corpus-based analysis of academic literature in both languages.

**Live site:** [isabel-mm.github.io/GLiCor](https://isabel-mm.github.io/GLiCor)

---

## What it is

GLiCor brings together the core terminology of corpus linguistics in Spanish and English. Each entry includes:

- Definition in the selected language
- Related terms (clickable)
- Corpus citations documenting real academic use

The glossary is designed for researchers, students, and anyone working with corpus linguistics concepts across languages.

## Repository structure

```
/
├── index.html          # Main glossary (search, filter, alphabet navigation)
├── about.html          # About the project
├── corpus.html         # About the source corpus
├── guide.html          # How to use the glossary
├── stats.html          # Glossary statistics
├── assets/
│   ├── js/
│   │   ├── navbar.js   # Shared navigation bar
│   │   └── footer.js   # Shared footer
│   ├── img/
│   │   └── logo3.png
│   └── data/
│       └── entries.json  # All glossary entries
└── .gitignore
```

## Running locally

No build step required. Open any `.html` file directly in a browser, or serve the root folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

> **Note:** `entries.json` is loaded via `fetch()`, so a local server is needed — opening the HTML file directly (`file://`) will not load the glossary data.

## Data

Glossary entries are stored in `assets/data/entries.json`. Each entry contains:

| Field | Description |
|---|---|
| `term_es` | Spanish term |
| `term_en` | English term |
| `slug` | URL-safe identifier |
| `category` / `category_en` | Thematic category |
| `type` | `term` (shown in the glossary, `index.html`) or `entity` (named corpora and tools, shown in the resource index, `recursos.html`) |
| `letter` | Initial letter (Spanish) |
| `html` | Rendered entry content |
| `aliases` | Former slugs merged into or renamed to this entry (old links still resolve) |
| `forms` | All counted forms per language: main form first, then variants (`form`, relation `rel`, `n`, `docs`, `consolidated`, counted `strings`) |
| `docs` | Number of documents per subcorpus in which the entry occurs |
| `notes` | Conceptual notes shown in the entry |
| `norm` | Normalisation applied: `variante_formal`, `sinonimia` or `lema_singular` |

### Normalisation and frequencies

Formal variants (acronyms, spelling variants), synonyms and plural forms are merged into a single entry per concept. Every decision, with its rationale, is recorded in `assets/data/normalizacion.json` and shown on `normalizacion.html`; `docs/decisiones_glosario.md` explains all the structural decisions for the thesis.

All frequencies are recounted from the subcorpora by `_dev/recount_variants.py` and written to `assets/data/frecuencias.json` (per entry, per form and per counted string, with document frequency). `_dev/convert.py` applies both files when building `entries.json`. `docs/comparacion_apendice_III.csv` compares the figures in Appendix III of the thesis with the recount.

```
cd _dev
python3 recount_variants.py      # frequencies and main forms (frecuencias.json)
python3 generate_concordances.py # KWIC lines with the same forms (concordances.json)
python3 convert.py               # entries.json
python3 compare_appendix.py      # docs/comparacion_apendice_III.csv
python3 build_tesis_tables.py    # docs/tesis/: recalculated tables for the thesis
python3 lemmatise_corpus.py es es_core_news_sm limpio   # (and en/bruto variants) lemma cache for Appendix II
python3 recount_appendix_II.py   # docs/tesis/apendice_II_*.csv (Tables II.19 and II.20)
python3 build_decisiones_md.py   # docs/decisiones_glosario.md
```

## Author

**Isabel Moyano Moreno**  
Universidad de Cádiz  
[isabel.moyano@uca.es](mailto:isabel.moyano@uca.es) · [ORCID 0000-0003-4284-8897](https://orcid.org/0000-0003-4284-8897)

## Citation

```
Moyano Moreno, I. (2026). GLiCor: Glosario de Lingüística de Corpus. Universidad de Cádiz.
```
