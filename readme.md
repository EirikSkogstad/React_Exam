# Innlevering 01: "Hello world"
For innlevering 01 valgte jeg å lage en applikasjon som lister ulike filmer. Brukeren skulle ha muligheten til å.. <br/>
- legge til filmer. <br/>
- se ulike filmer som har blitt lagt til. <br/>
- filtrere filmer som er lagt til<br/>
Grunnen til at jeg ville ha funksjonalitet for dette, var mest at jeg ville bli komfortabel med bruk av ulike "HTTP-verb" i Express.

### Skjermbilde av applikasjonen:
![alt screenshot](https://bytebucket.org/eSkogstad/web_api_innlevering01/raw/b3e2c32d7fa9b435c31b49e22053dc011d484a1d/screenshot.jpg?token=b1fdcc7341b18d176b9bd22c0cbe27a648732bba)

### Hvordan starte applikasjonen:
- Pass på at mongodb kjører og at node er install. I tilegg trengs enten npm eller yarn.
- Åpne to terminal vinduer og naviger til både _backend og _frontend mappene.
- Kjør så <code>yarn install</code> eller <code>npm install</code>, i begge mappene.
- Deretter kjør <code>yarn start</code> eller <code>npm start</code>, i begge mappene.

### Forklaring av ulike valg:
#### Oppsett:
Prosjektet er delt i to mapper: "frontend" og "backend". Grunnen til at jeg gjorde dette, var for å lettere kunne separere "backend"(Node) og "frontend"(React).
Dette kunne også vært løst med to ulike Git repositories, men når det var kun jeg som utviklet, så syntes jeg dette var unødvendig. 

Fordelen med å gjøre dette er at det hindrer at frontend og backend deler konfigurasjon og dependencies.

#### Verktøy:
Under utvikling prøvde jeg kodeformatterings-verktøyet [Prettier](https://github.com/prettier/prettier). 
Prettier har ganske sterke meninger om hvordan koden burde formateres, noe jeg syntes var en god ting. 
Ettersom jeg ikke hadde en eksisterende preferanse/style-guide, så syntes jeg Prettier fungerte godt som en mal å følge. 
Prettier fungerte fungerte utmerket til formattering, og programmer kjørte jeg enkelt og greit fra kommandolinjen. 

#### URL og HTTP verb:
De fleste HTTP verbene fungerer på URL'en "serverpath"/movies og returnerer JSON som data. <br>
GET forespørsler på /movies returnerer alle filmene. Her vurderte jeg å ha muligheten til å sende
GET forespørsel mot /movies/:id, men valgte å ikke implementere dette, siden applikasjonen foreløpig 
ikke har bruk for dette.

POST forespørsler går også mot /movies, og her er dataen naturligvis send i HTTP forespørslens "body". <br>
DELETE er den eneste forspørserlen hvor id må spesifiseres. Dette gjøres ved å sende forespørsel til /movies/:id
slik at node serveren / API'et vet hvilken film som skal slettes.

#### Oppsett av listen
Angående listen i applikasjonen, så valgte jeg å endre litt på hvordan den var bygget opp og ser ut.
En vanlig <code>ul</code> tag med <code>li</code> hadde kanskje vært teknisk og brukervennlig bedre, 
enn måten jeg bygde det på.
Grunnen til at jeg lagde listen med <code>div</code> elementer, var fordi jeg ønsket å 
få litt mer erfaring med Bootstrap, og samtidig å gjøre siden mer "responsiv".

#### Fordeler og ulemper med en stack bygget kun av Javascript:

##### Fordeler:
- En stor fordel med "fullstack" Javascript er mengden biblioteker som ligger lett tilgjengelig. 
 Veldig mange problemer er allerede løst, og ligger tilgjengelig i små pakker NPM(Node Package Manager) repositoriet. 
- I tilegg til biblioteker, så finnes det mange nyttige verktøy til utvikling av Javascript. 
  Kodekvalitets-verktøy som ESLint, JSlint, Prettier gjør det lettere å oppdage bugs og holde koden formatert på en konsekvent
  måte.

- Samme språk gjør at en kan bruke samme utvikler på både server- og client-siden. 
- I tillegg så kan dette brukes sammen med biblioteker som React-Native, 
slik at en kan gjenbruke nesten all koden til å lage IOS og Android apper.

##### Ulemper 
- Samme utvikler på både frontend og backend gjør at utvikleren ikke får spesialisert seg like mye, som han/hun 
kunne gjort ellers.
- Teknologien er relativt ny sammenlignet med eldre teknologier som f.eks JavaEE og Spring. Dette gjør at ikke alle problemer 
har like mange gode svar lett tilgjengelige på nettet.

### Hva er et (web-)API, og hva er noen fordeler og ulemper ved å lage et? Når bør man ikke lage et API?
Et web-API er et API som utviklere kan bruke til å få tak i eller sende data til "backend delen" av 
en applikasjon(Som vanligvis lagres i en database).

API- lar en utvikler enkelt bruke funksjonaliteten til en applikasjon/tjeneste. Eksempler kan være alt fra Google Maps,
sende spørringer om vær i ulike lokasjoner.

##### Fordeler:
- Data kan være lett tilgjengelig for folk som har nytte av det. Værdata er et typisk eksempel på dette, hvor mange ulike tjenester
kan dra nytte av dataen. Alt fra konserter, kollektivtransport og parker, er tjenester hvor en bruker kan ha stor nytte av å vite været.


##### Ulemper:
- Man bør ikke lage et API hvis man er avhengig av at folk bruker tjenesten din. Dette er en tilfeller hvor en konkurrent kan lage en ganske lik tjeneste, som
tilbyr samme data som du gjør. Et eksempel er Instagram, hvor det finnes mange tjenester som tilbyr akkurat samme data,
 fra en litt annerledes nettside(eller en app)
 
 Generelt så kan et API være en god ide hvis du produserer dataen, men ikke er like avhengig av å bruke den selv.
 Værtjenester slik som Yr.no er et godt eksempel på dette.