# Playbook de LinkedIn — Noe Quezada

Guía de edición manual, sección por sección. Todo el texto dentro de bloques de código está listo para copiar y pegar. Cuando aplica, se da versión en inglés (EN) y en español (ES).

> **Versión 2 — auditada contra el PDF real del perfil.** La primera versión se escribió sin poder ver el perfil (LinkedIn bloquea el acceso automatizado con HTTP 999), así que varias recomendaciones partían de suposiciones. Ahora están verificadas y las suposiciones equivocadas se corrigen de forma explícita en la sección 0.

## 0. Qué dice tu perfil hoy (verificado)

Extraído del PDF que exportaste. Esto es literalmente lo que ve un reclutador:

| Campo | Contenido actual |
|---|---|
| Nombre | Noe **Ixmak** Quezada |
| Titular | Backend **Developer** \| Java · Spring Boot · AWS Lambda \| REST APIs & Serverless Architecture → **cambiar a "Backend Engineer"** |
| Ubicación | Guadalajara, Jalisco, Mexico |
| Contacto | quezadanoe@gmail.com · +52 6241751162 (móvil) |
| URL | www.linkedin.com/in/noe-ixmak-quezada |
| Aptitudes fijadas | **Ya corregidas**: Java · Spring Boot · Amazon Web Services (AWS) · Docker · Scrum (antes tenías TypeScript · Internacionalización · Tailwind CSS v4) |
| Experiencia | TekChoice LLC — Backend Engineer (Jun 2024 – Presente, 2 años 4 meses) · DXC Technology — Backend Engineer Jr. (Sep 2023 – Jun 2024, 10 meses) · Folio3 Software — Software **Engineer** Jr. ← **debe decir "Software Developer Jr."** (Jul 2022 – Mar 2023, 9 meses) |
| Educación | Universidad de Guadalajara — **Ciclo Formativo de Grado Superior, Ciencias de la computación · (2018 – 2021)** |
| Resumen | Existe, ~5 líneas. Sin una sola métrica y sin mencionar ningún proyecto |
| Destacados · Proyectos · Certificaciones · Idiomas | **No aparecen en el PDF: están vacíos** |

### Lo que el PDF no mostraba (visto en las capturas)

El PDF exportado omite secciones enteras. Las capturas revelan el resto, y hay más de lo que parecía:

| Hallazgo | Detalle |
|---|---|
| 🔴 **Apariciones en búsquedas** | **1 en los últimos 7 días.** 17 visualizaciones del perfil, 0 impresiones de publicaciones |
| 🔴 **Red** | **52 contactos**, 56 seguidores, **0 publicaciones** |
| 🟠 **Proyectos: 4** | Personal Portfolio · ComerBien · Bolsa Mexicana de Valores — Technical Audit · Kapital Landing Page. **Falta Aggora**, tu proyecto de backend más fuerte |
| 🟠 **Aptitudes invertidas** | Folio3 (2022) arrastra **30** aptitudes; **TekChoice (tu trabajo actual) solo 4**. Ver sección 7 |
| 🟠 **Ficha del portfolio con datos falsos** | El proyecto "Personal Portfolio" está etiquetado como **React.js y Cloudflare**. Tu portfolio es **Next.js sobre AWS**. Ni React ni Cloudflare |
| 🟠 **Miniatura obsoleta del portfolio** | La tarjeta muestra una versión antigua de tu web con el nombre **"Noe Ixmak Quezada Torres"** y el cargo **"Software Development Engineer"**. LinkedIn cacheó esa previsualización y no la ha vuelto a leer |
| 🟡 **Tercer nombre distinto** | LinkedIn: "Noe Ixmak Quezada" · miniatura antigua: "Noe Ixmak Quezada Torres" · CV y web: "Noe Quezada" |
| 🟡 **Descripción de Kapital mal formada** | Empieza con *"I'm a Backend Engineer with 4+ years of experience in Java…"*, que es una bio, no la descripción de un proyecto. Viene del README del repositorio |
| ✅ **Titular, banner y "Acerca de"** | Correctos. El banner con `www.ixmak.com` y "B.S. in Computer Systems Engineering" funciona |

**Sobre la miniatura obsoleta:** cuando el portfolio nuevo esté desplegado, usa el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) con `https://www.ixmak.com` para forzar a LinkedIn a releer la tarjeta Open Graph. Ya generamos una imagen de previsualización correcta (1200×630), pero LinkedIn no la verá hasta que le digas explícitamente que vuelva a rastrear la URL.

**Sobre los 52 contactos:** es el techo de todo lo demás. Un perfil con menos de ~150 conexiones se lee como inactivo, y LinkedIn limita el alcance de las publicaciones de cuentas con redes pequeñas. Antes de publicar nada, conecta con excompañeros de TekChoice, DXC y Folio3, y con compañeros de la universidad. Es la acción de mayor retorno del documento y no cuesta más de una hora.

Un reclutador compara LinkedIn, tu CV y tu portfolio. Estos son los choques reales entre los tres:

| # | Campo | LinkedIn | CV / Portfolio | Gravedad |
|---|---|---|---|---|
| 1 | **Titulación y año de fin** | Ciclo Formativo de Grado Superior, **2018–2021** | B.S. / Ingeniería en Sistemas Computacionales, **2018–2023** | 🔴 Crítica — **resuelto: LinkedIn está mal** |
| 2 | **Aptitudes fijadas** | TypeScript · Internacionalización · Tailwind CSS v4 | Java · Spring Boot · AWS | 🔴 Crítica |
| 3 | Cargo TekChoice | Backend **Engineer** | Backend **Developer** | 🟠 Alta |
| 4 | Cargo Folio3 | Software **Engineer** Jr. | Software **Developer** Jr. | 🟠 Alta |
| 5 | Fechas Folio3 | Jul 2022 – Mar 2023 | Ago 2022 – Abr 2023 | 🟠 Alta |
| 6 | Proyectos: BMV, Aggora, Kapital | Ausentes | En el portfolio | 🟠 Alta |
| 7 | Idiomas: Inglés B2, Francés B1 | Ausentes | En los 3 CVs | 🟡 Media |
| 8 | Nombre | Noe **Ixmak** Quezada | Noe Quezada | 🟡 Baja |

**Sobre el #1 — resuelto:** confirmaste que **el CV es el correcto**: Ingeniería en Sistemas Computacionales, 2018–2023, Universidad de Guadalajara (CUCEI). Por tanto **el dato a corregir es el de LinkedIn**, que hoy dice otra titulación y otro año de fin. Un perfil de LinkedIn que declara dos años menos de estudios y una titulación distinta a la de tu CV es exactamente lo que salta en una verificación de antecedentes, y en el peor caso se lee como una inconsistencia deliberada. Corrígelo con este texto:

```text
Universidad de Guadalajara
Ingeniería en Sistemas Computacionales (B.S. in Computer Systems Engineering)
2018 – 2023
```

Y asegúrate de que la sección **Educación** de LinkedIn quede como una sola entrada. Si además hiciste un TSU antes, se lista como entrada aparte, nunca mezclado en la misma línea.

**Sobre el #2:** es el problema más caro y el más rápido de arreglar. Tus tres aptitudes fijadas son de frontend y de CSS, justo lo contrario de tu posicionamiento. Un reclutador que busca "Java developer" o "Spring Boot" no te encuentra, y quien abra tu perfil concluye que eres frontend. "Internacionalización" y "Tailwind CSS v4" ni siquiera son aptitudes estándar del catálogo de LinkedIn.

**Datos base que sí están confirmados**

| Campo | Valor |
|---|---|
| Nombre | Noe Quezada |
| Ubicación | Guadalajara, Jalisco, México — disponible para remoto, abierto a reubicarse |
| LinkedIn | https://www.linkedin.com/in/noe-ixmak-quezada/ |
| GitHub | https://github.com/GodNoden |
| Portfolio | https://www.ixmak.com |
| Email | quezadanoe@gmail.com |
| Educación | Ingeniería en Sistemas Computacionales, 2018–2023, Universidad de Guadalajara, CUCEI **(confirmado por ti; es LinkedIn el que está mal)** |
| Idiomas | Español nativo, Inglés B2, Francés B1 |
| Posicionamiento | "Backend Engineer con 4+ años de experiencia" |

> Regla de oro del documento: **no se inventa nada**. Todo lo que aparece aquí sale de tu experiencia, tus proyectos y tu stack reales. Si un número no está en tus datos, no se escribe.

---

## 1. Los 6 cambios de mayor impacto

Ordenados por relación impacto/esfuerzo, ya con el perfil a la vista. El orden cambió dos veces respecto a la primera versión: el titular no era el problema, y la red pesa más que varios detalles de contenido.

### 1. Aptitudes (Skills): limpiar la lista y reasignarla a TekChoice — 10 minutos

✅ **Lo primero ya está hecho:** las tres fijadas pasaron de `TypeScript · Internacionalización · Tailwind CSS v4` a **Java · Spring Boot · Amazon Web Services (AWS)**, que es lo correcto.

Queda lo de fondo, que es el motivo por el que la sección se siente desordenada: hay **49 aptitudes** con duplicados, aptitudes que no son aptitudes y blandas mezcladas con técnicas, y están **asociadas al empleo equivocado** (Folio3 arrastra 30; TekChoice solo 4).

**Acción:** deja la lista exacta de 50 de la sección 7 —18 altas, 17 bajas— y reasigna las técnicas a TekChoice. Es el cambio que más mueve tus apariciones en búsquedas, que hoy son **una por semana**.

### 2. Destacados (Featured) y Proyectos — 15 minutos

**No tienes ninguno de los dos.** Tus tres mejores proyectos (BMV, Aggora, Kapital) tienen métricas duras que casi ningún candidato puede mostrar, y hoy no existen en LinkedIn. Hasta hace poco tampoco estaban en tus CVs, así que este es el único sitio donde ese trabajo puede vivir.

**Acción:** sube los 4 elementos en el orden exacto de la sección 5.

### 3. Educación: corrige LinkedIn, que es el que está mal — 10 minutos

Confirmaste que tu titulación real es **Ingeniería en Sistemas Computacionales, 2018–2023, Universidad de Guadalajara (CUCEI)**, así que los CVs ya están bien y lo que hay que arreglar es el perfil. Ver el texto exacto en la sección 0.

**Acción:** sustituye la entrada de educación de LinkedIn. Es corto de hacer, pero es lo que más riesgo tiene en una verificación de antecedentes: hoy tu perfil declara dos años menos de estudios y una titulación distinta a la de tu CV.

### 4. Experiencia: unifica las fechas de Folio3 y pasa a bullets de resultado — 45 minutos

Tu cargo actual y el de DXC ya coinciden en los tres sitios: **Backend Engineer** y **Backend Engineer Jr.** Falta un detalle en Folio3, donde LinkedIn dice **"Software Engineer Jr."** y debe decir **"Software Developer Jr."**: ese puesto era de desarrollo, no de ingeniería, y además fue antes de que te graduaras. Aparte queda cuadrar las fechas de Folio3, que no coinciden (LinkedIn Jul 2022 – Mar 2023 frente a CV Ago 2022 – Abr 2023), y reescribir los bullets para que hablen de resultados y no de responsabilidades.

**Acción:** usa los bullets de la sección 6, con **"Contributed to"** / **"Contribuí a"** como verbo honesto, corrige el cargo de Folio3 en LinkedIn y cuadra esas fechas en los tres sitios.

### 5. Acerca de (About): ya existe, pero no tiene ni una métrica — 30 minutos

Tu resumen actual habla de actitud y de aficiones, pero no menciona un solo resultado: ni Lambda, ni Fiserv–DNA, ni el CLS de 0.689 a 0. Solo se ven ~3 líneas antes del "ver más", y hoy esas 3 líneas se gastan en describirte en lugar de demostrar.

**Acción:** pega la versión EN (y ES si mantienes el perfil bilingüe) de la sección 4.

### 6. Red: pasar de 52 a 150+ contactos — 1 hora

Tienes **52 contactos** y **1 aparición en búsquedas**. Aunque arregles todas las aptitudes, LinkedIn limita el alcance de las cuentas con redes pequeñas, y un reclutador que entra a tu perfil ve "52 contactos" antes de leer nada. Es la señal de "cuenta abandonada", y hoy juega en contra tuya en cada visita.

**Acción:** busca a excompañeros de TekChoice, DXC y Folio3, y a compañeros de la Universidad de Guadalajara. Conecta sin mensaje o con una línea. No hace falta que nadie te recomiende: basta con que el número deje de gritar abandono. Se hace en una sentada y es la acción con mejor retorno de todo el documento.

### Y en la misma sesión: idiomas

Inglés B2 y Francés B1 no están en tu perfil. Tu resumen dice que trabajas para Credit Unions de EE. UU., así que la prueba de inglés es directamente relevante para quien te lea. Sección 10.

> **Corrección respecto a la versión 1 de este documento.** Ahí el cambio #1 era reescribir el titular. **Eso era un supuesto equivocado:** tu titular actual ya contiene "Java", "Spring Boot", "AWS Lambda", "REST APIs" y "Serverless Architecture", que son exactamente las palabras clave que importan. No está roto. La sección 3 pasa a ser una mejora opcional, no una urgencia.

### Coherencia obligatoria con tus CVs y tu portfolio

Estos son hechos verificados y cada uno tiene una corrección concreta. Hazlas en la misma sesión de edición, porque un reclutador compara LinkedIn contra tu CV y tu portfolio.

| # | Problema detectado | Acción exacta |
|---|---|---|
| 1 | El CV en francés enlazaba `linkedin.com/in/noe-ixmal-quezada` (con **L**, no **K**) → enlace roto | ✅ **Ya cerrado por construcción.** Los 3 CVs se generan desde `app/lib/profile.ts` y la URL sale de `app/lib/site.ts`, así que la errata no puede volver |
| 2 | Cargos distintos entre LinkedIn, CV y portfolio | ⚠️ **Casi cerrado.** CVs y portfolio ya dicen **Backend Engineer** (TekChoice), **Backend Engineer Jr.** (DXC) y **Software Developer Jr.** (Folio3). LinkedIn coincide en los dos primeros, pero en Folio3 pone **"Software Engineer Jr."** y hay que cambiarlo. Y falta cambiar la primera palabra de tu titular: `Developer` → `Engineer` |
| 3 | Portfolio EN: "Led the modernization" (DXC) vs CV ES: "Contribuí a la modernización" | ✅ **Ya cerrado.** El texto en inglés ya decía "Contributed to"; se corrigió además un error de gramática francesa ("à de la modernisation" → "à la modernisation"). El "Led" que se ve hoy en ixmak.com es del sitio sin desplegar |
| 4 | Stack divergente: el CV listaba Azure, Bash, Git, Jira y Postman y el portfolio no | ✅ **Ya unificado del lado del código.** Bash, Azure, Git, Jira y Postman están ahora en `app/lib/stack.ts`, que alimenta a la vez el portfolio y los 3 CVs |
| 5 | Los 3 CVs no incluían BMV, Kapital ni Aggora | ✅ **Ya corregido.** Los CVs se generan desde los datos del portfolio y ya los incluyen. Falta publicarlos en Destacados (sección 5) |
| 6 | Destacados y Proyectos vacíos en LinkedIn | Es la sección de mayor impacto y la más ignorada: sección 5 |
| 7 | Fechas de Folio3 no coinciden (LinkedIn Jul 2022 – Mar 2023 vs CV Ago 2022 – Abr 2023) | Verifica cuál es correcta y unifica. Un desfase de dos meses no es grave, pero es la clase de detalle que un reclutador ordena mentalmente como "descuidado" |
| 8 | Discrepancia de titulación y año de fin (sección 0, #1) | Prioridad máxima de este documento |

> Los puntos 1, 4 y 5 ya no dependen de que los recuerdes. Los CVs son artefactos generados (`pnpm cv:generate`) a partir de una única fuente de datos, así que esa clase de incoherencia está cerrada por construcción.

### Qué hacer hoy, esta semana y este mes

| Hoy (≈1 h 40 min) | Esta semana (≈3 horas) | Este mes (≈6 horas) |
|---|---|---|
| Limpiar y reordenar las aptitudes: 18 altas, 17 bajas (sección 7) | Reasignar aptitudes a TekChoice y quitarlas de Folio3 (sección 7) | Agregar Inglés B2 y Francés B1 (sección 10) |
| Conectar con 50+ excompañeros de TekChoice, DXC y Folio3 (sección 1, punto 6) | Pegar el About en EN y ES (sección 4) | Publicar los 2 primeros posts (sección 12) |
| Agregar Aggora a Proyectos y arreglar la ficha del portfolio (sección 5) | Reescribir los 3 empleos con bullets métrica primero (sección 6) | Pedir 2 recomendaciones con el mensaje de la sección 11 |
| Corregir la educación en LinkedIn (sección 0, #1) | Unificar cargos y fechas de Folio3 en LinkedIn, CV y portfolio | Activar "Open to work" con las preferencias de la sección 14 |
| Refrescar la tarjeta del portfolio con el Post Inspector | Foto y banner (sección 2) | Fijar fecha de examen AWS Cloud Practitioner (Q4 2026) |

---

## 2. Foto y banner

### Qué hacer

- **Foto:** cuadrada, mínimo 400×400 px, recomendado 800×800 px. Cara centrada, ocupando ~60% del encuadre, fondo neutro y liso, luz frontal, sin filtros ni gafas de sol. Ropa igual o un nivel arriba del puesto al que aspiras (camisa lisa funciona). Es el mismo archivo en LinkedIn, GitHub y portfolio: reconocimiento inmediato.
- **Banner:** 1584×396 px. Ocupa el 100% del ancho pero deja libre el tercio inferior izquierdo, porque ahí se superpone tu foto de perfil en móvil.
- **Regla de legibilidad:** máximo dos líneas de texto, tipografía grande y sin serifas. En móvil el banner se ve como una franja: si no se lee a 375 px de ancho, sobra.

### Texto exacto para el banner

Línea 1 (grande, izquierda-arriba):

```text
Backend Engineer · Java & Spring Boot · AWS Serverless
```

Línea 2 (más pequeña, debajo de la primera):

```text
github.com/GodNoden · ixmak.com
```

Paleta sugerida: fondo oscuro (#0B1220 o similar) con texto blanco y **un** color de acento para el separador. Sin degradados, sin logos de tecnologías amontonados.

### Por qué importa

La foto y el banner son el 100% de la impresión en la lista de resultados de búsqueda junto con el titular. Un banner con "Backend Engineer · Java & Spring Boot · AWS Serverless" comunica el rol antes de que el reclutador lea una sola palabra del About. El banner cuesta 20 minutos y trabaja en cada visita al perfil.

---

## 3. Titular / Headline

> **Tu titular ya tiene las palabras clave correctas, pero empieza con el cargo equivocado.** Verificado en el PDF: `Backend Developer | Java · Spring Boot · AWS Lambda | REST APIs & Serverless Architecture`. Contiene las cuatro palabras clave que un reclutador escribe ("Java", "Spring Boot", "AWS", "Backend") más dos señales fuertes ("REST APIs", "Serverless"), así que **no hace falta reescribirlo**: basta cambiar la primera palabra, `Developer` → `Engineer`, para que coincida con tu cargo real en la sección Experiencia.

### Qué hacer

- Límite duro: **220 caracteres**. Las 3 variantes de abajo están por debajo.
- Estructura que funciona: **Cargo | Tecnologías núcleo | Evidencia o años | Ubicación/Modalidad**.
- Usa el cargo unificado: **Backend Engineer** (nunca "Backend Developer").
- No uses frases vacías: "apasionado por la tecnología", "soñador", "buscando nuevas oportunidades" no aportan nada y no se buscan.
- Recuerda: LinkedIn indexa este campo. "Java", "Spring Boot", "AWS" y "Remoto" deben aparecer literalmente.

### Variantes en español

Variante A:

```text
Backend Engineer | Java · Spring Boot · AWS Serverless | 4+ años construyendo APIs REST y microservicios | Guadalajara, MX | Abierto a remoto y reubicación
```

Variante B:

```text
Backend Engineer | Java, Spring Boot, AWS (Lambda, API Gateway, CloudFormation, CloudWatch) | APIs REST y microservicios | 4+ años | Remoto
```

Variante C:

```text
Backend Engineer con 4+ años en Java y Spring Boot | AWS serverless (Lambda, CloudFormation) | APIs REST, microservicios, Docker, PostgreSQL | Guadalajara, MX | Remoto
```

### Variantes en inglés

Variante A:

```text
Backend Engineer | Java · Spring Boot · AWS Serverless | 4+ years building REST APIs & microservices | Guadalajara, MX | Open to remote & relocation
```

Variante B:

```text
Backend Engineer | Java, Spring Boot, AWS (Lambda, API Gateway, CloudFormation, CloudWatch) | REST APIs & microservices | 4+ years | Open to remote
```

Variante C:

```text
Backend Engineer with 4+ years in Java & Spring Boot | AWS serverless (Lambda, CloudFormation) | REST APIs, microservices, Docker, PostgreSQL | Guadalajara, MX | Remote
```

### Cuál recomiendo

**Variante A en ambos idiomas.** Es la única que junta las cuatro señales que un reclutador filtra: cargo exacto y buscable, stack núcleo, años de experiencia y modalidad/ubicación. La B gasta caracteres enumerando servicios de AWS que ya se ven en las aptitudes y en la experiencia, y la C mete tecnologías de soporte (Docker, PostgreSQL) que aportan menos a la búsqueda que la combinación "microservicios + remoto".

Si tu perfil está en inglés, usa la A en inglés. Si mantienes el perfil en español con un About en inglés, quédate con la A en español y deja los términos técnicos sin traducir, como están.

### Por qué importa

El titular se repite en cada invitación a conectar, cada comentario y cada resultado de búsqueda. Un titular con palabras clave correctas te mete en las búsquedas Boolean de los reclutadores; uno genérico te deja fuera antes de que alguien abra tu perfil. Y usar "Backend Engineer" en lugar de "Backend Developer" elimina la primera pregunta incómoda de la entrevista: ¿cuál es tu cargo real?

---

## 4. Acerca de / About

### Qué hacer

- Límite duro: **2.600 caracteres**.
- Las **3 primeras líneas** son el gancho: se ven sin hacer clic en "ver más". Deben decir qué eres, con qué tecnología y con qué evidencia. Nada de "Hola, soy Noe, bienvenido a mi perfil".
- Párrafos cortos. Una idea por párrafo. Negritas solo en las palabras que quieres que salten.
- Incluye los proyectos con métricas reales: son tu diferencial y no están en tus CVs.
- Incluye el roadmap de certificaciones como **objetivo**, nunca como credencial obtenida.
- Cierra con contacto y modalidad (remoto / reubicación).
- Sin teléfono: LinkedIn tiene su propio campo de contacto.
- Los bloques de abajo están medidos: **EN = 2.522 caracteres**, **ES = 2.515 caracteres** (límite 2.600). Te quedan ~80 caracteres de margen por si LinkedIn cuenta los saltos de línea de otra forma.

### Versión en inglés

```text
Backend developer who ships to production — and can show the numbers.

I build backend systems in Java and Spring Boot, and serverless services on AWS. Over the last 4+ years I have worked on a US credit union's self-service portal, on replacing a legacy catalog and inventory system for Grupo Bimbo, and on a REST API for a platform serving FDA-regulated companies.

What I do

• Serverless on AWS — 6+ Lambda functions for a self-service portal that lets customers request loan deferrals online instead of visiting a branch, consuming core banking data from Fiserv–DNA. Infrastructure as code with CloudFormation and CloudWatch monitoring alerts.
• Java + Spring Boot — REST APIs under a layered Controller–Service–Repository architecture, data-layer refactors that removed DTOs duplicating entity data, and JUnit tests that kept migrations regression-free.
• Requirements to delivery — daily calls with the client to turn business requirements into technical stories and ship them.

Selected work (public, with hard numbers)

• Technical audit of bmv.com.mx — a ~5 KB vanilla TypeScript prototype replacing the market block cut CLS from 0.689 to 0 and TBT from 940 ms to 0 ms.
• Kapital landing rebuild — 60% fewer HTTP requests, 62% fewer bytes transferred, 98% less JavaScript payload and 95% less CSS than the original, with a typed 3-language i18n system built on CSS Container Queries.
• Aggora — a market-data Kafka pipeline built twice (Spring Boot and Quarkus) writing the same topics: schema-validated normalization, poison-message handling with discard and retry topics, transactional producers for exactly-once, and windowed analytics (VWAP, volatility) in a state store, plus a read-only Angular dashboard with seven Prometheus panels and live WebSocket alerts.

Stack: Java, TypeScript, Bash, PHP, SQL · Spring Boot, Laravel · AWS (Lambda, API Gateway, CloudFormation, S3, Cognito, CloudWatch, IAM), Docker, CI/CD with GitHub Actions, Azure, Linux · PostgreSQL, MySQL · REST APIs, Swagger, microservices, serverless, layered architecture, MVC · JUnit, PHPUnit.

Currently working toward: AWS Certified Cloud Practitioner (Q4 2026), Google Cloud Associate Cloud Engineer (Q1 2027), Cambridge C1 Advanced (Q2 2027) and Bloomberg Market Concepts (Q3 2027).

B.S. in Computer Systems Engineering, Universidad de Guadalajara (CUCEI), 2018–2023.

Based in Guadalajara, Jalisco, Mexico · Open to remote or relocation · Native Spanish, English B2, French B1.

quezadanoe@gmail.com · github.com/GodNoden · ixmak.com
```

### Versión en español

```text
Backend Engineer que entrega a producción — y puede mostrar los números.

Construyo backend en Java y Spring Boot, y servicios serverless en AWS. En los últimos 4+ años trabajé en el portal de autoservicio de una cooperativa de crédito de EE. UU., en el reemplazo de un sistema legacy de catálogo e inventario para Grupo Bimbo, y en una API REST para una plataforma de empresas reguladas por la FDA.

Qué hago

• Serverless en AWS — 6+ funciones Lambda para un portal de autoservicio que permite a los clientes solicitar prórrogas de préstamo en línea en vez de ir a sucursal, consumiendo datos del core bancario Fiserv–DNA. Infraestructura como código con CloudFormation y alertas con CloudWatch.
• Java + Spring Boot — APIs REST bajo arquitectura en capas Controller–Service–Repository, refactorización de la capa de datos eliminando DTOs que duplicaban información de las entidades, y pruebas unitarias con JUnit que mantuvieron la migración sin regresiones.
• De requisito a entrega — reuniones diarias con el cliente para convertir requisitos de negocio en historias técnicas y llevarlas a producción.

Trabajo seleccionado

• Auditoría técnica a bmv.com.mx — un prototipo de ~5 KB en TypeScript vanilla que reemplaza el bloque de mercado y bajó el CLS de 0.689 a 0 y el TBT de 940 ms a 0 ms.
• Reconstrucción de la landing de Kapital — 60% menos peticiones HTTP, 62% menos bytes, 98% menos payload de JavaScript y 95% menos CSS, con un sistema i18n tipado en tres idiomas sobre CSS Container Queries.
• Aggora — un pipeline de datos de mercado con Kafka construido dos veces (Spring Boot y Quarkus) sobre los mismos topics: mensajes envenenados con topics de descarte y reintento, productores transaccionales para exactly-once y analítica por ventanas (VWAP, volatilidad) en un state store, más un dashboard Angular con siete paneles de Prometheus y alertas en vivo.

Stack: Java, TypeScript, Bash, PHP, SQL · Spring Boot, Laravel · AWS (Lambda, API Gateway, CloudFormation, S3, Cognito, CloudWatch, IAM), Docker, CI/CD con GitHub Actions, Azure, Linux · PostgreSQL, MySQL · APIs REST, Swagger, microservicios, serverless, arquitectura en capas, MVC · JUnit, PHPUnit.

Certificaciones objetivo: AWS Certified Cloud Practitioner (Q4 2026), Google Cloud Associate Cloud Engineer (Q1 2027), Cambridge C1 Advanced (Q2 2027) y Bloomberg Market Concepts (Q3 2027).

Guadalajara, Jalisco, México · Remoto o reubicación · Español nativo, inglés B2, francés B1.

quezadanoe@gmail.com · github.com/GodNoden · ixmak.com
```

### Por qué importa

El About es el único lugar del perfil donde puedes argumentar, no solo enumerar. El gancho de tres líneas decide si el reclutador despliega; los bullets con Fiserv–DNA, Grupo Bimbo y las métricas de BMV y Kapital son la razón para escribirte. Además, este texto resuelve el problema 5 (tus CVs no incluyen BMV, Kapital ni Aggora): aquí sí están, con las mismas cifras que usarás en la entrevista.

---

## 5. Destacados / Featured

### Qué hacer

- Orden por impacto: primero lo más impresionante y verificable, al final tu hub.
- Todos son **enlaces públicos**: si un reclutador tiene que pedir permiso para verlos, no los ve.
- LinkedIn precarga el título y la descripción desde los metadatos de la página. Si los campos no quedan editables, cambia el título y la descripción del repositorio en GitHub (About + descripción) y vuelve a pegar el enlace.
- Cada elemento lleva **una** métrica en el título. Sin métrica, se ve como cualquier otro repo.
- Los títulos van en inglés si tu perfil está en inglés; abajo dejo las dos versiones.

### Orden exacto y títulos

**1. Auditoría técnica a la BMV** — https://github.com/GodNoden/bmv-audit

Título:

```text
Technical audit of bmv.com.mx — CLS 0.689 → 0, TBT 940 ms → 0 ms
```

Alternativa en español:

```text
Auditoría técnica a bmv.com.mx — CLS de 0.689 a 0, TBT de 940 ms a 0 ms
```

Descripción:

```text
Independent, non-commercial technical audit of Mexico's stock exchange site: performance, accessibility and architecture findings, plus a ~5 KB vanilla TypeScript prototype that replaces the market block.
```

**2. Aggora — pipeline de eventos Kafka** — https://github.com/GodNoden/aggora

Título:

```text
Aggora — market-data Kafka pipeline, built twice (Spring Boot + Quarkus)
```

Alternativa en español:

```text
Aggora — pipeline de eventos Kafka para datos de mercado, construido 2 veces (Spring Boot + Quarkus)
```

Descripción:

```text
Event-driven pipeline with schema-validated normalization, poison-message handling (DLT + retry), transactional producers for exactly-once and windowed VWAP/volatility analytics. Five reproducible failure lessons and a read-only Angular dashboard with 7 Prometheus panels and live WebSocket alerts.
```

**3. Reconstrucción de la landing de Kapital** — https://github.com/GodNoden/kapital-clone

Título:

```text
Kapital landing rebuild — −60% HTTP requests, −62% bytes, −98% JS
```

Alternativa en español:

```text
Reconstrucción de la landing de Kapital — −60% peticiones, −62% bytes, −98% JS
```

Descripción:

```text
Engineering study rebuilding the Kapital landing page: 60% fewer HTTP requests, 62% fewer bytes transferred, 98% less JavaScript payload and 95% less CSS, with a typed 3-language i18n system on CSS Container Queries.
```

**4. Portfolio personal** — https://www.ixmak.com

Título:

```text
Portfolio — ixmak.com
```

Alternativa en español:

```text
Portafolio — ixmak.com
```

Descripción:

```text
Next.js App Router portfolio with TypeScript, Tailwind, next-themes and i18n. Source: github.com/GodNoden/noe-new-portfolio
```

Si LinkedIn no te deja editar la descripción del enlace, publica un **post corto** con ese texto y agrega el post a Destacados en su lugar: el post sí conserva el texto completo.

### Por qué importa

Varios estudios de reclutamiento coinciden en que los elementos multimedia del perfil multiplican las visitas, y Destacados es lo primero que se clica porque está a la altura del titular. Tus repos tienen algo que casi ningún perfil junior/mid tiene: cifras verificables (CLS de 0.689 a 0, −98% de JavaScript, exactly-once en Kafka). Ese es el argumento que gana entrevistas técnicas, y hoy no aparece ni en tu CV ni en tu About.

---

## 6. Experiencia

### Qué hacer

- **Formato métrica primero**: empieza el bullet con el número o con el resultado, no con "Responsable de".
- 3–4 bullets por puesto. Los antiguos, borrar.
- Puesto, empresa y fechas exactamente como están en los datos. En **Ubicación**, pon la ciudad de la empresa o "En remoto"/"Remote" **solo si tu contrato fue remoto**; si no, déjala como corresponda a la empresa.
- Tipo de empleo: Jornada completa.
- No repitas el título del puesto en el primer bullet. Usa el espacio para el logro.
- **Verbo honesto en DXC**: "Contributed to / Contribuí a", nunca "Led / Lideré". Si quieres usar "Led", primero consigue que alguien lo confirme por escrito en una recomendación.

### Por qué los tres cargos no usan la misma palabra

Es deliberado, no un descuido, y conviene tener la respuesta lista porque un entrevistador puede preguntarlo:

| Empleo | Cargo | Por qué |
|---|---|---|
| TekChoice LLC (2024–) | **Backend Engineer** | Tu puesto actual, ya graduado y con responsabilidad sobre servicios en producción |
| DXC Technology (2023–2024) | **Backend Engineer Jr.** | Ya titulado, pero todavía en nivel junior |
| Folio3 Software (2022–2023) | **Software Developer Jr.** | **Todavía no te habías graduado.** Además el trabajo era de desarrollo general, no específicamente de backend |

La regla es sencilla: *Engineer* solo donde el título lo justifica; en el puesto previo a tu titulación, *Developer* es lo correcto y lo que un verificador de antecedentes va a poder confirmar.

### Puesto 1 — Backend Engineer, Tekchoice LLC (Jun 2024 – Presente)

Título del puesto en LinkedIn:

```text
Backend Engineer
```

Bullets en inglés:

```text
• Shipped 6+ AWS Lambda serverless functions for a US credit union's self-service portal, letting customers request loan deferrals online instead of visiting a branch, reading core banking data from Fiserv–DNA.
• Turned client requirements into technical stories through daily calls with the credit union's technical team and their internal Symitar tooling.
• Applied infrastructure as code with AWS CloudFormation and configured CloudWatch monitoring alerts, improving the portal's observability.
```

Bullets en español:

```text
• Entregué 6+ funciones serverless AWS Lambda para el portal de autoservicio de una cooperativa de crédito de EE. UU., permitiendo a los clientes solicitar prórrogas de préstamo en línea en vez de acudir a sucursal y consumiendo datos del core bancario Fiserv–DNA.
• Traduje requisitos del cliente a historias técnicas en reuniones diarias con su equipo técnico y la herramienta interna Symitar.
• Apliqué infraestructura como código con AWS CloudFormation y configuré alertas de monitoreo con CloudWatch, mejorando la observabilidad del portal.
```

### Puesto 2 — Backend Engineer Jr., DXC Technology Company (Sep 2023 – Jun 2024)

Título del puesto en LinkedIn:

```text
Backend Engineer Jr.
```

Bullets en inglés:

```text
• Contributed to the modernization of a legacy catalog and inventory system for Grupo Bimbo (NYSE: BIMBO), building Java and Spring Boot backend features and REST APIs under a layered Controller–Service–Repository architecture.
• Refactored the data layer by removing DTOs that duplicated information already present in the entities and consolidating access through models, simplifying the code and reducing maintenance complexity.
• Wrote JUnit unit tests for the new module, reducing the risk of regressions during the migration.
```

Bullets en español:

```text
• Contribuí a la modernización de un sistema legacy de catálogo e inventario para Grupo Bimbo (NYSE: BIMBO), desarrollando funcionalidades backend en Java y Spring Boot y APIs REST bajo arquitectura en capas Controller–Service–Repository.
• Refactoricé la capa de datos eliminando DTOs que duplicaban información ya presente en las entidades y consolidando el acceso mediante modelos, simplificando el código y reduciendo la complejidad de mantenimiento.
• Escribí pruebas unitarias con JUnit para el nuevo módulo, reduciendo el riesgo de regresiones durante la migración.
```

### Puesto 3 — Software Developer Jr., Folio3 Software Inc. (Ago 2022 – Abr 2023)

Título del puesto en LinkedIn:

```text
Software Developer Jr.
```

Bullets en inglés:

```text
• Fixed bugs and implemented new features in an MVC codebase under Scrum, within a team of 5+ developers.
• Wrote technical documentation and unit tests for every release, keeping the existing CI/CD pipeline green.
• Maintained and extended a REST API backed by an ORM for a platform serving FDA-regulated companies.
```

Bullets en español:

```text
• Corregí bugs e implementé nuevas funcionalidades bajo metodología Scrum y el patrón MVC, dentro de un equipo de 5+ desarrolladores.
• Escribí documentación técnica y pruebas unitarias para cada release, manteniendo la integración continua con el pipeline CI/CD existente.
• Mantuve y desarrollé una API REST usando un ORM para una plataforma que sirve a empresas reguladas por la FDA.
```

### Por qué importa

Los reclutadores técnicos leen los bullets buscando verbo + tecnología + resultado. "Responsable de desarrollar funcionalidades" no dice nada; "6+ funciones Lambda que eliminan la visita a sucursal" sí. Y el cambio de "Led" a "Contributed to" te protege: una exageración detectada en entrevista cuesta la vacante completa, mientras que "contribuí a la modernización de un sistema legacy para una empresa que cotiza en NYSE" ya es suficientemente fuerte sin inflarla.

---

## 7. Aptitudes / Skills

> **Versión 2 de esta sección.** La primera versión recomendaba una lista construida a ciegas, y de hecho **contribuía al problema**: sugería mantener arriba cosas como `Tailwind CSS`, `Astro`, `CSS Container Queries` e `Internationalization (i18n)`, que son exactamente el tipo de aptitud que hoy ensucia tu perfil. Esta versión parte de tu lista real (49 aptitudes) y la reconstruye.

### Por qué se siente messy: son tres causas distintas

**1. Aptitudes que no son aptitudes.** LinkedIn autocompleta lo que escribes al crear un proyecto, y así entraron `Internacionalización`, `Tailwind CSS v4` y `Parámetros de medición`. No son competencias evaluables ni existen en el catálogo estándar; aparecen asignadas a *Kapital Landing Page* y a *Bolsa Mexicana de Valores*, dos proyectos que no son de backend. Un reclutador que lee "Internacionalización · Proyecto: Kapital" no aprende nada.

**2. Duplicados que se solapan.** Tienes pares que dicen lo mismo dos veces, y eso infla la lista sin sumar señal nueva:

| Duplicado | Sobra |
|---|---|
| `Spring Boot` + `Spring Framework` + `Spring MVC` | Mantén los tres, pero son uno solo conceptualmente: no agregues más del ecosistema |
| `Git` + `Control de versiones` | `Control de versiones` |
| `JIRA` + `Herramientas Atlassian` | `Herramientas Atlassian` |
| `Scrum` + `Metodologías ágiles` | Ninguno, pero no agregues una tercera |
| `Desarrollo de API` + `Desarrollo de software` + `Conceptos de programación` | Las dos últimas |
| `Java` + `JavaScript` + `TypeScript` | Ninguno, pero no agregues más lenguajes de frontend |

**3. Aptitudes blandas mezcladas con técnicas.** `Razonamiento analítico`, `Resolución de problemas`, `Trabajo en equipo`, `Capacidad de análisis` e `Intercambio de conocimientos` no las busca ningún reclutador con filtros, ocupan cinco de tus cincuenta casillas y diluyen la señal técnica. Todo el mundo las tiene; por eso no diferencian.

### La lista de 50, ya ordenada

Fija las tres primeras. Pega el resto en este orden exacto: LinkedIn respeta el orden de la lista y las primeras posiciones pesan más en las búsquedas.

```text
Java
Spring Boot
Amazon Web Services (AWS)
AWS Lambda
AWS CloudFormation
Amazon API Gateway
Amazon CloudWatch
Amazon S3
Serverless Computing
Microservices
Desarrollo de API
Apache Kafka
Apache Kafka Streams
Event-Driven Architecture
Prometheus
WebSockets
Docker
CI/CD
GitHub Actions
Linux
PostgreSQL
SQL
MySQL
NoSQL
Administración de bases de datos
Spring Framework
Spring MVC
Modelo-Vista-Controlador (MVC)
Arquitectura de software
Quarkus
Prueba unitaria
JUnit
Pruebas de rendimiento del software
Git
JIRA
Scrum
Metodologías ágiles
Maven
Postman
TypeScript
JavaScript
PHP
Python
Bash
Fiserv - DNA
Fintech
React.js
Laravel
HTML
CSS
```

**Las 18 que faltan y hay que agregar:** `Amazon API Gateway`, `Amazon CloudWatch`, `Amazon S3`, `Serverless Computing`, `Microservices`, `Apache Kafka`, `Apache Kafka Streams`, `Event-Driven Architecture`, `Prometheus`, `WebSockets`, `CI/CD`, `GitHub Actions`, `Arquitectura de software`, `JUnit`, `Postman`, `Bash`, `Fintech`, `Quarkus`.

`Apache Kafka` es la más importante de todas: es tu proyecto más fuerte (Aggora) y hoy no aparece en ninguna casilla. Quien busca perfiles con Kafka —que es exactamente quien contrata backend de sistemas financieros— no te encuentra.

### Las 17 que hay que borrar

```text
Internacionalización
Tailwind CSS v4
Astro.js
Cloudflare
Node.js
Herramientas Atlassian
Control de versiones
Intercambio de conocimientos
Capacidad de análisis
Razonamiento analítico
Resolución de problemas
Trabajo en equipo
Desarrollo de software
Conceptos de programación
Parámetros de medición
Inglés
Francés
```

`Inglés` y `Francés` no se borran para esconderlos: van en la sección **Idiomas**, que es donde un reclutador los busca y donde se puede indicar el nivel. Como aptitud, "Inglés" sin nivel no comunica nada.

No borres `React.js`, `Laravel`, `HTML`, `CSS`, `PHP`, `Python` ni `Maven`: son reales, están en tus proyectos y en tus CVs, y quitarlas crearía la divergencia que este documento intenta evitar. Simplemente van al final, no compiten por la atención.

### El problema más grave de esta sección: las aptitudes están invertidas

No es solo la lista; es **a qué experiencia está asociada cada aptitud**:

| Dónde | Cuántas aptitudes |
|---|---|
| Folio3 Software (2022, Laravel) | **30** |
| Educación | 9 |
| Proyectos: Kapital / ComerBien / BMV / Portfolio | 4 + 4 + 2 + 2 |
| DXC Technology (2023) | 4 |
| **TekChoice LLC (tu trabajo actual)** | **4** |

Tu trabajo actual —el único con AWS, Lambda, serverless y core bancario, el que quieres que mire un reclutador— es el que tiene el bloque de aptitudes más pobre, mientras que un puesto de 2022 en Laravel arrastra treinta. La lectura que hace un reclutador es la contraria a la que buscas: parece que tu experiencia fuerte es la antigua.

**Qué hacer:** entra a TekChoice LLC → editar → Aptitudes, y asocia ahí `Java`, `Spring Boot`, `Amazon Web Services (AWS)`, `AWS Lambda`, `AWS CloudFormation`, `Amazon API Gateway`, `Amazon CloudWatch`, `Serverless Computing`, `Docker`, `CI/CD`, `Desarrollo de API`, `Fiserv - DNA`, `PostgreSQL` y `Git`. Luego ve a Folio3 y quita todo lo que no sea de ese empleo (`Laravel`, `PHP`, `MySQL`, `MVC`, `Maven`, `JIRA`, `Scrum`, `Prueba unitaria`). No se borra la aptitud, solo se reasigna a quien corresponde.

### Por qué importa

Las aptitudes alimentan el motor de búsqueda de LinkedIn. Y aquí tienes la prueba, en tus propias analíticas:

> **1 aparición en búsquedas en los últimos 7 días.**

Un perfil con 49 aptitudes y 4 años de experiencia que aparece **una vez por semana** en los resultados de búsqueda está, en la práctica, fuera del mercado. Las aptitudes no son decoración: son el índice con el que LinkedIn decide si existes cuando un reclutador filtra por "Java", "Spring Boot" o "Kafka".

Arreglar la lista no basta por sí solo —la red social y la actividad también pesan, ver secciones 11 y 12— pero es la palanca más barata que tienes y la que desbloquea todo lo demás.

---

## 8. Certificaciones y Licencias

### Qué hacer

- **No agregues como obtenidas** las certificaciones que están en tu roadmap. LinkedIn muestra fecha de emisión y un reclutador puede pedir el credential ID. Declarar una certificación que no tienes es motivo de rechazo en procesos formales.
- Las que están en objetivo son: AWS Certified Cloud Practitioner (Q4 2026), Google Cloud Associate Cloud Engineer (Q1 2027), Cambridge C1 Advanced (Q2 2027), Bloomberg Market Concepts (Q3 2027). Van en el About (sección 4) como objetivo, y aquí solo cuando apruebes.
- Deja la sección **vacía** hasta la primera certificación. Una sección vacía no resta; una credencial falsa hunde el proceso.
- En cuanto apruebes AWS Cloud Practitioner, pega exactamente esto:

```text
Nombre: AWS Certified Cloud Practitioner
Entidad emisora: Amazon Web Services (AWS)
Fecha de expedición: [mes y año reales del examen]
Fecha de vencimiento: [la que indique tu credencial; las de AWS duran 3 años]
ID de credencial: [el de tu credencial]
URL de la credencial: [tu enlace de Credly]
```

Para las siguientes, mismo formato cambiando:

```text
Google Cloud Associate Cloud Engineer — Google Cloud
Cambridge C1 Advanced — Cambridge University Press & Assessment
Bloomberg Market Concepts — Bloomberg
```

- Cuando llegue el momento, agrega cada certificación también a la sección **Educación → Cursos** solo si el emisor ofrece formación acreditada; no dupliques.

### Por qué importa

Esta sección es la que convierte "dice que sabe AWS" en "tiene un examen aprobado que lo respalda". Tenerla vacía hoy es correcto y honesto; llenarla con el roadmap es un riesgo evitable. El orden correcto es: primero apruebas, luego publicas, y ahí mismo lo cuentas en un post (ver sección 12).

---

## 9. Educación

### Qué hacer

- Un solo registro: la carrera. Sin preparatoria ni intercambios que no estén en tus datos.
- Usa el nombre oficial de la institución y del centro, porque así lo buscan los reclutadores en México.

Campos exactos (versión en español):

```text
Centro educativo: Universidad de Guadalajara
Título: B.S. en Ingeniería en Sistemas Computacionales
Campo de estudio: Ingeniería en Sistemas Computacionales
Fecha de inicio: 2018    Fecha de finalización: 2023
```

Versión en inglés:

```text
School: Universidad de Guadalajara
Degree: B.S. in Computer Systems Engineering
Field of study: Computer Systems Engineering
Start date: 2018    End date: 2023
```

En la descripción (opcional, uno solo):

```text
CUCEI — Centro Universitario de Ciencias Exactas e Ingenierías.
```

### Por qué importa

El título es un filtro duro en muchas vacantes y en varios procesos migratorios. Ponerlo con el nombre exacto de la institución y el rango 2018–2023 evita que un reclutador asuma que la carrera quedó truncada. Y "B.S." comunica grado completo, no "estudiante".

---

## 10. Idiomas

### Qué hacer

- Agrega los tres. LinkedIn pide un nivel por idioma y esos niveles son filtros de búsqueda.
- Elige el nivel honesto: un B2 que se declara C1 se descubre en la primera llamada en inglés.
- Guarda la captura del resultado de Cambridge cuando lo presentes y actualiza el nivel ese mismo día.

Valores exactos a seleccionar:

| Idioma | Nivel a elegir (ES) | Nivel a elegir (EN) | Respaldo |
|---|---|---|---|
| Español | Nativo o bilingüe | Native or bilingual | Nativo |
| Inglés | Competencia profesional | Professional working proficiency | B2 |
| Francés | Competencia profesional limitada | Limited working proficiency | B1 |

Notas:

- Si tu interfaz está en español, los nombres de las opciones pueden variar ligeramente; elige la equivalente por orden: nativo → profesional completo → profesional → limitada → básica.
- No subas inglés a "Competencia profesional completa" teniendo B2: la diferencia se nota al hablar y la entrevista técnica suele ser en inglés.
- Cuando apruebes Cambridge C1 Advanced (Q2 2027), sube inglés a "Competencia profesional completa" y agrégalo en Certificaciones con el mismo formato de la sección 8.

### Por qué importa

Muchas vacantes remotas para empresas de EE. UU. filtran por nivel de inglés antes de leer la experiencia. Declarar B2 como "profesional" te mete en los filtros sin mentir, y el francés B1 es un diferenciador poco común que conviene tener visible.

---

## 11. Recomendaciones

### Qué hacer

- Objetivo mínimo: **2 recomendaciones**, ideal 3 — una por cada empleo de los últimos 3 años, o dos de Tekchoice/DXC y una de un proyecto.
- Pídeselas a quien pueda hablar de **trabajo verificable**: tu líder técnico, el tech lead del cliente, o un compañero senior que revisó tu código. No a un amigo sin contexto laboral.
- Manda tú el borrador. La gente dice sí mucho más rápido cuando solo tiene que editar, no redactar.
- Recomendación que funciona: contexto (qué hacía el equipo) + una contribución concreta + una tecnología + un resultado. 3 a 5 frases.
- **Recomienda tú primero.** Ser recíproco es la forma más efectiva de conseguirlas.

### Mensaje exacto para pedir una recomendación (ES)

```text
Hola [Nombre], ¿cómo estás? Te escribo por algo puntual.

Estoy actualizando mi perfil de LinkedIn y una recomendación tuya me ayudaría mucho. Trabajamos juntos en [Tekchoice LLC / DXC Technology / Folio3] entre [mes/año] y [mes/año], y lo que más valoraría es que menciones algo concreto y verificable de lo que hice, por ejemplo: [las funciones AWS Lambda del portal de autoservicio / la refactorización de la capa de datos eliminando DTOs / las pruebas unitarias con JUnit].

Con 3 o 4 frases es suficiente. Si quieres, te paso un borrador que puedes editar o reescribir por completo —lo importante es que suene a ti, no a mí.

Y si por la razón que sea prefieres no hacerlo, no pasa nada, lo entiendo perfectamente. Gracias por el tiempo.

Noe
```

### Mensaje exacto para pedir una recomendación (EN)

```text
Hi [Name], how are you? I'm reaching out about something specific.

I'm updating my LinkedIn profile and a recommendation from you would help a lot. We worked together at [Tekchoice LLC / DXC Technology / Folio3] between [month/year] and [month/year], and what I'd value most is that you mention something concrete and verifiable about my work, for example: [the AWS Lambda functions for the self-service portal / the data-layer refactor that removed redundant DTOs / the JUnit tests for the new module].

3 or 4 sentences is plenty. If it helps, I can send you a draft you're free to edit or rewrite entirely — what matters is that it sounds like you, not like me.

And if for any reason you'd rather not, that's completely fine, I understand. Thanks for your time.

Noe
```

### Borrador para adjuntar (rellena los corchetes y mándalo junto al mensaje)

```text
Trabajé con Noe en [empresa] entre [mes/año] y [mes/año]. Durante ese tiempo [contexto: por ejemplo, formó parte del equipo que construyó el portal de autoservicio para una cooperativa de crédito de EE. UU.].

Lo que más destaco de su trabajo es [logro concreto y verificable, con la tecnología: por ejemplo, diseñó e implementó 6+ funciones serverless en AWS Lambda y configuró la infraestructura con CloudFormation y alertas de CloudWatch].

Además, [segunda cualidad observable: por ejemplo, traducía los requisitos del cliente a historias técnicas en las reuniones diarias y las llevaba hasta producción sin supervisión cercana].

Lo recomendaría para cualquier rol backend donde se necesite [Java y Spring Boot / trabajo serverless en AWS] con criterio propio y comunicación directa con el cliente.
```

Reglas al llenarlo: una sola contribución concreta, cero adjetivos vacíos ("proactivo", "apasionado"), y nada de cifras que no pueda confirmar quien firma.

### Por qué importa

Las recomendaciones son la única prueba social del perfil que otra persona firma con su nombre. Aparecen en la vista del perfil justo debajo de la experiencia y, en procesos con varios candidatos parecidos, son el desempate. Además, cuando pides una recomendación le das a esa persona un motivo legítimo para volver a tu perfil, lo que también genera visitas.

---

## 12. Actividad y publicaciones

### Qué hacer

- **Cadencia sostenible:** 1 publicación cada 2 semanas (2 al mes). Mejor 2 posts buenos al mes que 8 malos y luego desaparecer.
- **Formato que funciona:** 1 idea por post. Primera línea = gancho con número o contradicción. Luego 3–6 líneas de contexto. Cierre con una pregunta concreta.
- **Regla de contenido:** nada de "feliz de anunciar que" sin contenido. Cada post debe enseñar algo que el lector pueda aplicar, o mostrar un número real.
- **Comenta antes de publicar.** 15–20 minutos diarios comentando con criterio en posts de backend, AWS y Java te dan más alcance que un post semanal. Los comentarios son el mayor generador de visitas al perfil y no requieren publicar nada.
- **Idioma:** publica en inglés si tu objetivo son vacantes remotas de EE. UU.; en español si buscas mercado local. Si dudas, publica en inglés y agrega la primera línea en español.
- **Nada de automatización.** Los bots que publican, comentan o hacen scraping violan el User Agreement de LinkedIn y arriesgan la cuenta (restricción temporal o permanente). Si algún día quieres automatizar, la única vía legítima es la API oficial de LinkedIn, y el acceso para publicar o automatizar un perfil personal está restringido y requiere aprobación. Mientras tanto: a mano.

### 6 ideas de post, sacadas de tus proyectos

**1. El prototipo de 5 KB que bajó el CLS de 0.689 a 0**

Gancho: "Un archivo de ~5 KB en TypeScript vanilla eliminó el 100% del CLS de la página del mercado de una bolsa de valores."

Cuerpo: qué medías antes (Lighthouse y axe), por qué el layout shift venía del bloque de mercado, cómo el prototipo en SVG + TypeScript lo reemplaza, resultado: CLS 0.689 → 0, TBT 940 ms → 0 ms. Cierre: "¿Estás midiendo CLS en producción o solo en el lab?"

**2. Cinco fallos que solo aparecen cuando corres Kafka en serio**

Gancho: "Mi motor de Kafka Streams estaba muerto y el proceso seguía vivo. Ese fue el quinto fallo que tuve que reproducir para creerlo."

Cuerpo: lista los 5 fallos reproducibles de Aggora (broker caído, mensaje envenenado llegando al DLT, rebalanceo de consumidores, carrera de exactly-once, motor de streams muerto con el proceso vivo) y en qué se diferencia un DLT de un retry topic. Cierre: "¿Cuál de estos cinco te ha despertado a las 3 a.m.?"

**3. La misma pipeline, escrita dos veces: Spring Boot vs Quarkus**

Gancho: "Construí la misma pipeline de Kafka dos veces, escribiendo los mismos topics, para comparar. No era una pregunta de benchmarks."

Cuerpo: qué cambió en arranque, consumo, configuración y estilo de código entre Spring Boot y Quarkus; para qué elegirías cada uno. Cierre: "¿Con cuál te quedas para un servicio con estado?"

**4. −98% de JavaScript en una landing: qué se borró exactamente**

Gancho: "Reconstruir una landing con Astro bajó el payload de JavaScript 98% y el CSS 95% respecto al original. Esto es lo que desapareció y por qué nadie lo notó."

Cuerpo: desglose de las métricas (peticiones −60%, bytes −62%, JS −98%, CSS −95%), el papel de las CSS Container Queries en el sistema i18n tipado en tres idiomas. Cierre: "¿Cuánto JS carga tu landing y cuánto de eso se usa de verdad?"

**5. Borrar DTOs que solo repetían las entidades**

Gancho: "Refactoricé una capa de datos eliminando DTOs que duplicaban información ya presente en las entidades. El código quedó más pequeño y más fácil de mantener."

Cuerpo: cuándo un DTO aporta valor y cuándo solo duplica (mapeos de API, fronteras de módulo, campos calculados) y cómo consolidar el acceso mediante modelos. Sin nombres de cliente ni detalles internos. Cierre: "¿Cuántos de tus DTOs existen solo por costumbre?"

**6. Una prórroga de préstamo que ya no requiere ir a sucursal**

Gancho: "6+ funciones serverless cambiaron un trámite presencial por un flujo en línea para los clientes de una cooperativa de crédito."

Cuerpo: cómo se diseñó el flujo sobre Lambda y API Gateway consumiendo datos del core bancario Fiserv–DNA, qué aportó la infraestructura como código con CloudFormation y por qué las alertas de CloudWatch fueron la parte que más cambió la operación. Cierre: "¿Qué trámite de tu producto todavía obliga al usuario a moverse?"

### Por qué importa

El algoritmo de LinkedIn premia la actividad reciente, pero sobre todo premia el contenido que genera interacción real. Cada uno de estos seis posts nace de un proyecto que ya existe, así que no requieres producir nada nuevo: solo contar lo que hiciste. Y cada post es una prueba pública de que sabes de lo que dice tu perfil, lo que a su vez valida el titular y el About.

---

## 13. URL personalizada y configuración de perfil público

### Qué hacer

- Tu URL personalizada ya está bien: `linkedin.com/in/noe-ixmak-quezada`. No la cambies. Verifica que en **Editar URL pública** aparezca exactamente `noe-ixmak-quezada`, sin números.
- Activa el perfil público: en **Configuración y privacidad → Visibilidad → Editar tu URL pública y la información de tu perfil**, deja el perfil público **activado** y con visibilidad completa (foto, titular, About, experiencia, educación). Si el perfil público está apagado, tu portfolio y tus CVs enlazan a una pantalla de login.
- Agrega los sitios web en **Información de contacto → Sitio web**:
  - Sitio web (Portafolio): `https://www.ixmak.com`
  - GitHub: `https://github.com/GodNoden`
  - Empresa: `https://tekchoice.com/` (si quieres, o déjalo fuera)
- Corrige el error que ya existe en tu CV en francés: dice `linkedin.com/in/noe-ixmal-quezada` (con **L**). El correcto es `https://www.linkedin.com/in/noe-ixmak-quezada/`. Un enlace roto en el CV es una pérdida silenciosa: quien lo cliquea no llega a tu perfil y no te avisa.
- Revisa la URL en los 3 CVs, en el portfolio y en la firma de tu email. Una sola forma, idéntica en todos lados.
- En **Configuración → Visibilidad → Notificar a tus contactos** puedes desactivar los avisos masivos mientras haces esta limpieza: así no notificas 15 cambios seguidos.

### Por qué importa

Una URL limpia se ve profesional y se dicta por teléfono sin errores. El perfil público activado es lo que hace que tu portfolio y tus CVs funcionen como embudo: sin él, cada clic desde `ixmak.com` hacia LinkedIn muere en un muro de login justo en el momento de mayor interés. El enlace roto del CV en francés es el caso extremo del mismo problema: rompe la cadena sin que nadie te lo diga.

---

## 14. "Open to work" y preferencias de empleo

### Qué hacer

Configura **Open to work** con la visibilidad **solo para reclutadores** ("Solo reclutadores") mientras sigues empleado en Tekchoice. El marco verde público (#OpenToWork) es útil cuando no tienes empleo, pero publicarlo teniendo trabajo actual genera una conversación incómoda sin darte alcance adicional: los reclutadores filtran por las preferencias, no por el marco.

Ruta: **Open to work → Buscar un nuevo empleo**, y llena:

```text
Puesto: Backend Engineer
```

Puestos adicionales a agregar (máximo 5 en total):

```text
Backend Engineer
Software Engineer
Java Developer
Software Developer
```

```text
Tipo de empleo: Jornada completa
Fecha de inicio: Inmediatamente (o "Flexible" si prefieres negociar)
Modalidad: En remoto
Ubicaciones: Guadalajara, Jalisco, México
             Ciudad de México, México (opcional)
             Remoto (México)
```

```text
Visibilidad: Solo reclutadores
```

Notas:

- Marca **En remoto** en modalidad, no solo la ubicación: es un filtro independiente en LinkedIn.
- Tu disponibilidad para reubicarte se comunica en el About (sección 4) y en la conversación; si quieres que también sea un filtro, agrega ubicaciones adicionales dentro de México y, si de verdad te mudarías, alguna ciudad del extranjero donde tengas autorización para trabajar. No agregues países donde no tengas permiso de trabajo: solo genera vacantes descartables.
- Indica en "Tipo de empleo" únicamente Jornada completa. No marques prácticas ni freelance si no los quieres.
- Si en algún momento sales de Tekchoice, cambia la visibilidad a **Todos los miembros de LinkedIn** y agrega el marco verde en la foto de perfil.
- Revisa estas preferencias cada 3 meses: LinkedIn caduca el estado "Open to work" y deja de mostrarte.

### Por qué importa

"Open to work" es lo que te mete en la herramienta donde los reclutadores buscan por puesto, modalidad y ubicación. Configurado solo para reclutadores, obtienes el beneficio completo sin anunciar a tu empleador actual que estás buscando. Y "En remoto" + "Backend Engineer" son exactamente los dos filtros que abren las vacantes que quieres: sin ellos, tu perfil puede ser perfecto y aun así no aparecer.

---

## 15. Checklist final

Marca cada casilla al terminarla. El orden sugerido es el de arriba hacia abajo.

**Identidad**

- [ ] Foto cuadrada (mínimo 400×400, ideal 800×800), rostro centrado, fondo neutro
- [ ] Misma foto en LinkedIn, GitHub y portfolio
- [ ] Banner 1584×396 con "Backend Engineer · Java & Spring Boot · AWS Serverless" y "github.com/GodNoden · ixmak.com"
- [ ] Banner legible en móvil (probado a 375 px de ancho)

**Titular y About**

- [ ] Titular con la Variante A recomendada, por debajo de 220 caracteres
- [ ] Titular cambiado de "Backend Developer" a **Backend Engineer** (hoy tu titular todavía dice Developer)
- [ ] Titular con "Java", "Spring Boot", "AWS" y modalidad visibles
- [ ] About en EN pegado, ≤ 2.600 caracteres
- [ ] About en ES pegado (si el perfil es bilingüe), ≤ 2.600 caracteres
- [ ] Las 3 primeras líneas funcionan como gancho sin desplegar "ver más"
- [ ] Las 4 certificaciones aparecen como objetivo, no como obtenidas
- [ ] Email, GitHub e ixmak.com en la última línea del About (sin teléfono)

**Destacados**

- [ ] 1.º bmv-audit, con CLS 0.689 → 0 y TBT 940 ms → 0 ms en el título
- [ ] 2.º Aggora, "built twice (Spring Boot + Quarkus)" en el título
- [ ] 3.º kapital-clone, con −60% peticiones, −62% bytes y −98% JS en el título
- [ ] 4.º ixmak.com como hub final
- [ ] Los 4 enlaces abren sin pedir permiso (verificado en ventana de incógnito)

**Experiencia**

- [ ] Tekchoice: 3 bullets métrica primero, con 6+ Lambdas, Fiserv–DNA, CloudFormation y CloudWatch
- [ ] DXC: **"Contributed to / Contribuí a la modernización"**, sin "Led" ni "Lideré"
- [ ] DXC: bullets con Grupo Bimbo (NYSE: BIMBO), refactor de DTOs y JUnit
- [ ] Folio3: bullets con equipo de 5+, CI/CD y plataforma regulada por la FDA
- [ ] Puestos, empresas y fechas idénticos a los datos reales
- [ ] Ubicación y tipo de empleo definidos (Jornada completa)

**Aptitudes, certificaciones, educación e idiomas**

- [ ] 3 aptitudes fijadas: Java, Spring Boot, Amazon Web Services (AWS)
- [ ] Lista de aptitudes completa (hasta 50) con el orden de la sección 7
- [ ] Azure, Bash, Git, Jira, Postman y Laravel incluidos (coinciden con el CV)
- [ ] Certificaciones: **vacía** hasta aprobar la primera (sin credenciales inventadas)
- [ ] Educación: Universidad de Guadalajara, B.S. en Ingeniería en Sistemas Computacionales, 2018–2023
- [ ] Idiomas: Español nativo, Inglés competencia profesional (B2), Francés competencia profesional limitada (B1)

**Recomendaciones y actividad**

- [ ] 2 personas contactadas con el mensaje de la sección 11
- [ ] Al menos 1 recomendación visible en el perfil
- [ ] Borrador enviado junto con la petición (para que solo tengan que editar)
- [ ] 1 recomendación escrita por ti a un excompañero (reciprocidad)
- [ ] 2 publicaciones programadas de las 6 ideas de la sección 12
- [ ] 15–20 minutos diarios de comentarios con criterio
- [ ] Ninguna herramienta de automatización, bots ni scraping conectada a la cuenta

**URL, visibilidad y preferencias**

- [ ] URL personalizada confirmada: `linkedin.com/in/noe-ixmak-quezada`
- [ ] Perfil público activado y visible sin iniciar sesión
- [ ] Sitios web en Información de contacto: ixmak.com y github.com/GodNoden
- [ ] Enlace de LinkedIn corregido en los 3 CVs, el portfolio y la firma de email
- [ ] **CV en francés corregido**: `noe-ixmal-quezada` → `noe-ixmak-quezada`
- [ ] Cargos unificados en CV, portfolio y LinkedIn: **Backend Engineer** (TekChoice), **Backend Engineer Jr.** (DXC) y **Software Developer Jr.** (Folio3). En LinkedIn falta cambiar Folio3, que hoy dice "Software Engineer Jr."
- [ ] "Led the modernization" cambiado a "Contributed to the modernization" en el portfolio
- [ ] BMV, Kapital y Aggora agregados a los 3 CVs con las métricas de la sección 5
- [ ] Open to work configurado: Backend Engineer + 4 puestos, remoto, Guadalajara, solo reclutadores
- [ ] Recordatorio a 3 meses para revisar que "Open to work" siga activo
