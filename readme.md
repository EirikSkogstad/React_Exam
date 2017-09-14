#Innlevering 01: "Hello world"
For innlevering 01 har jeg valgt å lage en applikasjon som lister ulike filmer. Bruker skal ha muligheten til å legge til filmer, se ulike filmer som har blitt lagt til, filtrere filmer som er lagt til og kunne endre ulike filmer og til å endre.
Grunnen til at jeg la til disse funksjonalitene var mest for å bli komfortable med bruk av ulike "HTTP verb" i JSON api'et.

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

- Samme språk. Samme utvikler kan jobbe med både back og frontend. 

##### Ulemper 
- Samme utvikler på begge sider, ikke nødvendigvis like god i backend som frontend. 
- Node er ikke alltid like kjapt. 



### Hva er et (web-)API, og hva er noen fordeler og ulemper ved å lage et? Når bør man ikke lage et API?
Et web-API er et API som utviklere kan bruke til å få tak i eller sende data til "backend delen" av 
en applikasjon(Som vanligvis lagres i en database).

API- lar en utvikler enkelt bruke funksjonaliteten til en applikasjon/tjeneste. Eksempler kan være alt fra Google Maps, sende spørringer om vær i ulike lokasjoner.
