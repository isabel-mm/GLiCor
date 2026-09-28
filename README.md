# GLiCor — Glosario de Lingüística de Corpus

A bilingual (Spanish/English) specialised glossary of corpus linguistics terminology, built from a corpus-based analysis of academic literature in both languages.

**Live site:** [isabel-mm.github.io/GLiCor](https://isabel-mm.github.io/GLiCor)

---

## What it is

GLiCor brings together the core terminology of corpus linguistics in Spanish and English. Each entry includes:

- Definition in the selected language
- Equivalent, variants and synonyms, with their corpus frequency
- Related terms (clickable)
- Corpus citations and concordances documenting real academic use

A separate resource index lists the corpora, tools and standards cited in the corpus. Normalisation criteria are explained on the site (`normalizacion.html`).

The glossary is designed for researchers, students, and anyone working with corpus linguistics concepts across languages.

## Running locally

The site is static. Serve the root folder with any static server (the data are loaded with `fetch()`, so opening the HTML files directly will not work):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Author

**Isabel Moyano Moreno**  
Universidad de Cádiz  
[isabel.moyano@uca.es](mailto:isabel.moyano@uca.es) · [ORCID 0000-0003-4284-8897](https://orcid.org/0000-0003-4284-8897)

## Citation

```
Moyano Moreno, I. (2026). GLiCor: Glosario de Lingüística de Corpus. Universidad de Cádiz.
```
