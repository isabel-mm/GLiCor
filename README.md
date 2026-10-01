# GLiCor

**Glosario de Lingüística de Corpus · Corpus Linguistics Glossary**

[**Abrir GLiCor**](https://isabel-mm.github.io/GLiCor) · Español e inglés

GLiCor es un glosario bilingüe especializado que reúne terminología de lingüística de corpus a partir del análisis de literatura académica en español e inglés. Cada ficha incluye definiciones, equivalentes, variantes, relaciones entre términos y ejemplos documentados en el corpus.

## Explorar el sitio

| Sección | Contenido |
| --- | --- |
| [Glosario](https://isabel-mm.github.io/GLiCor) | Búsqueda de términos en español e inglés |
| [Guía](https://isabel-mm.github.io/GLiCor/guide.html) | Cómo consultar las fichas y usar el glosario |
| [Corpus](https://isabel-mm.github.io/GLiCor/corpus.html) | Composición y criterios del corpus |
| [Recursos](https://isabel-mm.github.io/GLiCor/recursos.html) | Corpus, herramientas y estándares citados |
| [Criterios de normalización](https://isabel-mm.github.io/GLiCor/normalizacion.html) | Variantes, equivalentes y decisiones terminológicas |
| [Estadísticas](https://isabel-mm.github.io/GLiCor/stats.html) | Cobertura y distribución de los términos |
| [Acerca de GLiCor](https://isabel-mm.github.io/GLiCor/about.html) | Descripción y contexto del proyecto |

## Organización del repositorio

El sitio es una web estática publicada mediante **GitHub Pages**. Sus archivos están agrupados en `docs/`; la raíz del repositorio conserva esta portada y la documentación. Para que GitHub Pages publique desde esa carpeta, selecciona `main` y `/docs` en **Settings → Pages → Build and deployment → Deploy from a branch**.

```text
.
├── README.md                 # Portada del repositorio
└── docs/                     # Sitio publicado por GitHub Pages
    ├── index.html            # Glosario
    ├── about.html            # Acerca de GLiCor
    ├── guide.html            # Guía de uso
    ├── corpus.html           # Descripción del corpus
    ├── recursos.html         # Índice de recursos
    ├── normalizacion.html    # Criterios de normalización
    ├── stats.html            # Estadísticas
    ├── redes.html            # Red de términos
    ├── contacto.html         # Contacto
    └── assets/               # Estilos, datos, imágenes y JavaScript
```

## Previsualización local (opcional)

La versión publicada está disponible en [GitHub Pages](https://isabel-mm.github.io/GLiCor). Para previsualizar una copia de los archivos en local, inicia un servidor estático desde la carpeta `docs/`:

```bash
python3 -m http.server 8000
```

Abre después <http://localhost:8000>. El servidor es necesario porque el glosario carga sus datos JSON mediante `fetch()`.

## Autoría y cita

**Isabel Moyano Moreno** · Universidad de Cádiz<br>
[isabel.moyano@uca.es](mailto:isabel.moyano@uca.es) · [ORCID 0000-0003-4284-8897](https://orcid.org/0000-0003-4284-8897)

> Moyano Moreno, I. (2026). *GLiCor: Glosario de Lingüística de Corpus*. Universidad de Cádiz.
