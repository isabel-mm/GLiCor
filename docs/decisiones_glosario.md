# Decisiones sobre la estructuración del glosario GLiCor

*Documento de trabajo para incorporar a la tesis. Recoge las decisiones tomadas en septiembre de 2026 sobre el inventario del glosario digital (§ 4.5) y su relación con el Apéndice III. Se genera a partir de los datos del glosario (`_dev/build_decisiones_md.py`), así que las cifras coinciden con la versión web.*

## 1. Resumen

| | Antes | Ahora |
|---|---:|---:|
| Unidades del inventario | 158 | 261 |
| Términos (glosario) | 133 | 161 |
| Entidades (índice de recursos) | 25 | 100 |
| Categorías temáticas | 11 (propias de la web) | 6 (Apéndice III: 4 de términos y 2 de entidades) |
| Fichas de origen inglés / español | 158 / 0 | 158 / 103 |
| Fichas redactadas con GPT-4o-mini / con Claude | 158 / 0 | 145 / 116 |

Principios adoptados:

1. **Términos y entidades se separan.** Los nombres propios de corpus y herramientas no son términos: forman un índice de recursos aparte.
2. **Las categorías son las de la tesis** (Apéndice III).
3. **Una entrada por concepto.** Las variantes formales, los sinónimos, los préstamos y las formas flexivas se agrupan en una sola ficha, con el lema en singular.
4. **La denominación principal se elige por dispersión** (número de documentos que la usan), como indicador de consenso en la comunidad experta. En español, la forma española documentada se prefiere al préstamo.
5. **Todo lo que figura en el glosario está documentado en el corpus o se marca como propuesta**, y todo lo que se da por no documentado se ha comprobado con búsquedas ampliadas.
6. **El glosario cubre todo el inventario de la tesis**, de origen inglés y español.
7. **Glosario y tesis usan los mismos datos de frecuencia**, recontados con un método único y documentado. El Apéndice III cuenta cada forma por separado; el glosario las agrupa y muestra el desglose.

## 2. Términos y entidades

Siguiendo la distinción de la tesis entre unidad terminológica y nombre propio, el inventario se divide en dos:

- **Términos**: designan conceptos, procesos, propiedades y metodologías del dominio. Forman el glosario.
- **Entidades**: nombres propios de recursos concretos (corpus de referencia, herramientas y software). Forman un **índice de recursos** aparte.

Las entidades son las unidades de las categorías *Recursos y corpus* (REC-COR) y *Herramientas y software* (HER-SOFT). Las fichas de recursos se distinguen de las de términos:

- incluyen el enlace a la web oficial del recurso;
- si el nombre es una sigla, indican su desarrollo (véase 4.7);
- no incluyen fuentes de la definición ni concordancias, que tienen sentido para caracterizar el uso de un término pero no para identificar un recurso;
- un nombre propio nunca se marca como equivalente propuesto.

El glosario y el índice están enlazados: si un término remite a una entidad, el enlace lleva a su ficha en el índice de recursos.

## 3. Categorías temáticas

La tesis contiene tres clasificaciones que no coinciden:

| Lugar | Esquema |
|---|---|
| Capítulo 4, validación (p. 222) | 6 macrocategorías: MET-DI, PROC-LIN, EST-LEX, TEC-FOR, REC-COR, HER-SOFT |
| Apéndice III | Las mismas 6: 4 para términos y 2 para entidades, con asignación explícita de cada unidad |
| § 4.5, Glosario digital (p. 273) | 7 categorías distintas: Fundamentos y disciplinas; Diseño y compilación de corpus; Recursos y corpus de referencia; Procesamiento y anotación; Estadística, léxico y búsqueda; Herramientas y software; Tecnología y formatos |

**Decisión:** se adopta el esquema del Apéndice III, porque es el único que asigna una categoría a cada unidad y el que se corresponde con la separación entre términos y entidades.

| Categoría | Código | Tipo de unidad |
|---|---|---|
| Metodología y diseño | MET-DI | término |
| Procesamiento lingüístico | PROC-LIN | término |
| Estadística y léxico | EST-LEX | término |
| Tecnología y formatos | TEC-FOR | término |
| Recursos y corpus | REC-COR | entidad |
| Herramientas y software | HER-SOFT | entidad |

Correspondencia con las 11 categorías que usaba la web (todas las unidades de cada categoría antigua caen en la misma categoría de la tesis):

| Categoría anterior | Categoría de la tesis |
|---|---|
| Conceptos fundacionales; Disciplinas afines; Diseño y compilación de corpus; Búsqueda y consulta | Metodología y diseño |
| Anotación y marcado; Procesamiento del lenguaje | Procesamiento lingüístico |
| Frecuencia y estadística; Léxico y fraseología | Estadística y léxico |
| Metadatos y formatos | Tecnología y formatos |
| Corpus de referencia | Recursos y corpus |
| Herramientas y software | Herramientas y software |

## 4. Normalización del inventario

### 4.1. Principio: una entrada por concepto

El inventario extraído del corpus recoge formas, no conceptos. Para que cada concepto tenga una sola ficha se aplica el **criterio de variación formal** de la metodología (capítulo 3, p. 182): las variantes de un mismo término se agrupan cuando se reconoce su equivalencia conceptual. Se distinguen tres tipos de decisión:

- **Variantes formales**: siglas y formas desarrolladas (*BNC* / *British National Corpus*), variantes ortográficas (con o sin guion; británicas y estadounidenses, como *lemmatisation* / *lemmatization*) y formas con o sin núcleo (*LOB* / *LOB Corpus*).
- **Sinonimia y parasinonimia**: denominaciones distintas para el mismo concepto (*speech corpus* / *spoken corpus*), incluidos los préstamos que conviven con la forma patrimonial en español (*keyword* / *palabra clave*).
- **Lema en singular**: el lema de cada entrada es la forma singular (*hapax legomenon*, *grupo léxico*, *estadística descriptiva*); el plural es una forma flexiva.

Excepciones al singular: los sustantivos no contables del inglés (*metadata*; *descriptive statistics* e *inferential statistics*, donde *statistics* es nombre de disciplina y *descriptive statistic* designaría una sola medida) y los nombres propios (*WordSmith Tools*).

### 4.2. Denominación principal

Cada ficha necesita una forma de entrada. La denominación principal se elige automáticamente en cada lengua:

1. Se descartan las **formas reducidas por elipsis** (*hapax*) y las **no documentadas** en el subcorpus.
2. En español, **si hay una forma española documentada, se prefiere a los préstamos** (*guiado por corpus* antes que *corpus-driven*, *etiquetario* antes que *tagset*). Si solo está documentado el préstamo, se usa el préstamo (*token*, *keyness*). Si no hay ninguna forma documentada, se usa la **propuesta del glosario**, marcada como tal (*puntuación z*). El préstamo documentado aparece siempre en la ficha y, si está consolidado, en la cabecera junto a la principal (*corpus anotado sintácticamente · treebank*).
3. Entre una **sigla** y su **forma desarrollada** se prefiere la sigla, que es la forma lexicalizada con la que se cita (*BNC*, *XML*, *POS tagging*).
4. Entre las demás, la que aparece en **más documentos** del subcorpus. La dispersión indica consenso entre autores mejor que la frecuencia, que puede deberse a que un solo texto repite mucho una forma: *speech corpus* tiene más ocurrencias que *spoken corpus*, pero *spoken corpus* la usan muchos más documentos. A igualdad de documentos, la más frecuente.

La denominación principal es solo el punto de entrada de la ficha, no una recomendación terminológica. Por este criterio puede haber asimetrías entre lenguas: *raw frequency* predomina en inglés y *frecuencia absoluta* en español.

**Excepciones (decisiones expresas):**

- *type-token ratio* es la principal en inglés aunque la sigla *TTR* sea más frecuente, porque la forma desarrollada es más transparente. En español se usa la forma desarrollada documentada, *relación entre types y tokens*; *relación tipo-token*, el equivalente que figuraba antes, no aparece en el corpus.
- *hápax* es la principal en español aunque sea una forma reducida: es la única documentada en el subcorpus y es la forma académica (DLE).

### 4.3. Variante denominativa consolidada

Cuando una denominación alternativa tiene una frecuencia alta o parecida a la de la principal, se entiende que está consolidada en la comunidad experta y se marca como **variante denominativa**. Aparece en la cabecera de la ficha junto a la principal (*part of speech · word class*), y no solo en la lista de variantes.

Criterio operativo: una alternativa se considera consolidada si cumple al menos una de estas condiciones:

- su frecuencia es **al menos la mitad** de la de la denominación principal;
- la usan **al menos 5 de los 50 documentos** de su subcorpus (10 %).

Si no cumple ninguna, se muestra con su relación (sinónimo, préstamo). El criterio solo se aplica a sinónimos y préstamos; las variantes formales conservan su etiqueta (sigla, forma desarrollada, variante ortográfica), que es más informativa.

### 4.4. Formas documentadas y equivalentes propuestos

- Todo lo que el glosario da como no documentado se ha comprobado con una **búsqueda ampliada** (sección 4.10): variantes con artículo o en plural, con y sin guion, siglas, préstamos y reformulaciones habituales, sobre el texto ya reparado (5.1).
- Si ninguna denominación de un término en una lengua aparece en el corpus, el equivalente es una **propuesta del glosario** y se marca como tal en la ficha. Tras la búsqueda ampliada quedan 10 equivalentes españoles propuestos: *anotación en línea* (inline annotation), *desviación de proporciones* (deviation of proportions), *intervalo de confianza* (confidence interval), *lenguaje formulaico* (formulaic language), *léxico-gramática* (lexico-grammar), *marco de muestreo* (sampling frame), *muestreo estratificado* (stratified sampling), *puntuación z* (z-score), *rango* (range), *tamaño del efecto* (effect size).
- Las formas alternativas que figuraban en el glosario pero no aparecen en el corpus se conservan como referencia, marcadas como *no documentadas*, y nunca son principales.

### 4.5. Búsqueda y enlaces

- Si se busca un término por una variante, un sinónimo o un préstamo, el buscador **remite a la entrada principal** e indica por qué forma se ha encontrado (al buscar *word class* aparece *part of speech*, con el aviso correspondiente).
- Los identificadores antiguos de las fichas unificadas o renombradas se conservan como alias, así que los enlaces anteriores siguen funcionando.
- Las concordancias de las fichas unificadas se reúnen en la entrada principal.

### 4.6. Registro de decisiones

Formato de las celdas: frecuencia / número de documentos del subcorpus en que aparece la forma. La primera forma de cada celda es la principal.

#### Variantes formales (54)

| Entrada | Inglés | Español | Criterio |
|---|---|---|---|
| bnc<br><small>antes: british_national_corpus</small> | **BNC** (principal; 815 / 22 doc.)<br>*British National Corpus* (forma desarrollada; 121 / 23 doc.) | **BNC** (principal; 40 / 12 doc.)<br>*British National Corpus* (forma desarrollada; 20 / 10 doc.)<br>*Corpus Nacional Británico* (forma traducida; 1 / 1 doc.) | Sigla y forma desarrollada del mismo corpus. |
| coca<br><small>antes: corpus_of_contemporary_american_english</small> | **COCA** (principal; 291 / 13 doc.)<br>*Corpus of Contemporary American English* (forma desarrollada; 49 / 9 doc.) | **COCA** (principal; 3 / 3 doc.)<br>*Corpus of Contemporary American English* (forma desarrollada; 3 / 3 doc.)<br>*Corpus de Inglés Americano Contemporáneo* (forma traducida; no documentada) | Sigla y forma desarrollada del mismo corpus, con la traducción que figuraba en el glosario. |
| lob<br><small>antes: lob_corpus</small> | **LOB** (principal; 181 / 11 doc.)<br>*LOB Corpus* (sigla con núcleo; 123 / 7 doc.)<br>*Lancaster-Oslo/Bergen Corpus* (forma desarrollada; 20 / 10 doc.) | **LOB** (principal; 18 / 8 doc.)<br>*Lancaster-Oslo/Bergen* (forma desarrollada; 12 / 8 doc.) | Sigla, sigla con núcleo («LOB Corpus») y forma desarrollada (Lancaster-Oslo/Bergen Corpus, con sus variantes de puntuación). Se cuentan sin solapamiento: una aparición de «LOB Corpus» no se cuenta además como «LOB». En español, «LOB» aparece sola («el LOB») o junto a la forma desarrollada. |
| pos_tagging<br><small>antes: part_of_speech_tagging</small> | **POS tagging** (principal; 96 / 16 doc.)<br>*part-of-speech tagging* (forma desarrollada; 82 / 15 doc.) | **etiquetado morfosintáctico** (principal; 25 / 8 doc.)<br>*etiquetado POS* (sigla; 1 / 1 doc.) | Sigla y forma desarrollada, con sus variantes ortográficas (con y sin guion). En español, «etiquetado morfosintáctico» es la forma asentada; «etiquetado POS» aparece de forma puntual. |
| ttr<br><small>antes: type_token_ratio</small> | **type-token ratio** (principal, decisión expresa; 22 / 5 doc.)<br>*TTR* (sigla; 75 / 2 doc.) | **relación entre types y tokens** (principal, decisión expresa; 5 / 3 doc.)<br>*TTR* (sigla; 31 / 3 doc.)<br>*type-token ratio* (variante denominativa; 14 / 4 doc.)<br>*relación tipo-token* (forma desarrollada; no documentada)<br>*ratio tipo-token* (forma desarrollada; 1 / 1 doc.) | Sigla y forma desarrollada. La sigla es más frecuente en los dos subcorpus, pero se concentra en muy pocos documentos. En español, la forma desarrollada se documenta como «relación entre (los) types y tokens» y como préstamo («type-token ratio», normalmente junto a la sigla); «relación tipo-token», el equivalente que figuraba antes, no aparece. El Apéndice III recoge «TTR» como término del subcorpus español. *Decisión expresa: se prefiere la forma desarrollada, más transparente, aunque la sigla sea más frecuente. En español se usa la forma desarrollada documentada («relación entre types y tokens»).* |
| lemmatisation | **lemmatisation** (principal; 34 / 5 doc.)<br>*lemmatization* (variante ortográfica; 15 / 4 doc.) | **lematización** (principal; 102 / 23 doc.) | Variante ortográfica británica (-isation) y estadounidense (-ization) del mismo término. |
| tokenization<br><small>antes: tokenisation</small> | **tokenization** (principal; 37 / 11 doc.)<br>*tokenisation* (variante ortográfica; 25 / 5 doc.) | **tokenización** (principal; 13 / 6 doc.) | Variante ortográfica estadounidense (-ization) y británica (-isation) del mismo término. |
| normalized_frequency | **normalized frequency** (principal; 10 / 4 doc.)<br>*normalised frequency* (variante ortográfica; 8 / 3 doc.) | **frecuencia normalizada** (principal; 263 / 8 doc.) | Variante ortográfica estadounidense (-ized) y británica (-ised) del mismo término. |
| specialised_corpus<br><small>antes: specialized_corpus</small> | **specialized corpus** (principal; 36 / 9 doc.)<br>*specialised corpus* (variante ortográfica; 40 / 8 doc.) | **corpus especializado** (principal; 74 / 18 doc.) | Variante ortográfica británica (-ised) y estadounidense (-ized) del mismo término. |
| chi_squared | **chi-square** (principal; 43 / 9 doc.)<br>*chi-squared* (variante ortográfica; 43 / 7 doc.) | **chi cuadrado** (principal; 5 / 2 doc.)<br>*ji cuadrado* (variante ortográfica; 1 / 1 doc.) | Variantes formales de la misma prueba estadística; en inglés, «chi-square» es la forma que usan más documentos. En español, la tesis ya identifica «chi cuadrado», «ji cuadrado» y «χ cuadrado» como variantes denominativas (§ 3). «χ cuadrado» se cuenta como «chi cuadrado» escrito con la letra griega; el símbolo «χ2» de las fórmulas no se cuenta. «Test de chi-cuadrado», la forma que figuraba antes, no aparece en el subcorpus. |
| n_gram | **n-gram** (principal; 80 / 9 doc.)<br>*ngram* (variante ortográfica; 19 / 5 doc.) | **n-grama** (principal; 36 / 9 doc.)<br>*n-gram* (variante denominativa; 16 / 5 doc.) | Variantes ortográficas (con y sin guion) y préstamo de la forma inglesa en los textos españoles. |
| monitor_corpus | **monitor corpus** (principal; 50 / 8 doc.) | **corpus monitor** (principal; 11 / 6 doc.)<br>*monitor* (forma reducida; 19 / 7 doc.) | En español, «monitor» se usa también solo, como reducción de «corpus monitor» («corpus abierto o monitor»). El Apéndice III recoge «monitor» y «corpus monitor» como términos distintos del subcorpus español; aquí son la misma entrada. |
| frequency_per_million_words | **frequency per million words** (principal, decisión expresa; 12 / 8 doc.)<br>*pmw* (sigla; 38 / 7 doc.) | **frecuencia por millón de palabras** (principal; 6 / 3 doc.) | La sigla pmw es frecuente en inglés pero se concentra en pocos documentos; se mantiene como principal la forma desarrollada, como en type-token ratio. *Decisión expresa: se prefiere la forma desarrollada, más transparente, como en type-token ratio.* |
| universal_pos | **Universal POS** (principal, decisión expresa; 4 / 2 doc.)<br>*UPOS* (sigla; 3 / 1 doc.) | **Universal POS** (principal; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. *Decisión expresa: se mantiene «Universal POS», la forma con que se presenta en los dos subcorpus, frente a la sigla UPOS.* |
| crea | **CREA** (principal; no documentada)<br>*Corpus de Referencia del Español Actual* (forma desarrollada; no documentada) | **CREA** (principal; 337 / 30 doc.)<br>*Corpus de Referencia del Español Actual* (forma desarrollada; 46 / 24 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| corde | **CORDE** (principal; no documentada)<br>*Corpus Diacrónico del Español* (forma desarrollada; no documentada) | **CORDE** (principal; 310 / 24 doc.)<br>*Corpus Diacrónico del Español* (forma desarrollada; 50 / 21 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cdh | **CDH** (principal; no documentada)<br>*Corpus del Nuevo Diccionario Histórico* (forma desarrollada; no documentada) | **CDH** (principal; 100 / 11 doc.)<br>*Corpus del Nuevo Diccionario Histórico* (forma desarrollada; 14 / 10 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| preseea | **PRESEEA** (principal; 8 / 1 doc.)<br>*Proyecto para el Estudio Sociolingüístico del Español de España y de América* (forma desarrollada; 2 / 1 doc.) | **PRESEEA** (principal; 101 / 14 doc.)<br>*Proyecto para el Estudio Sociolingüístico del Español de España y de América* (forma desarrollada; 13 / 9 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| caes | **CAES** (principal; no documentada)<br>*Corpus de Aprendices de Español* (forma desarrollada; no documentada) | **CAES** (principal; 80 / 8 doc.)<br>*Corpus de Aprendices de Español* (forma desarrollada; 22 / 8 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| corpes_xxi | **CORPES XXI** (principal; 1 / 1 doc.)<br>*Corpus del Español del Siglo XXI* (forma desarrollada; 2 / 1 doc.) | **CORPES XXI** (principal; 77 / 15 doc.)<br>*Corpus del Español del Siglo XXI* (forma desarrollada; 39 / 20 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| iula | **IULA** (principal; 2 / 1 doc.)<br>*Corpus Técnico del IULA* (forma desarrollada; no documentada) | **IULA** (principal; 69 / 12 doc.)<br>*Corpus Técnico del IULA* (forma desarrollada; 7 / 3 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| valesco | **Val.Es.Co** (principal; 3 / 1 doc.)<br>*Corpus de Conversaciones Coloquiales* (forma desarrollada; 1 / 1 doc.) | **Val.Es.Co** (principal; 51 / 11 doc.)<br>*Corpus de Conversaciones Coloquiales* (forma desarrollada; 3 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cemc | **CEMC** (principal; 2 / 1 doc.)<br>*Corpus del Español Mexicano Contemporáneo* (forma desarrollada; 2 / 1 doc.) | **CEMC** (principal; 44 / 10 doc.)<br>*Corpus del Español Mexicano Contemporáneo* (forma desarrollada; 25 / 10 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cobuild | **COBUILD** (principal; 18 / 5 doc.)<br>*Collins Birmingham University International Language Database* (forma desarrollada; 1 / 1 doc.) | **COBUILD** (principal; 35 / 15 doc.)<br>*Collins Birmingham University International Language Database* (forma desarrollada; 5 / 5 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| charta | **CHARTA** (principal; no documentada)<br>*Corpus Hispánico y Americano en la Red: Textos Antiguos* (forma desarrollada; no documentada) | **CHARTA** (principal; 33 / 10 doc.)<br>*Corpus Hispánico y Americano en la Red: Textos Antiguos* (forma desarrollada; 13 / 7 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| corlec | **CORLEC** (principal; no documentada)<br>*Corpus Oral de Referencia de la Lengua Española Contemporánea* (forma desarrollada; no documentada) | **CORLEC** (principal; 32 / 10 doc.)<br>*Corpus Oral de Referencia de la Lengua Española Contemporánea* (forma desarrollada; 10 / 6 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| seu | **SEU** (principal; 20 / 2 doc.)<br>*Survey of English Usage* (forma desarrollada; 23 / 7 doc.) | **SEU** (principal; 47 / 10 doc.)<br>*Survey of English Usage* (forma desarrollada; 17 / 9 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cedel2 | **CEDEL2** (principal; no documentada)<br>*Corpus Escrito del Español como L2* (forma desarrollada; no documentada) | **CEDEL2** (principal; 27 / 9 doc.)<br>*Corpus Escrito del Español como L2* (forma desarrollada; 9 / 7 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| codea | **CODEA+** (principal; no documentada)<br>*Corpus de Documentos Españoles Anteriores a 1800* (forma desarrollada; no documentada) | **CODEA+** (principal; 48 / 9 doc.)<br>*Corpus de Documentos Españoles Anteriores a 1800* (forma desarrollada; 15 / 8 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cleae | **CLEAE** (principal; no documentada)<br>*Corpus Longitudinal de Español de Aprendientes Estonios* (forma desarrollada; no documentada) | **CLEAE** (principal; 15 / 1 doc.)<br>*Corpus Longitudinal de Español de Aprendientes Estonios* (forma desarrollada; 5 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| europarl | **Europarl** (principal; 18 / 3 doc.)<br>*European Parliament Proceedings Parallel Corpus* (forma desarrollada; 1 / 1 doc.) | **Europarl** (principal; 15 / 6 doc.)<br>*European Parliament Proceedings Parallel Corpus* (forma desarrollada; 3 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| splloc | **SPLLOC** (principal; no documentada)<br>*Spanish Learner Language Oral Corpora* (forma desarrollada; no documentada) | **SPLLOC** (principal; 14 / 5 doc.)<br>*Spanish Learner Language Oral Corpora* (forma desarrollada; 5 / 4 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| must | **MUltilingual Student Translation** (principal; 1 / 1 doc.)<br>*MUST* (sigla; no documentada) | **MUST** (principal; 4 / 2 doc.)<br>*MUltilingual Student Translation* (forma desarrollada; no documentada) | Formas documentadas de la unidad en cada subcorpus. |
| ode | **ODE** (principal; no documentada)<br>*Oralia Diacrónica del Español* (forma desarrollada; no documentada) | **ODE** (principal; 8 / 2 doc.)<br>*Oralia Diacrónica del Español* (forma desarrollada; 5 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| llc | **LLC** (principal; 45 / 8 doc.)<br>*London-Lund Corpus* (forma desarrollada; 28 / 9 doc.) | **LLC** (principal; 10 / 5 doc.)<br>*London-Lund Corpus* (forma desarrollada; 10 / 6 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| sse | **SSE** (principal; 6 / 1 doc.)<br>*Survey of Spoken English* (forma desarrollada; 4 / 2 doc.) | **SSE** (principal; 5 / 4 doc.)<br>*Survey of Spoken English* (forma desarrollada; 5 / 4 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| spt | **SPT** (principal; no documentada)<br>*Spanish Corpus Proficiency Level Training* (forma desarrollada; no documentada) | **SPT** (principal; 7 / 2 doc.)<br>*Spanish Corpus Proficiency Level Training* (forma desarrollada; 8 / 3 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| corlexin | **CorLexIn** (principal; no documentada)<br>*Corpus Léxico de Inventarios* (forma desarrollada; no documentada) | **CorLexIn** (principal; 9 / 2 doc.)<br>*Corpus Léxico de Inventarios* (forma desarrollada; 5 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| ecpc | **ECPC** (principal; no documentada)<br>*European Comparable and Parallel Corpora of Parliamentary Speeches Archive* (forma desarrollada; no documentada) | **ECPC** (principal; 6 / 2 doc.)<br>*European Comparable and Parallel Corpora of Parliamentary Speeches Archive* (forma desarrollada; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| gentt | **GENTT** (principal; no documentada)<br>*Géneros Textuales para la Traducción* (forma desarrollada; no documentada) | **GENTT** (principal; 6 / 4 doc.)<br>*Géneros Textuales para la Traducción* (forma desarrollada; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| mellange | **MeLLANGE** (principal; 1 / 1 doc.)<br>*Multilingual eLearning in LANGuage Engineering* (forma desarrollada; no documentada) | **MeLLANGE** (principal; 6 / 2 doc.)<br>*Multilingual eLearning in LANGuage Engineering* (forma desarrollada; 4 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| bidtea | **BiDTEA** (principal; no documentada)<br>*Biblioteca Digital de Textos del Español Antiguo* (forma desarrollada; no documentada) | **BiDTEA** (principal; 6 / 2 doc.)<br>*Biblioteca Digital de Textos del Español Antiguo* (forma desarrollada; 10 / 4 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cate | **CATE** (principal; 1 / 1 doc.)<br>*Corpus de Aprendices Taiwaneses de Español* (forma desarrollada; no documentada) | **CATE** (principal; 4 / 3 doc.)<br>*Corpus de Aprendices Taiwaneses de Español* (forma desarrollada; 3 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| letrac | **LETRAC** (principal; no documentada)<br>*Language Engineering for Translators Curricula* (forma desarrollada; no documentada) | **LETRAC** (principal; 4 / 2 doc.)<br>*Language Engineering for Translators Curricula* (forma desarrollada; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| corane | **CORANE** (principal; no documentada)<br>*Corpus para el Análisis de Errores de Aprendices de E/LE* (forma desarrollada; no documentada) | **CORANE** (principal; 3 / 2 doc.)<br>*Corpus para el Análisis de Errores de Aprendices de E/LE* (forma desarrollada; 3 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cows_l2h | **COWS-L2H** (principal; no documentada)<br>*Corpus of Written Spanish of L2 and Heritage Speakers* (forma desarrollada; no documentada) | **COWS-L2H** (principal; 2 / 1 doc.)<br>*Corpus of Written Spanish of L2 and Heritage Speakers* (forma desarrollada; 1 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| langsnap | **LANGSNAP** (principal; no documentada)<br>*Languages and Social Networks Abroad Project* (forma desarrollada; no documentada) | **LANGSNAP** (principal; 2 / 1 doc.)<br>*Languages and Social Networks Abroad Project* (forma desarrollada; no documentada) | Formas documentadas de la unidad en cada subcorpus. |
| corespi | **CORESPI** (principal; no documentada)<br>*Corpus del Español de los Italianos* (forma desarrollada; no documentada) | **CORESPI** (principal; 1 / 1 doc.)<br>*Corpus del Español de los Italianos* (forma desarrollada; 1 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| eleactar | **ELEACTAR** (principal; no documentada)<br>*Corpus Tartuense de Español Estudiantil Académico* (forma desarrollada; no documentada) | **ELEACTAR** (principal; 1 / 1 doc.)<br>*Corpus Tartuense de Español Estudiantil Académico* (forma desarrollada; 1 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| trados | **Trados** (principal; no documentada)<br>*SDL Trados Studio* (sigla con núcleo; no documentada) | **Trados** (principal; 7 / 3 doc.)<br>*SDL Trados Studio* (sigla con núcleo; 17 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| mallet | **MALLET** (principal; no documentada)<br>*MAchine Learning for LanguagE Toolkit* (forma desarrollada; no documentada) | **MALLET** (principal; 18 / 2 doc.)<br>*MAchine Learning for LanguagE Toolkit* (forma desarrollada; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| cqp | **CQP** (principal; 15 / 5 doc.)<br>*Corpus Query Processor* (forma desarrollada; 4 / 4 doc.) | **CQP** (principal; 10 / 2 doc.)<br>*Corpus Query Processor* (forma desarrollada; 8 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| transit | **Transit** (principal; no documentada)<br>*Star Transit* (sigla con núcleo; no documentada) | **Transit** (principal; 3 / 3 doc.)<br>*Star Transit* (sigla con núcleo; 2 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| gdex | **GDEX** (principal; no documentada)<br>*Good Dictionary Examples* (forma desarrollada; no documentada) | **GDEX** (principal; 2 / 1 doc.)<br>*Good Dictionary Examples* (forma desarrollada; no documentada) | Formas documentadas de la unidad en cada subcorpus. |

#### Sinonimia y parasinonimia (40)

| Entrada | Inglés | Español | Criterio |
|---|---|---|---|
| speech_corpus<br><small>antes: spoken_corpus</small> | **spoken corpus** (principal; 121 / 20 doc.)<br>*speech corpus* (variante denominativa; 245 / 6 doc.) | **corpus oral** (principal; 236 / 23 doc.) | Dos denominaciones inglesas para el mismo concepto: «speech corpus» tiene más ocurrencias, pero «spoken corpus» la usan muchos más documentos. En español ambas tenían ya el mismo equivalente, «corpus oral». |
| corpus_building<br><small>antes: corpus_compilation</small> | **corpus compilation** (principal; 43 / 16 doc.)<br>*corpus building* (variante denominativa; 94 / 8 doc.) | **construcción de corpus** (principal; 36 / 15 doc.)<br>*compilación de corpus* (variante denominativa; 23 / 12 doc.) | Sinónimos que designan el proceso de construir un corpus. |
| raw_frequency<br><small>antes: absolute_frequency</small> | **raw frequency** (principal; 36 / 7 doc.)<br>*absolute frequency* (sinónimo; 16 / 3 doc.) | **frecuencia absoluta** (principal; 53 / 10 doc.)<br>*frecuencia bruta* (sinónimo; 5 / 1 doc.) | Sinónimos que designan el número de apariciones sin normalizar. La preferencia se invierte entre lenguas: en inglés predomina «raw frequency» y en español, «frecuencia absoluta». |
| inter_annotator_agreement<br><small>antes: inter_rater_reliability</small> | **inter-annotator agreement** (principal; 22 / 5 doc.)<br>*inter-rater reliability* (variante denominativa; 15 / 2 doc.) | **acuerdo entre anotadores** (principal; 6 / 3 doc.)<br>*acuerdo interanotador* (sinónimo; no documentada)<br>*fiabilidad interevaluador* (sinónimo; no documentada)<br>*inter-annotator agreement* (variante denominativa; 3 / 2 doc.) | Parasinónimos: ambos designan la concordancia entre anotadores independientes; «rater» es más general que «annotator». En español se documenta «acuerdo entre anotadores» (también en «pruebas de acuerdo entre anotadores») y, puntualmente, el préstamo. |
| word_class<br><small>antes: parts_of_speech</small> | **part of speech** (principal; 77 / 16 doc.)<br>*word class* (variante denominativa; 90 / 9 doc.) | **categoría gramatical** (principal; 91 / 15 doc.)<br>*clase de palabras* (variante denominativa; 138 / 8 doc.) | Sinónimos. «Word class» y «clase de palabras» tienen más ocurrencias, pero «part of speech» y «categoría gramatical» las usan más documentos. Las formas adjetivas del tipo «part-of-speech tagging» no se cuentan aquí porque forman parte de otro término. |
| frequency_list<br><small>antes: word_list</small> | **word list** (principal; 124 / 18 doc.)<br>*frequency list* (variante denominativa; 202 / 15 doc.) | **lista de frecuencias** (principal; 83 / 17 doc.)<br>*lista de palabras* (variante denominativa; 46 / 12 doc.)<br>*wordlist* (variante denominativa; 11 / 5 doc.) | Parasinónimos que designan la lista de formas de un corpus ordenada por frecuencia. «Wordlist» se trata como variante ortográfica de «word list». En español se documenta además el préstamo «wordlist», que el Apéndice III recoge como término del subcorpus español. |
| query<br><small>antes: corpus_queries</small> | **query** (principal; 514 / 17 doc.)<br>*corpus query* (variante denominativa; 68 / 9 doc.) | **consulta** (principal; 414 / 33 doc.)<br>*consulta de corpus* (variante denominativa; 9 / 7 doc.) | «Corpus query» es una variante especificada de «query» con el mismo referente dentro del dominio. Aviso: en español, «consulta» también tiene usos de lengua general, lo que infla su frecuencia. |
| concordance<br><small>antes: concordance_lines</small> | **concordance** (principal; 223 / 22 doc.)<br>*concordance line* (variante denominativa; 16 / 6 doc.) | **concordancia** (principal; 347 / 32 doc.)<br>*línea de concordancia* (sinónimo; 6 / 2 doc.) | Una concordancia es el conjunto de sus líneas; «concordance lines» se usa en el corpus como sinónimo de la concordancia misma. KWIC se mantiene aparte porque designa un formato concreto de presentación. |
| annotation<br><small>antes: corpus_annotation</small> | **annotation** (principal; 1.610 / 38 doc.)<br>*corpus annotation* (variante denominativa; 134 / 18 doc.) | **anotación** (principal; 607 / 37 doc.)<br>*anotación de corpus* (variante denominativa; 37 / 13 doc.) | «Corpus annotation» y «annotation» designan lo mismo dentro del dominio: la especificación «corpus» es redundante en el contexto de la disciplina. |
| corpus_based | **corpus-based** (principal; 416 / 38 doc.) | **basado en corpus** (principal; 120 / 28 doc.)<br>*corpus-based* (variante denominativa; 95 / 27 doc.) | En español conviven la forma patrimonial «basado en corpus» (con su flexión de género y número) y el préstamo «corpus-based». Véase también la nota sobre su relación con «corpus-driven». |
| corpus_driven | **corpus-driven** (principal; 31 / 9 doc.) | **guiado por corpus** (principal; 8 / 3 doc.)<br>*corpus-driven* (variante denominativa; 11 / 7 doc.)<br>*dirigido por corpus* (sinónimo; no documentada) | «Dirigido por corpus», la forma que figuraba antes, no aparece en el subcorpus español. Se documentan el préstamo «corpus-driven», que es la forma más frecuente, y «guiado por corpus». La tesis ya identifica este término como laguna del español (§ 4.5). |
| keyword | **keyword** (principal; 785 / 36 doc.) | **palabra clave** (principal; 125 / 39 doc.)<br>*keyword* (variante denominativa; 51 / 24 doc.) | En español conviven «palabra clave» y el préstamo «keyword», que el Apéndice III recoge como término del subcorpus español («keywords»). |
| learner_corpus | **learner corpus** (principal; 94 / 11 doc.) | **corpus de aprendices** (principal; 43 / 12 doc.)<br>*corpus de aprendientes* (variante denominativa; 68 / 6 doc.) | En español conviven «corpus de aprendientes» y «corpus de aprendices» para el mismo concepto. |
| dependency_parsing | **dependency parsing** (principal; 5 / 4 doc.) | **análisis sintáctico de dependencias** (principal; 6 / 4 doc.)<br>*análisis de dependencias* (sinónimo; 2 / 2 doc.) | En español se documentan «análisis de dependencias» y la forma más explícita «análisis sintáctico de dependencias». |
| clustering | **clustering** (principal; 73 / 4 doc.) | **agrupamiento** (principal; 14 / 2 doc.)<br>*clustering* (variante denominativa; 12 / 3 doc.)<br>*análisis de conglomerados* (variante denominativa; 7 / 2 doc.)<br>*análisis de grupos* (sinónimo; 3 / 1 doc.) | En español conviven el préstamo «clustering», «agrupamiento» (la forma que usa la propia tesis: «agrupamiento (clustering)»), «análisis de conglomerados» y «análisis de grupos». «Agrupamiento» también tiene usos generales: se ha revisado cada aparición y se excluye la única no técnica («agrupamiento humano»). |
| sample_size | **sample size** (principal; 217 / 9 doc.) | **tamaño de la muestra** (principal; 18 / 10 doc.)<br>*tamaño muestral* (sinónimo; 2 / 2 doc.)<br>*tamaño de muestra* (sinónimo; no documentada) | «Tamaño de muestra», la forma que figuraba antes, no aparece en el subcorpus español; se documentan «tamaño de la muestra» (también «tamaño de las muestras») y «tamaño muestral». |
| statistical_significance | **statistical significance** (principal; 43 / 12 doc.) | **significación estadística** (principal; 6 / 2 doc.)<br>*significatividad estadística* (variante denominativa; 5 / 2 doc.)<br>*significancia estadística* (sinónimo; no documentada) | «Significancia estadística», la forma que figuraba antes, no aparece en el subcorpus español; se documentan «significatividad estadística» y «significación estadística». |
| alignment | **alignment** (principal; 157 / 16 doc.) | **alineación** (principal; 101 / 14 doc.)<br>*alineamiento* (variante denominativa; 8 / 5 doc.) | En español se documentan «alineación» y su sinónimo «alineamiento» («alineamiento de corpus paralelos», «alineamiento de frases»). Se excluye «alineamiento dinámico en el tiempo», que designa otra técnica (del reconocimiento del habla). La forma «emparejamiento de segmentos», que usaba la definición anterior, no aparece en el corpus. |
| tagset | **tagset** (principal; 204 / 15 doc.) | **etiquetario** (principal; 40 / 6 doc.)<br>*conjunto de etiquetas* (variante denominativa; 21 / 5 doc.)<br>*tagset* (préstamo; 19 / 4 doc.) | En español conviven «etiquetario», «conjunto de etiquetas» y el préstamo «tagset». Por el criterio de la denominación principal, se prefiere la forma española documentada. |
| treebank | **treebank** (principal; 129 / 14 doc.) | **corpus anotado sintácticamente** (principal; 6 / 4 doc.)<br>*treebank* (variante denominativa; 52 / 11 doc.)<br>*banco de árboles* (sinónimo; no documentada) | En español se documenta el préstamo «treebank», mucho más frecuente, y la forma española «corpus anotado sintácticamente» (también «corpus sintácticamente anotado»). Por el criterio de la denominación principal, se prefiere la forma española documentada; el préstamo figura como variante denominativa. «Banco de árboles», el equivalente que figuraba antes, no aparece en el corpus. |
| stem | **stem** (principal; 126 / 17 doc.) | **raíz** (principal; 56 / 18 doc.)<br>*stem* (préstamo; 1 / 1 doc.) | En español se documenta «raíz» para esta unidad (también en el contexto del stemming) y, de forma aislada, el préstamo «stem». «Raíz» también tiene usos generales y morfológicos (la raíz frente al tema), así que su frecuencia está inflada. |
| dataset | **dataset** (principal; 178 / 29 doc.) | **conjunto de datos** (principal; 37 / 10 doc.)<br>*dataset* (préstamo; 7 / 4 doc.) | En español se prefiere «conjunto de datos»; el préstamo «dataset» aparece de forma puntual. |
| wildcard | **wildcard** (principal; 34 / 2 doc.) | **comodín** (principal; 24 / 10 doc.)<br>*wildcard* (préstamo; 2 / 1 doc.) | En español se usa «comodín»; el préstamo «wildcard» aparece de forma aislada. |
| z_score | **z-score** (principal; 2 / 2 doc.) | **puntuación z** (principal; no documentada)<br>*z-score* (préstamo; no documentada) | No se documenta ninguna forma en el subcorpus español. Se propone «puntuación z», calco habitual en la bibliografía estadística en español; el préstamo «z-score» tampoco aparece. |
| collocational_strength | **collocational strength** (principal; 2 / 2 doc.) | **fuerza de asociación** (principal; 6 / 3 doc.)<br>*grado de asociación* (sinónimo; 2 / 2 doc.)<br>*fuerza colocacional* (sinónimo; no documentada) | En español no aparece «fuerza colocacional», pero sí «fuerza de (la) asociación» y «grado de asociación», referidas a la asociación entre las palabras de una colocación («la información mutua mide la fuerza de asociación entre dos palabras»). |
| corpus_query_language | **corpus query language** (principal; 1 / 1 doc.) | **lenguaje de consulta** (principal; 1 / 1 doc.)<br>*lenguaje de búsqueda de corpus* (variante denominativa; 1 / 1 doc.)<br>*lenguaje de consulta de corpus* (sinónimo; no documentada)<br>*Corpus Query Language* (variante denominativa; 2 / 2 doc.) | En español no aparece «lenguaje de consulta de corpus», pero sí «lenguaje de consulta» y «lenguaje de búsqueda de corpus», y el préstamo «Corpus Query Language», que es además el nombre del lenguaje de Sketch Engine (CQL). |
| mean_score | **mean score** (principal; 77 / 2 doc.) | **media aritmética** (principal; 1 / 1 doc.)<br>*valor medio* (variante denominativa; 1 / 1 doc.)<br>*puntuación media* (sinónimo; no documentada) | «Puntuación media», la forma que figuraba antes, no aparece en el subcorpus español; se documentan «media aritmética» y «valor medio» para este concepto. «Promedio» es más frecuente, pero tiene usos generales y no se incluye. |
| web_as_corpus | **web as corpus** (principal; 18 / 5 doc.) | **web como corpus** (principal; 52 / 11 doc.)<br>*web as corpus* (variante denominativa; 44 / 9 doc.) | En el subcorpus español la denominación inglesa convive con la traducción «la web como corpus». |
| web_for_corpus | **web for corpus** (principal; no documentada) | **web para corpus** (principal; 3 / 2 doc.)<br>*web for corpus* (variante denominativa; 5 / 2 doc.) | La distinción entre web como corpus y web para corpus aparece en el subcorpus español; el subcorpus inglés no usa la segunda denominación. |
| corpus_based_translation_studies | **corpus-based translation studies** (principal; 7 / 2 doc.) | **estudios de la traducción basados en corpus** (principal, decisión expresa; 3 / 3 doc.)<br>*ETBC* (sigla; 10 / 2 doc.)<br>*estudios de traducción con corpus* (variante denominativa; 5 / 3 doc.) | En español la sigla ETBC se introduce a partir de la forma desarrollada; «estudios de traducción con corpus» es la denominación alternativa de Corpas Pastor. Se mantiene como principal la forma desarrollada, como en «relación entre types y tokens». *Decisión expresa: la sigla ETBC solo se usa en dos documentos y siempre tras la forma desarrollada, que es más transparente.* |
| lesk_algorithm | **Lesk algorithm** (principal; no documentada) | **algoritmo de Lesk** (principal; 2 / 2 doc.)<br>*Lesk* (forma reducida; 2 / 2 doc.) | No aparece en el subcorpus inglés. |
| type | **type** (principal; 2.255 / 46 doc.) | **tipo** (principal; 1 / 1 doc.)<br>*type* (variante denominativa; 7 / 5 doc.) | En inglés, «type» también es una palabra general muy frecuente (text type, type of corpus), así que su frecuencia está muy inflada. En español, el par se expresa sobre todo con los préstamos (types y tokens) o en «tipo-token». |
| web_crawling | **web crawling** (principal; 16 / 6 doc.) | **web crawling** (principal; 8 / 3 doc.)<br>*rastreo web* (sinónimo; no documentada) | En español solo se documenta el préstamo; «rastreo» aparece en su sentido general. |
| gold_standard | **gold standard** (principal; 16 / 5 doc.) | **estándar de oro** (principal; 1 / 1 doc.)<br>*gold standard* (variante denominativa; 6 / 2 doc.) | En español, un texto usa también la sigla GS; no se cuenta porque es ambigua. |
| concordancer | **concordancer** (principal; 36 / 8 doc.) | **programa de concordancias** (principal; 6 / 5 doc.)<br>*concordanciador* (sinónimo; no documentada) | Formas documentadas de la unidad en cada subcorpus. |
| word_sense_disambiguation | **word sense disambiguation** (principal, decisión expresa; 16 / 4 doc.)<br>*WSD* (sigla; 7 / 1 doc.) | **desambiguación semántica** (principal; 4 / 3 doc.)<br>*desambiguación léxica* (variante denominativa; 3 / 3 doc.)<br>*word sense disambiguation* (variante denominativa; 6 / 4 doc.) | Formas documentadas de la unidad en cada subcorpus. *Decisión expresa: se mantiene la forma desarrollada frente a la sigla WSD, que en el corpus aparece de forma aislada.* |
| text_mining | **text mining** (principal; 12 / 6 doc.) | **minería de textos** (principal; 27 / 5 doc.)<br>*text mining* (préstamo; 3 / 1 doc.) | Formas documentadas de la unidad en cada subcorpus. |
| range | **range** (principal; 584 / 37 doc.) | **rango** (principal; no documentada) | En inglés, «range» también es una palabra general muy frecuente (a wide range of), así que su frecuencia está muy inflada, como en el Apéndice III. No se documenta ninguna denominación española de esta medida. |
| formulaic_language | **formulaic language** (principal; 8 / 4 doc.)<br>*formulaic sequence* (sinónimo; 2 / 2 doc.) | **lenguaje formulaico** (principal; no documentada) | Formas documentadas de la unidad en cada subcorpus. |
| multiword_expression | **multiword expression** (principal; 8 / 4 doc.) | **expresión multipalabra** (principal; 6 / 4 doc.)<br>*unidad multipalabra* (variante denominativa; 8 / 3 doc.)<br>*unidad pluriverbal* (variante denominativa; 4 / 2 doc.) | Formas documentadas de la unidad en cada subcorpus. |

#### Lema en singular (9)

| Entrada | Inglés | Español | Criterio |
|---|---|---|---|
| hapax_legomenon<br><small>antes: hapax_legomena</small> | **hapax legomenon** (principal; 77 / 7 doc.)<br>*hapax* (forma reducida; 110 / 5 doc.) | **hápax** (principal, decisión expresa; 30 / 2 doc.)<br>*hapax legómeno* (forma completa; no documentada) | Lema en singular (hapax legomenon), con el plural como forma flexiva. La forma reducida «hapax» es una variante, no la principal. *Excepción a la regla de las formas reducidas: «hápax» es la única forma documentada en el subcorpus español y es la forma académica (DLE).* |
| mega_corpus<br><small>antes: mega_corpora</small> | **mega corpus** (principal; 46 / 6 doc.) | **megacorpus** (principal; 10 / 4 doc.) | Lema en singular. Se agrupan las variantes ortográficas (separado, con guion o junto). En español, la forma documentada es la prefijada «megacorpus», conforme a la norma de escritura de prefijos. |
| content_word<br><small>antes: content_words</small> | **content word** (principal; 38 / 10 doc.) | **palabra de contenido** (principal; 4 / 2 doc.) | Lema en singular; el plural se cuenta como forma flexiva. |
| lexical_bundle<br><small>antes: lexical_bundles</small> | **lexical bundle** (principal; 48 / 5 doc.) | **grupo léxico** (principal; 1 / 1 doc.) | Lema en singular; el plural se cuenta como forma flexiva. |
| association_measure<br><small>antes: association_measures</small> | **association measure** (principal; 105 / 6 doc.) | **medida de asociación** (principal; 6 / 3 doc.) | Lema en singular; el plural se cuenta como forma flexiva. |
| annotation_tool<br><small>antes: annotation_tools</small> | **annotation tool** (principal; 51 / 8 doc.) | **herramienta de anotación** (principal; 3 / 2 doc.) | Lema en singular; el plural se cuenta como forma flexiva. |
| descriptive_statistics | **descriptive statistics** (principal; 56 / 8 doc.) | **estadística descriptiva** (principal; 4 / 2 doc.) | En español, lema en singular («estadística descriptiva», nombre de la disciplina). En inglés se mantiene «descriptive statistics»: como nombre de disciplina, «statistics» es un sustantivo no contable en singular, y «descriptive statistic» designaría una sola medida. |
| inferential_statistics | **inferential statistics** (principal; 19 / 6 doc.) | **estadística inferencial** (principal; 5 / 2 doc.) | En español, lema en singular («estadística inferencial»). En inglés se mantiene «inferential statistics», por la misma razón que «descriptive statistics». |
| metadata | **metadata** (principal; 251 / 24 doc.) | **metadato** (principal; 98 / 21 doc.) | En español, lema en singular («metadato», recogido en el DLE), con el plural como forma flexiva. En inglés, «metadata» funciona como sustantivo no contable y no tiene singular en uso. |

### 4.7. Siglas

Cada ficha de una sigla indica su desarrollo («Sigla de…»), que además se cuenta como forma desarrollada. Por el criterio 4.2, la sigla se mantiene como entrada.

| Sigla | Desarrollo | Tipo |
|---|---|---|
| COHA | Corpus of Historical American English | recurso |
| GloWbE | Corpus of Global Web-Based English | recurso |
| MICASE | Michigan Corpus of Academic Spoken English | recurso |
| NOW Corpus | News on the Web Corpus | recurso |
| NLTK | Natural Language Toolkit | recurso |
| CLAWS | Constituent Likelihood Automatic Word-tagging System | recurso |
| KWIC | Key Word in Context | término |
| XML | Extensible Markup Language | término |
| HTML | HyperText Markup Language | término |
| SGML | Standard Generalized Markup Language | término |
| TEI | Text Encoding Initiative | término |
| UTF-8 | 8-bit Unicode Transformation Format | término |
| CWB | Corpus Workbench | recurso |
| BNC | British National Corpus | recurso |
| COCA | Corpus of Contemporary American English | recurso |
| LOB | Lancaster-Oslo/Bergen Corpus | recurso |
| EAGLES | Expert Advisory Group on Language Engineering Standards | término |
| CREA | Corpus de Referencia del Español Actual | recurso |
| CORDE | Corpus Diacrónico del Español | recurso |
| CDH | Corpus del Nuevo Diccionario Histórico | recurso |
| PRESEEA | Proyecto para el Estudio Sociolingüístico del Español de España y de América | recurso |
| CAES | Corpus de Aprendices de Español | recurso |
| CORPES XXI | Corpus del Español del Siglo XXI | recurso |
| IULA | Corpus Técnico del IULA | recurso |
| Val.Es.Co | Corpus de Conversaciones Coloquiales | recurso |
| CEMC | Corpus del Español Mexicano Contemporáneo | recurso |
| COBUILD | Collins Birmingham University International Language Database | recurso |
| CHARTA | Corpus Hispánico y Americano en la Red: Textos Antiguos | recurso |
| CORLEC | Corpus Oral de Referencia de la Lengua Española Contemporánea | recurso |
| SEU | Survey of English Usage | recurso |
| CEDEL2 | Corpus Escrito del Español como L2 | recurso |
| CODEA+ | Corpus de Documentos Españoles Anteriores a 1800 | recurso |
| CLEAE | Corpus Longitudinal de Español de Aprendientes Estonios | recurso |
| Europarl | European Parliament Proceedings Parallel Corpus | recurso |
| SPLLOC | Spanish Learner Language Oral Corpora | recurso |
| MUltilingual Student Translation | MUltilingual Student Translation | recurso |
| ODE | Oralia Diacrónica del Español | recurso |
| LLC | London-Lund Corpus of Spoken English | recurso |
| SSE | Survey of Spoken English | recurso |
| ACTRES | Análisis Contrastivo y Traducción English-Spanish | recurso |
| SPT | Spanish Corpus Proficiency Level Training | recurso |
| CorLexIn | Corpus Léxico de Inventarios | recurso |
| ECPC | European Comparable and Parallel Corpora of Parliamentary Speeches Archive | recurso |
| GENTT | Géneros Textuales para la Traducción | recurso |
| MeLLANGE | Multilingual eLearning in LANGuage Engineering | recurso |
| BiDTEA | Biblioteca Digital de Textos del Español Antiguo | recurso |
| CATE | Corpus de Aprendices Taiwaneses de Español | recurso |
| LETRAC | Language Engineering for Translators Curricula | recurso |
| CdE-Web | Corpus del Español: Web/Dialectos | recurso |
| CdE-NOW | Corpus del Español: NOW | recurso |
| CORANE | Corpus para el Análisis de Errores de Aprendices de E/LE | recurso |
| COWS-L2H | Corpus of Written Spanish of L2 and Heritage Speakers | recurso |
| LANGSNAP | Languages and Social Networks Abroad Project | recurso |
| CORESPI | Corpus del Español de los Italianos | recurso |
| ELEACTAR | Corpus Tartuense de Español Estudiantil Académico | recurso |
| MALLET | MAchine Learning for LanguagE Toolkit | recurso |
| CQP | Corpus Query Processor | recurso |
| DMI-TCAT | Digital Methods Initiative Twitter Capture and Analysis Toolset | recurso |
| GDEX | Good Dictionary Examples | recurso |

### 4.8. Notas conceptuales

Relaciones que no justifican unificar las entradas, pero que conviene explicitar. Se muestran en las fichas afectadas.

- **Basado en corpus / guiado por corpus (corpus-based / corpus-driven).** No todos los autores distinguen los dos enfoques. En sentido estricto se oponen: el enfoque basado en corpus contrasta con los datos hipótesis o categorías previas, mientras que el guiado por corpus deja que las categorías emerjan de los datos. Pero «basado en corpus» también se usa como hiperónimo de cualquier investigación que emplea corpus, y en ese uso abarca el enfoque guiado por corpus.

Datos del subcorpus español relevantes para esta nota: *basado en corpus* (con su flexión) aparece 120 veces en 28 documentos, y el préstamo *corpus-based*, 95 veces en 27. En cambio, *dirigido por corpus* no aparece, y para *corpus-driven* conviven el préstamo (11 casos en 7 documentos) y *guiado por corpus* (8 en 3). § 4.5 identifica estos dos términos como lagunas del español, pero los datos muestran que los dos tienen una forma española documentada: bien asentada en el caso de *basado en corpus* y minoritaria frente al préstamo en el de *guiado por corpus* (sección 8).

### 4.9. Relacionados, pero no unificados

| Términos | Motivo |
|---|---|
| relative frequency / normalized frequency | A menudo se usan como sinónimos, pero la frecuencia relativa es una proporción sobre el total y la normalizada se expresa por una base fija (por ejemplo, por millón de palabras). |
| diachronic corpus / historical corpus | Un corpus histórico puede ser sincrónico (textos de una sola etapa pasada); un corpus diacrónico abarca varias etapas. |
| annotation / corpus_annotation | Casi equivalentes, pero «annotation» es el núcleo del que dependen muchos compuestos del glosario (semantic annotation, annotation scheme…). Pendiente de decisión. |
| keyword / keyword analysis / keyness | Designan la unidad, el procedimiento y la propiedad, respectivamente. |
| concordance / KWIC | KWIC es un formato concreto de presentación de la concordancia. |
| parsing / dependency parsing | Relación de hiperonimia: el análisis de dependencias es un tipo de análisis sintáctico. |
| stopword / function word | Las palabras vacías son una lista operativa para excluir en el procesamiento; las palabras funcionales son una clase gramatical. |
| general corpus / reference corpus / national corpus | Tipos de corpus que se solapan pero responden a criterios distintos: alcance, función y ámbito. |

### 4.10. Comprobación de todo lo no documentado

Un primer recuento daba por no documentado *acuerdo entre anotadores*, que sí aparece: el término estaba partido entre dos líneas. A raíz de ello se repararon los artefactos del texto (5.1) y se comprobaron una por una todas las formas sin apariciones, con búsquedas ampliadas. Resultado:

| Forma sin apariciones | Qué se ha buscado | Resultado y decisión |
|---|---|---|
| *acuerdo interanotador*, *fiabilidad interevaluador* | *inter(-)anotador*, *acuerdo/concordancia/fiabilidad entre anotadores, codificadores, jueces o evaluadores*, *inter-annotator*, *inter-rater* | Se documentan *acuerdo entre anotadores* (7) y el préstamo *inter-annotator agreement* (3). La principal es *acuerdo entre anotadores*. |
| *hapax legómeno* | *h(á)pax legómen-*, *h(á)pax* | Solo *hápax* (30). Principal por decisión expresa. |
| *dirigido por corpus* | *dirigido/guiado/conducido/orientado/basado por/en/desde (el) corpus*, *corpus-driven* | Se documentan *guiado por corpus* (8) y el préstamo *corpus-driven* (11). La principal es *guiado por corpus*. |
| *relación tipo-token* | *relación/ratio/razón/proporción/índice/cociente (entre) tipos/types y tokens/ocurrencias*, *type-token*, *TTR* | Se documentan *relación entre (los) types y tokens* y *cociente entre types y tokens* (5), el préstamo *type-token ratio* (14) y la sigla *TTR* (31). La principal es *relación entre types y tokens*. |
| *tamaño de muestra* | *tamaño(s) de (la/las/una) muestra(s)*, *tamaño muestral* | Se documentan *tamaño de la muestra* / *tamaño de las muestras* (18) y *tamaño muestral* (2). La principal es *tamaño de la muestra*. |
| *significancia estadística* | *significancia*, *significación estadística*, *significatividad*, *estadísticamente significativo* | Se documentan *significatividad estadística* (5) y *significación estadística* (4); *significancia* aparece una vez, sola. La principal es *significatividad estadística*. |
| *fuerza colocacional* | *fuerza de (la) colocación/asociación/atracción*, *grado de asociación* | Se documentan *fuerza de (la) asociación* (6) y *grado de asociación* (2), referidas a la asociación entre las palabras de una colocación. La principal es *fuerza de asociación*. |
| *lenguaje de consulta de corpus* | *lenguaje de consulta/interrogación/búsqueda*, *CQL*, *CQP*, *Corpus Query Language* | Se documentan *lenguaje de consulta* (1), *lenguaje de búsqueda de corpus* (1) y el préstamo *Corpus Query Language* (2). *CQL* no se trata como sigla del término porque es el nombre propio del lenguaje de Sketch Engine. |
| *banco de árboles* | *banco(s) de árboles*, *corpus anotado sintácticamente* y variantes, *treebank* | Se documentan *corpus anotado sintácticamente* (6) y el préstamo *treebank* (52). La principal es *corpus anotado sintácticamente*; *treebank* aparece en la cabecera como variante denominativa. |
| *emparejamiento (de segmentos)* | *emparejamiento*, *emparejar*, *alineamiento*, *alineación de segmentos/oraciones/textos* | *Emparejamiento* no aparece; *emparejarlas* aparece una vez al describir la alineación. Se documenta el sinónimo *alineamiento* (8, sin contar *alineamiento dinámico en el tiempo*, que es otra técnica). Se reformula la definición (4.11). |
| *intervalo de confianza* | *intervalo(s) de confianza*, *nivel de confianza*, *margen de error* | No aparece; *margen de error* es otro concepto. Se mantiene como propuesta. |
| *tamaño del efecto* | *tamaño (del/de) efecto*, *effect size*, *d de Cohen* | No aparece. Propuesta. |
| *marco de muestreo* | *marco (de) muestreo/muestral*, *sampling frame* | No aparece. Propuesta. |
| *puntuación media* | *puntuación media*, *media aritmética*, *valor medio*, *promedio*, *mean score* | No aparece como tal; se documentan *media aritmética* y *valor medio*, que pasan a ser las denominaciones españolas (principal: *media aritmética*). *Promedio* (14) tiene usos generales y no se incluye. |
| *anotación en línea* | *anotación/marcado/etiquetado/codificación en línea, inline, incrustada, integrada, interna*, *stand-off* | No aparece. *Codificación interna* (2, en Rojo) se descarta como equivalente porque no está claro que designe la anotación insertada en el texto frente a la externa. Se mantiene la propuesta. |
| *z-score* | *puntuación z*, *z-score*, *valor z*, *puntuación típica*, *tipificada* | No aparece ninguna forma. Se propone *puntuación z*. |
| *Corpus de Inglés Americano Contemporáneo* (COCA) | traducciones del nombre | No aparece: en español se cita como *COCA* o *Corpus of Contemporary American English*. |
| *corpus LOB* | *LOB* en contexto | No aparece así: se cita como *el LOB* o con la forma desarrollada (*Lancaster-Oslo/Bergen*). Se retira. |
| *CLAWS*, *MICASE* (en español) | nombre y forma desarrollada | No aparecen en el subcorpus español. Son recursos: no se marcan como propuesta. |

Además, se comprobó si los términos cuya forma española era un anglicismo tienen un equivalente español documentado:

| Término | Resultado |
|---|---|
| *tagset* | *etiquetario* (40) y *conjunto de etiquetas* (21), frente a *tagset* (19). Principal: *etiquetario*. |
| *treebank* | véase la tabla anterior. |
| *stem* | *raíz* (56), frente a *stem* (1). Principal: *raíz* (con usos generales que inflan su frecuencia). |
| *dataset* | *conjunto de datos* (37), frente a *dataset* (7). |
| *n-gram* | *n-grama* (36) y el préstamo *n-gram* (16). |
| *wildcard* | *comodín* (24), frente a *wildcard* (2). |
| *clustering* | *agrupamiento* (14), *clustering* (12), *análisis de conglomerados* (7) y *análisis de grupos* (3). Se revisó cada aparición de *agrupamiento* y se excluyó la única no técnica (*agrupamiento humano*). Principal: *agrupamiento*, la forma que usa la propia tesis. |
| *token* | Solo el préstamo (*token*); *ocurrencia* es otro concepto, con ficha propia. Se mantiene *token*. |
| *keyness* | Solo el préstamo (2). Se mantiene. |

### 4.11. Definiciones revisadas

Las definiciones del glosario se generaron a partir del corpus. Se han revisado las que usaban denominaciones no documentadas o erróneas:

- *alineación*: se reformula sin *emparejamiento de segmentos*, con el vocabulario de los textos del corpus («establece la correspondencia entre los segmentos equivalentes…», niveles de texto, párrafo, oración, frase o palabra) y mencionando el sinónimo *alineamiento*.
- *agrupamiento* (*clustering*): recoge todas sus denominaciones en español.
- *corpus anotado sintácticamente* (antes *bancos de árboles*), *guiado por corpus* (antes *corpus guiado*), *fuerza de asociación* (antes *fuerza colacional*, con errata), *tamaño de la muestra*, *significatividad estadística* (también en *medida de asociación*) y *etiquetario*.

## 5. Frecuencias

### 5.1. Método

Todas las frecuencias del glosario se han recontado en los subcorpus con un único procedimiento:

- antes de contar se reparan los artefactos de la conversión desde PDF: guiones blandos y palabras partidas a final de línea, ligaduras tipográficas (*ﬁ* → *fi*: más de 6.000 casos), tildes separadas de su letra (*Introducci´on*, *ling¨u´ıstica*, *espa˜nol*: casi 10.000 casos en 6 documentos españoles) y saltos de línea dentro de un término, que se reducen a un espacio;
- coincidencia exacta de la cadena, sin distinguir mayúsculas (ni tildes, en español) y con límites de palabra; las siglas que en minúscula son palabras comunes (*NOW*) se cuentan distinguiendo mayúsculas;
- cada entrada cuenta todas sus formas (flexión, variantes, sinónimos, préstamos) en **una sola pasada sin solapamientos**, de la cadena más larga a la más corta: una aparición de *LOB Corpus* no suma también como *LOB*, así que la frecuencia de una entrada unificada no es la suma de las antiguas fichas;
- se excluyen expresamente las cadenas que contienen la forma pero designan otro concepto (*hapax dislegomena* no cuenta como *hapax*);
- no se descuentan las apariciones dentro de términos más largos del glosario (como en el Apéndice III);
- para cada forma se registra también el número de documentos en que aparece.

Cada ficha muestra el desglose de las formas contadas, así que cualquier cifra se puede rastrear.

### 5.2. Tamaño de los subcorpus

Las frecuencias relativas y por millón se calculan sobre tokens de spaCy sin espacios en blanco, la unidad de la Tabla 3.8:

| | Tabla 3.8 de la tesis | Recuento actual |
|---|---:|---:|
| Inglés | 1.448.283 | 1.553.229 |
| Español | 954.943 | 954.942 |

El español coincide (diferencia de un token). El inglés no: con el tokenizador de `en_core_web_sm` salen 1.553.229 tokens, y la diferencia se reparte entre los tres tipos de texto de la Tabla 3.3. Probablemente la cifra de la tesis procede de una versión anterior de la limpieza del subcorpus. **Conviene revisarla**, y también el resumen (p. 146 y su versión inglesa), que habla de «aproximadamente 306.000 tokens en inglés y 955.000 en español», en contradicción con la Tabla 3.8.

### 5.3. Relación con el Apéndice III

El Apéndice III cuenta **cada forma por separado**, y así debe seguir. El glosario agrupa las formas de cada concepto y muestra el desglose, de modo que las dos presentaciones parten de los mismos datos.

Se han comparado las 318 cifras del Apéndice III (tablas III.21 a III.24) con el recuento (detalle en `docs/comparacion_apendice_III.csv`):

- **257** coinciden exactamente con el recuento de la forma exacta **sin normalizar los saltos de línea**: es el método con el que se contó la tesis;
- **9** coinciden con el recuento de la forma exacta con los saltos de línea normalizados;
- **12** coinciden con el recuento de la forma con su flexión (singular y plural), que parece la normalización de la herramienta de extracción para algunos términos de varias palabras (*frequency list* = *frequency list* + *frequency lists*);
- **40** no coinciden con ninguno de estos recuentos; la mayoría difieren en pocas unidades.

Consecuencia: las cifras del Apéndice III **infravaloran los términos que aparecen partidos entre dos líneas** y, en los documentos con tildes separadas o ligaduras, los que contienen esos caracteres (por ejemplo, *lingüística*, *significativo*, *codificación*).

**Propuesta:** regenerar las columnas de frecuencia y de frecuencia de documento del Apéndice III con el recuento del glosario (forma por forma, con los saltos de línea normalizados), de modo que tesis y glosario compartan exactamente los mismos datos. La tabla de comparación ya contiene esas cifras (columnas `frec_forma_exacta` y `docs_forma_exacta`).

### 5.4. Limitaciones

- Las formas que también existen en la lengua general tienen una frecuencia inflada: *consulta*, *colocado* (participio de *colocar*), *género* (también gramatical), *encabezado* (también participio), *agrupamiento*.
- Las siglas se cuentan sin distinguir mayúsculas, como en el Apéndice III (*COCA*, *LOB*), salvo las que coinciden con palabras comunes (*NOW*).

## 6. Macroestructura

### 6.1. Nomenclatura

- **Origen.** La nomenclatura cubre todo el inventario de unidades validadas de la tesis (Apéndice III), de origen inglés y español. En la primera versión del glosario solo estaban las unidades del inventario inglés; en septiembre de 2026 se incorporaron las que faltaban: 103 de origen español y 13 de origen inglés.
- **Una entrada por concepto.** Las variantes formales, los sinónimos, los préstamos y las formas flexivas de un concepto se agrupan en una sola entrada (4.1). Al incorporar el inventario de la tesis:
  - *monitor* se integra en la ficha *monitor corpus*: reducción de «corpus monitor».
  - *SDL Trados Studio* se integra en la ficha *Trados*: forma extendida del nombre de Trados.
  - *Star Transit* se integra en la ficha *Transit*: forma extendida del nombre de Transit.
  - *IMS Open Corpus Workbench* se integra en la ficha *CWB*: forma desarrollada de CWB, que ya tenía ficha.
  - *Lancaster-Oslo-Bergen Corpus* se integra en la ficha *LOB*: forma desarrollada de LOB, que ya tenía ficha.
  - *UKB* pasa de término (PROC-LIN) a entidad (Herramientas y software): es el nombre propio de un programa (algoritmo implementado en una herramienta), como las demás herramientas del índice de recursos.
  - *taggers* no se incorpora: no es una entidad sino el plural del término «tagger», que ya tiene ficha.
  - *Macrocorpus sociolingüístico* no se incorpora: no es el nombre de un recurso: en el corpus describe PRESEEA («un macrocorpus sociolingüístico y sincrónico del español»).
  - *lingüística de corpus computacional / lingüística computacional de corpus*: parecen variantes, pero el corpus las distingue expresamente (Bernal Chávez y Hincapié): dos entradas.
- **Diferencias con el Apéndice III.** El glosario incluye además *corpus query language* y *NOW Corpus*, que no están en el apéndice.

### 6.2. Organización

- **Dos repertorios enlazados**: el glosario (términos) y el índice de recursos (entidades), con referencias cruzadas entre ellos (sección 2).
- **Entrada bilingüe única.** Cada entrada es un concepto con sus denominaciones en las dos lenguas, no dos listas separadas: la misma ficha sirve para consultar en inglés o en español. La **lengua de búsqueda** (ES o EN) es independiente de la lengua de la interfaz y determina la denominación que encabeza la ficha, la definición que se muestra y las concordancias.
- **Ordenación alfabética** por la denominación principal en la lengua de búsqueda, con navegación por letras.
- **Clasificación temática** en las 6 categorías del Apéndice III (sección 3), que funcionan como filtro.

### 6.3. Acceso

- **Búsqueda por cualquier forma**: denominación principal, variantes, sinónimos y préstamos. Si se busca una variante, el buscador remite a la entrada principal e indica por qué forma se ha encontrado (4.5).
- **Índice alfabético** y **filtro por categoría**.
- **Referencias cruzadas** entre términos relacionados y entre glosario e índice de recursos.
- **Enlaces estables** a cada ficha; los identificadores antiguos de las fichas unificadas o renombradas siguen funcionando.
- **Páginas complementarias**: guía de uso, descripción del corpus, estadísticas y criterios de normalización.

## 7. Microestructura

### 7.1. Ficha de término

En el orden en que se muestran:

1. **Cabecera**: denominación principal en la lengua de búsqueda (con la marca *propuesta* si no está documentada), variantes denominativas consolidadas a su lado (*part of speech · word class*), equivalente en la otra lengua y categoría temática.
2. **Aviso de búsqueda por variante**, si se ha llegado a la ficha buscando otra forma.
3. **Desarrollo de la sigla**, si la denominación es una sigla («Sigla de…»).
4. **Equivalente** en la otra lengua, con su marca de propuesta si procede.
5. **Nota de equivalente propuesto**, si alguna denominación no está documentada en el corpus.
6. **Variantes y sinónimos**: cada forma con su relación (sigla, variante ortográfica, sinónimo, préstamo, variante denominativa…), su frecuencia y el número de documentos, o la indicación *no documentada en el corpus*.
7. **Notas conceptuales**, si las hay (4.8).
8. **Definición** en la lengua de búsqueda (7.3).
9. **Términos relacionados**: entre 4 y 8 términos del glosario, con enlace a su ficha.
10. **Frecuencia en corpus**: frecuencia absoluta, relativa y por millón en cada subcorpus, y la lista de formas contadas con su frecuencia (5.1).
11. **Fuentes de la definición**: referencias bibliográficas de los textos del corpus en los que se basa la definición.
12. **Concordancias**: hasta 6 líneas KWIC por lengua, de documentos distintos (7.4).

### 7.2. Ficha de recurso

Microestructura reducida: cabecera, desarrollo de la sigla, enlace a la web oficial, variantes, definición, términos relacionados y frecuencia. No incluye fuentes de la definición ni concordancias (sección 2).

### 7.3. Definiciones

- Las definiciones se generaron con un modelo de lenguaje (GPT-4o-mini) mediante recuperación de fragmentos del corpus (RAG): para cada término se recuperan los fragmentos más pertinentes de cada subcorpus (BM25 y similitud semántica, con prioridad para los contextos definitorios) y el modelo redacta la definición **basándose solo en esos fragmentos**.
- Siguen los principios de la norma ISO 704: estructura de género próximo y diferencia específica, y monorreferencialidad.
- La definición española es **autónoma**, no una traducción de la inglesa, y se basa en los fragmentos del subcorpus español.
- Cada ficha fuente incluye también una nota terminológica, que no se muestra en la web.
- En esta revisión se han corregido las definiciones que usaban denominaciones no documentadas o erróneas (4.11). **La revisión del resto la hará la autora** (sección 10).
- **Fichas incorporadas en septiembre de 2026** (116): las redactó Claude (Anthropic) a partir de los contextos de cada unidad en los dos subcorpus, extraídos con prioridad para los contextos definitorios (`_dev/dossier.py`). Siguen la misma estructura y los mismos principios de definición. Sus citas de evidencia se extraen automáticamente del corpus y siempre contienen una de las formas de la unidad (`_dev/build_nuevas_fichas.py`). El contenido redactado está en `_dev/nuevas/`.
- Cada ficha indica en la web y en sus datos (campo `model`) cómo se redactó. **En la tesis hay que mencionar que el glosario combina las dos vías de redacción.**

### 7.4. Concordancias

- Se extraen con las mismas formas y la misma limpieza del texto que el recuento de frecuencias, así que cada concordancia corresponde a una aparición contada.
- Se muestran hasta 6 por lengua, de documentos distintos y dando prioridad a la denominación principal, con 120 caracteres de contexto a cada lado.
- En las fichas unificadas se muestran juntas las concordancias de todas sus formas.

## 8. Datos recalculados para la tesis

Todo lo que depende de los recuentos del corpus y se ha podido recalcular está en `docs/tesis/`. Los archivos se regeneran con `_dev/build_tesis_tables.py` y `_dev/recount_appendix_II.py`.

| Archivo | Sustituye o actualiza | Resultado |
|---|---|---|
| `tabla_3_8_tokens.csv` | Tabla 3.8 (tokens) | Español: 954.942 (coincide). Inglés: 1.553.229 (la tesis dice 1.448.283). |
| `tabla_3_3_3_4_tokens_por_tipo.csv` | Tablas 3.3 y 3.4 | La 3.4 (español) se reproduce exactamente; en la 3.3 (inglés), la diferencia se concentra en los libros. |
| `apendice_III_21_terminos_en.csv` … `apendice_III_24_entidades_es.csv` | Tablas III.21 a III.24 | Frecuencia y frecuencia de documento recalculadas forma por forma, junto a las cifras actuales y la diferencia. |
| `glosario.csv` | El CSV del glosario descrito en § 4.5 | Forma canónica, categoría, equivalentes, variantes con su frecuencia, frecuencias por subcorpus y lagunas. |
| `apendice_II_19_cass_en.csv` | Tabla II.19 | 38 términos; cobertura 38/38; 31.496 ocurrencias (la tesis: 29.275); densidad 2,03 % (la tesis: 2,02 %). |
| `apendice_II_20_rojo_es.csv` | Tabla II.20 | 89 entradas; cobertura 87/89; 7.896 ocurrencias (la tesis: 8.210); densidad 0,83 % (la tesis: 1,15 %). |
| `../comparacion_apendice_III.csv` | — | Detalle de la comparación con el Apéndice III (5.3). |

**Tablas II.19 y II.20.** Se han recalculado con el mismo método de la tesis (secuencias de lemas de spaCy, en minúscula y, en español, sin tildes), pero sobre el texto reparado. Para comprobar el método, se contó también sobre el texto sin reparar:

- **Tabla II.20 (español):** se reproducen exactamente 66 de las 89 cifras de la tesis. Las demás difieren poco, salvo *frecuencia general o total* (545 en la tesis): no se ha encontrado ninguna consulta que dé esa cifra (*frecuencia* sola da 1.450 y *frecuencia general* + *frecuencia total*, 86). Conviene comprobar en los datos originales cómo se contó.
- **Tabla II.19 (inglés):** no se reproduce, porque la tesis la calculó sobre la versión anterior del subcorpus inglés (5.2): todas las cifras actuales son entre un 3 y un 10 % más altas, la misma proporción en que ha crecido el subcorpus. Además, las cuatro últimas filas de la tesis están infravaloradas porque el recuento original no encontró los términos con guion ni las siglas entre paréntesis: *corpus-based* (5 en la tesis; ahora 392), *corpus-driven* (2; 24), *type-token ratio* (2; 16) y *KWIC* (1; 41).
- En inglés, cada término se lematiza dentro de una frase nominal, para que *tagging* o *encoding* no se lean como verbos (*tag*, *encode*).
- **Densidad en español:** la tesis da 1,15 %, pero 8.210 ocurrencias sobre 954.943 tokens son un 0,86 %. En inglés la densidad sí se calcula sobre los tokens de la Tabla 3.8 (29.275 / 1.448.283 = 2,02 %). El recálculo usa en las dos lenguas los tokens de la Tabla 3.8.

**Lagunas terminológicas. Decisión: se adopta el criterio del glosario.** Hay laguna terminológica en una lengua cuando en su subcorpus no se documenta ninguna denominación propia del concepto: o no aparece ninguna forma (el glosario da entonces una propuesta, marcada como tal) o solo aparece el préstamo de la otra lengua. Es un criterio de uso: se aplica sobre el corpus, no sobre el inventario de términos validados. Las siglas internacionales, los nombres propios de estándares y los términos latinos compartidos por las dos lenguas (corpus, subcorpus, KWIC, XML, HTML, SGML, TEI, UTF-8, unicode, EAGLES, Universal Dependencies, Universal POS) no se consideran préstamos.

Con este criterio hay **14 lagunas en español**: *confidence interval* (propuesta: intervalo de confianza), *deviation of proportions* (propuesta: desviación de proporciones), *effect size* (propuesta: tamaño del efecto), *formulaic language* (propuesta: lenguaje formulaico), *inline annotation* (propuesta: anotación en línea), *keyness* (solo el préstamo), *lexico-grammar* (propuesta: léxico-gramática), *range* (propuesta: rango), *sampling frame* (propuesta: marco de muestreo), *stratified sampling* (propuesta: muestreo estratificado), *token* (solo el préstamo), *web crawling* (solo el préstamo), *word sketch* (solo el préstamo), *z-score* (propuesta: puntuación z). § 4.5 decía que había 59 porque contaba como laguna todo término sin equivalente en el inventario español validado, aunque su equivalente aparezca en el corpus (por ejemplo, *basado en corpus*, con 120 apariciones, o *tamaño del corpus*). En inglés, § 4.5 hablaba de 13 lagunas, correspondientes a términos españoles. Ahora que el glosario incluye el inventario español, con el mismo criterio hay **6 lagunas en inglés**: *lingüística de corpus computacional* (propuesta: computational corpus linguistics), *algoritmo de Lesk* (propuesta: Lesk algorithm), *media móvil* (propuesta: moving average), *índice normalizado de dispersión* (propuesta: normalised dispersion index), *corpus telemático* (propuesta: telematic corpus), *web para corpus* (propuesta: web for corpus). Por ejemplo, *corpus oportunista* no es una laguna, porque *opportunistic corpus* está documentado en el subcorpus inglés. En la web, las lagunas se marcan en la ficha: como *propuesta* o como *laguna terminológica: solo se documenta el préstamo*.

**No recalculado** (depende de la herramienta de extracción o de datos que no están en el glosario):

- las columnas TF–IDF, C-value, NC-value y terminologicidad del Apéndice III, que dependen de las frecuencias y habría que recalcular con TECLA;
- la Figura 4.3 y la Tabla 4.7 (distribución del inventario por macrocategorías), que se calculan sobre el inventario de la extracción, no sobre el glosario.

## 9. Cambios que hay que hacer en la tesis

1. **§ 4.5 (Glosario digital):** sustituir las siete categorías por las seis del Apéndice III y explicar la separación entre glosario (términos) e índice de recursos (entidades).
2. **§ 4.5:** actualizar las cifras del glosario (161 términos y 100 entidades) y explicar la normalización (sección 4 de este documento): una entrada por concepto, lema en singular, principal por dispersión, variantes denominativas consolidadas, equivalentes propuestos, búsqueda por variantes.
3. **Tablas 3.3, 3.4, 3.8 y Apéndice III:** sustituir las cifras por las recalculadas (sección 8).
4. **Apéndice III:** añadir una nota que explique que las formas se cuentan por separado y que el glosario las agrupa por concepto, con remisión a los criterios de normalización. Regenerar sus frecuencias (5.3).
5. **Tamaño del subcorpus inglés:** revisar la Tabla 3.8, la Tabla 3.3 y el resumen (5.2).
6. **Equivalentes españoles no documentados:** si la tesis usa como equivalentes *dirigido por corpus*, *acuerdo interanotador*, *test de chi-cuadrado*, *hapax legómeno*, *tamaño de muestra*, *significancia estadística*, *relación tipo-token*, *banco de árboles* o *fuerza colocacional*, conviene sustituirlos por las formas documentadas (4.10) o señalar que son propuestas.
7. **Lagunas (§ 4.5):** sustituir la definición de laguna por el criterio del glosario y las cifras (59 en español y 13 en inglés) por las nuevas (14 en español y 6 en inglés). *Corpus-based* y *corpus-driven* dejan de ser lagunas, porque *basado en corpus* y *guiado por corpus* están documentados (sección 8).
8. **Tablas II.19 y II.20 y texto de la p. 179:** sustituir las cifras por las recalculadas: en inglés, 31.496 ocurrencias y 2,03 % de los tokens (antes 29.275 y 2,02 %); en español, 7.896 y 0,83 % (antes 8.210 y 1,15 %); cobertura 38/38 y 87/89. Revisar *frecuencia general o total* (sección 8).
9. **Artefactos del corpus:** mencionar en la descripción del corpus (capítulo 3) que la conversión desde PDF deja ligaduras, tildes separadas y palabras partidas, y que el recuento del glosario los repara.

## 10. Pendientes

La lista de tareas pendientes, con su estado, está en `docs/pendientes.md`. Las principales:

1. **Revisión de las definiciones** (la hará la autora) **y de los términos relacionados** (entre 4 y 8 por ficha, elegidos por el modelo de lenguaje).
2. **Ejemplos de uso:** añadir a cada término un contexto definitorio seleccionado, detectado con los patrones metalingüísticos de la Tabla IV.26 y revisado a mano.
3. **Frecuencias que no se han podido recalcular aquí:** las columnas de TECLA del Apéndice III (TF–IDF, C-value, NC-value, terminologicidad) y la Figura 4.3 y la Tabla 4.7.
4. **Revisar las fichas incorporadas** (redactadas por Claude), igual que el resto, y las citas en español de las fichas generadas con GPT-4o-mini: en algunas no aparece el término (por ejemplo, en *colligation*).

## 11. Archivos

| Archivo | Contenido |
|---|---|
| `assets/data/normalizacion.json` | Todas las decisiones: unificaciones con su justificación (en español e inglés), excepciones, siglas, notas y formas que se cuentan en cada entrada |
| `assets/data/frecuencias.json` | Frecuencias recontadas por entrada, forma y cadena, con frecuencia de documento y la denominación principal elegida (generado) |
| `docs/comparacion_apendice_III.csv` | Comparación de cada cifra del Apéndice III con el recuento |
| `normalizacion.html` | Página pública de criterios de normalización |
| `_dev/recount_variants.py` | Recuento y elección de la denominación principal |
| `_dev/convert.py` | Genera `entries.json` aplicando las decisiones y las frecuencias |
| `_dev/compare_appendix.py` | Genera la comparación con el Apéndice III |
| `_dev/generate_concordances.py` | Concordancias, con las mismas formas que el recuento |
| `_dev/build_tesis_tables.py` | Tablas recalculadas para la tesis (`docs/tesis/`) |
| `_dev/lemmatise_corpus.py`, `_dev/recount_appendix_II.py` | Lematización del corpus y recálculo de las Tablas II.19 y II.20 |
| `docs/pendientes.md` | Lista de tareas pendientes |
| `_dev/build_decisiones_md.py` | Genera este documento |
