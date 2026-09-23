# Pendientes del glosario GLiCor

*Última actualización: 23 de septiembre de 2026. Las decisiones ya tomadas y su justificación están en `decisiones_glosario.md`.*

## Contenido del glosario

- [ ] **Revisar las definiciones** (la autora). Las generó GPT-4o-mini a partir de fragmentos del corpus; solo se han corregido las que usaban denominaciones no documentadas (sección 4.11 de `decisiones_glosario.md`). Las fichas fuente están en `_dev/glossary_entries/`.
- [ ] **Revisar los términos relacionados.** Los eligió el modelo de lenguaje (entre 4 y 8 por ficha) y no se han revisado.
- [ ] **Ejemplos de uso.** Añadir a cada término un ejemplo seleccionado, preferentemente un contexto definitorio: detectar candidatos en el corpus con los patrones metalingüísticos de la Tabla IV.26 y elegir a mano el mejor. Las concordancias actuales se mantienen.
- [ ] **Unidades de la tesis sin ficha:** 13 términos del Apéndice III (*type, range, gold standard, concordancer, web crawling, stratified sampling, word sense disambiguation, text mining, deviation of proportions, formulaic language, lexico-grammar, semantic preference, multiword expression*) y la entidad *Wmatrix*. Decidir también si se mantienen *corpus query language* y *NOW Corpus*, que no están en el apéndice.
- [ ] **Términos de origen español.** El glosario se construyó solo a partir del inventario inglés. De los 55 términos españoles del Apéndice III, 27 no tienen ficha (*corpus telemático*, *corpus oportunista*, *corpus virtual*, *ley de Zipf*, *EAGLES*…), y de las 93 entidades españolas faltan 81 (*CREA*, *CORDE*, *CORPES XXI*, *PRESEEA*…). Decidir si se incorporan.
- [ ] **Nota terminológica.** Cada ficha fuente tiene una que la web no muestra, y algunas usan formas no documentadas (*dirigido por corpus*, *banco de árboles*). Decidir si se muestra (y revisarla) o se elimina.

## Frecuencias y datos para la tesis

- [x] Tamaño de los subcorpus (Tablas 3.3, 3.4 y 3.8): `tesis/tabla_3_*.csv`.
- [x] Frecuencia y frecuencia de documento del Apéndice III: `tesis/apendice_III_*.csv`.
- [x] Tablas II.19 y II.20: `tesis/apendice_II_*.csv`.
- [x] Lagunas con el criterio del glosario: `tesis/glosario.csv`.
- [ ] **Columnas de TECLA del Apéndice III** (TF–IDF, C-value, NC-value, terminologicidad): recalcular con TECLA a partir de las frecuencias nuevas.
- [ ] **Figura 4.3 y Tabla 4.7** (distribución del inventario por macrocategorías): se calculan sobre el inventario de la extracción, no sobre el glosario.
- [ ] **Tamaño del subcorpus inglés:** la tesis dice 1.448.283 tokens y el corpus actual tiene 1.553.229. Averiguar qué versión del subcorpus es la buena; la Tabla II.19 se calculó con la anterior.
- [ ] **Tabla II.20, *frecuencia general o total*:** la tesis da 545 y no se ha encontrado la consulta que da esa cifra. Comprobarlo en los datos originales.
- [ ] **Lagunas en inglés:** comprobar las 13 lagunas de § 4.5 con el criterio del glosario (buscando en el subcorpus inglés).

## Cambios en la tesis

La lista completa está en la sección 9 de `decisiones_glosario.md`. En resumen:

- [ ] § 4.5: categorías (las 6 del Apéndice III), cifras del glosario, normalización, criterio de laguna y cifras de lagunas.
- [ ] Tablas 3.3, 3.4, 3.8, II.19, II.20 y III.21–III.24, y texto de la p. 179: cifras recalculadas.
- [ ] Resumen (p. 146): corregir «aproximadamente 306.000 tokens en inglés».
- [ ] Apéndice III: nota sobre el recuento por formas frente a la agrupación del glosario.
- [ ] Equivalentes españoles no documentados que use la tesis (sección 4.10).
- [ ] Capítulo 3: mencionar los artefactos de la conversión desde PDF y su reparación.

## Web y publicación

- [ ] Revisar los textos de la guía, «Sobre el glosario» y las estadísticas después de los cambios (por ejemplo, la guía dice que cada ficha tiene «cuatro secciones visibles»).
- [ ] Activar GitHub Pages.
- [ ] Commits (la autora).
