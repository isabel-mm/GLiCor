# GLiCor — Glosario de Lingüística de Corpus

A bilingual (Spanish/English) specialised glossary of corpus linguistics terminology, built from a corpus-based analysis of academic literature in both languages.

**Live site:** [glicor URL]

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
| `letter` | Initial letter (Spanish) |
| `html` | Rendered entry content |

The entries were extracted from a specialised bilingual corpus of 100 academic texts (50 English, 50 Spanish) on corpus linguistics methodology.

## Author

**Isabel Moyano Moreno**  
Universidad de Cádiz  
[isabel.moyano@uca.es](mailto:isabel.moyano@uca.es) · [ORCID 0000-0003-4284-8897](https://orcid.org/0000-0003-4284-8897)

## Citation

```
Moyano Moreno, I. (2026). GLiCor: Glosario de Lingüística de Corpus. Universidad de Cádiz.
```
