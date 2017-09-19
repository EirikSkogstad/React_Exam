# Innlevering 01: "Hello world"
For innlevering 01 valgte jeg å lage en applikasjon som lister ulike filmer. Brukeren skulle ha muligheten til å..
- legge til filmer. 
- se ulike filmer som har blitt lagt til. 
- filtrere filmer som er lagt til
- kunne endre filmer som allerede er lagt til.
Grunnen til at jeg ville ha funksjonalitet for dette, var mest at jeg ville bli komfortabel med bruk av ulike "HTTP-verb" i Express.

### Oppsett:
- Prosjektet er del i to mapper: "frontend" og "backend". Grunnen er at dette vil gjøre det lettere å enkelt å separere de to "prosjektene". 
- Dette kunne og også vært løst med to ulike Git repositories, men når jeg kun er en utvikler og prosjektet er såpass lite, så ville det bare gjort ting vanskeligere.) 
- Fordelen med å gjøre dette er at det hindrer frontend og backend deler konfigurasjon og dependencies.
- Dette gjør det også enklere å splitte prosjektet senere, eller laste opp på ulike servere.


### Fordeler og ulemper med en stack bygget kun av Javascript:

##### Fordeler:
- En stor fordel med "fullstack" Javascript er mengden biblioteker som ligger lett tilgjengelig. 
 Veldig mange problemer er allerede løst, og ligger tilgjengelig i små pakker NPM(Node Package Manager) repositoriet. 
- I tilegg til biblioteker, så finnes det mange nyttige verktøy til utvikling av Javascript. 
  Kodekvalitets-verktøy som ESLint, JSlint, Prettier gjør det lettere å oppdage bugs og holde koden formatert på en konsekvent
  måte.

- Samme språk gjør at en kan bruke samme utvikler på både server- og client-siden. 
- I tillegg så kan dette brukes sammen med biblioteker 
    som React-Native, slik at en kan gjenbruke nesten all koden til lage IOS og Android apper.

##### Ulemper 
- Samme utvikler på begge sider, ikke nødvendigvis like god i backend som frontend. 
- Node er ikke alltid like kjapt. 



### Hva er et (web-)API, og hva er noen fordeler og ulemper ved å lage et? Når bør man ikke lage et API?
Et web-API er et API som utviklere kan bruke til å få tak i eller sende data til "backend delen" av 
en applikasjon(Som vanligvis lagres i en database).

API- lar en utvikler enkelt bruke funksjonaliteten til en applikasjon/tjeneste. Eksempler kan være alt fra Google Maps,
sende spørringer om vær i ulike lokasjoner.

##### Fordeler:
- Data kan være lett tilgjengelig for folk som har nytte av det. Værdata er et typisk eksempel på dette, hvor mange ulike tjenester
kan ha nytte av dataen. Alt fra konserter, kollektivtransport og parker er tjenester hvor bruker kan ha stor nytte av å vite været.


##### Ulemper:
- Bør ikke lage hvis et API hvis man er avhengig av at folk bruker tjenesten din, istedenfor å lage en konkurerende tjeneste som
tilbyr samme data. Et eksempel er Instagram, hvor det finnes mange tjenester som tilbyr samme data. 
- Generelt så kan et API være en god ide hvis du produserer dataen, men ikke er like avhengig av å bruke den selv i din egen tjeneste.
 Værtjenester slik som Yr.no er et godt eksempel på dette.