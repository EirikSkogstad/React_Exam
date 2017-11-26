# Innlevering 01: "Hello world"
For innlevering 01 valgte jeg å lage en applikasjon som lister ulike filmer. Brukeren skulle ha muligheten til å.. <br/>
- legge til filmer. <br/>
- se ulike filmer som har blitt lagt til. <br/>
- filtrere filmer som er lagt til<br/>
Grunnen til at jeg ville ha funksjonalitet for dette, var mest at jeg ville bli komfortabel med bruk av ulike "HTTP-verb" i Express.

### Skjermbilde av applikasjonen:
![alt screenshot](https://bytebucket.org/eSkogstad/web_api_innlevering01/raw/a46dc2626ab89c671469dedc8aa9fe6b11c09da0/screenshot.jpg?token=4e332c811989938ddd6af89778c13988a8345c3e)
![alt app-screenshot](https://bytebucket.org/eSkogstad/web_api_innlevering01/raw/14f43ef17020985d619c26468abd7d5028ed261f/app-screenshot.png?token=c0af0b38fb03316ef8001e9e638e065b286fb00e)

### Hvordan starte applikasjonen:
- Pass på at mongodb kjører og at node er install. I tilegg trengs enten npm eller yarn.
- Åpne to terminal vinduer og naviger til både _backend og _frontend mappene.
- Kjør så <code>yarn install</code> eller <code>npm install</code>, i begge mappene.
- Deretter kjør <code>yarn start</code> eller <code>npm start</code>, i begge mappene.

#### Starte applikasjonen med Docker:
Docker er satt opp til å fungere med REST api'et og bruker ekstern database. Frontend/React modulen er ikke satt opp 
med Docker, og må dermed startes manuelt.

Jeg anbefaler å starte applikasjonen med Docker-Compose. <br/>
- Naviger til roten av prosjektet. (Samme mappe hvor Docker-compose.yml ligger)<br/>
- `docker-compose build`<br/>
- `docker-compose up` .<br/>

Det er også mulig å starte applikasjonen uten Docker-compose, men dette krever litt mer arbeid.
- Naviger først til _frontend<br/>
- `docker build -t ze9ix/movies-backend .`<br/>
- `docker run -p 1234:1234 -e DOCKER_DB=mongodb://movieuser:movieuser@ds261745.mlab.com:61745/a_simple_movie_database ze9ix/movies-backend`<br/>

#### Native app:
Applikajsonen er kun testet med Android, og jeg kan dermed ikke garantere at den vil fungere 100% på IOS.<br/>
- Pass på Android emulator er installert og at stegene i <br/>
[React-Native](https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html) guiden er fulgt.<br/>
- Start opp Android emulatoren.<br/>
- Naviger til NativeMovieApp mappen.<br/>
- Kjør så yarn start<code>react-native run-android</code><br/>
- Deretter kjør <code>yarn start</code> eller <code>npm start</code> in en annen terminal.<br/>


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

Ganske sent i prosjektet prøvde jeg å integrere ESLint i arbeidsflyten. Dette var først litt problematisk, ettersom ESLint
preset'en jeg valgte(Airbnb), hadde litt andre meninger enn Prettier, om hvordan koden skulle formateres.
Dette gjorde at jeg valgte facebook sin preset isteden ([fbjs](https://www.npmjs.com/package/eslint-config-fbjs)).
Denne passet Prettier sin kodestil mye bedre, og krevde ingen konfigurasjon i <code>.eslintrc.json</code> .

Siden jeg hadde fått inn vanen med å bruke prettier fra kommandolinjen, ville jeg prøvde å gjøre det samme med ESLint.
Dette løste jeg ved å bruke et verktøy som het: [prettier-eslint-cli](https://www.npmjs.com/package/prettier-eslint-cli).
Denne gjorde det enklere å kjøre ESLint for fiksing av "kodefeil", og deretter kjøre Prettier for formatering.
I <code>package.json</code> puttet jeg script for dette(<code>format</code>), som jeg kjørte hver gang jeg var "ferdig" med å kode.


#### URL og HTTP verb:
De fleste HTTP verbene fungerer på URL'en "serverpath"/movies og returnerer JSON som data. 
Unntaket her er URL'ene som returnerer feilkoder:  <br/>
Flere av URL'ene har blitt oppdatert til å støtte et system med brukere og innlogged, og 
krever dermed nå at et JSON web token sendes med i forespørsler. 

GET forespørsler på /movies returnerer alle filmene. Her vurderte jeg å ha muligheten til å sende
GET forespørsel mot /movies/:id, men valgte å ikke implementere dette, siden applikasjonen foreløpig 
ikke har bruk for dette.

POST forespørsler for å lage nye filmer, går mot /movies. Her er dataen sent i HTTP forespørslens "body". <br/>
DELETE er den eneste forspørserlen hvor id må spesifiseres. Dette gjøres ved å sende forespørsel til /movies/:id
slik at node serveren / API'et vet hvilken film som skal slettes.


POST /users brukes når nye brukere skal opprettes. Her er det lite hensiktsmessig at klient sender med id, ettersom<br/>
dette er API'et/Databasens ansvar.<br/>
POST /authenticate brukes til innlogging. Denne URL'en returnerer et JSON web token hvis alt av kriterier matcher.
f.eks eksisterer brukernavn, er passord riktig osv.

#### Oppsett av listen
Angående listen i applikasjonen, så valgte jeg å endre litt på hvordan den var bygget opp og ser ut.
En vanlig <code>ul</code> tag med <code>li</code> hadde kanskje vært teknisk- og brukervennlig-bedre, 
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

En fordel med et å produsere et JSON/Web-API vil være at dataen kan brukes i mange ulike klienter. Hvis dataen overføres som JSON så
vil en mobilapp kunne bruke dataen uten problemer. Hadde dette vært sendt ut som f.eks HTML, så ville det krevd mye mer arbeid for en mobilappliksjon å bruke dataen.

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
 
 
### Hva er noen fordeler og ulemper ved å sende et token (som JSON Web Token) via en HTTP-header (som Authorization) kontra å bruke en Cookie?
 - JSON webtokens gjør at man ikke trenger å holde state i form av Cookies på serveren/API'et. Minst mulig state er en god ting
 i, ettersom det gjør generelt API/serveren mer skalerbart. Mangel på state gjør det også lettere å hvis en server eller API 
 f.eks må startes på nytt.
 
### Hva er hensikten med REpresentational State Transfer (REST)? Hva er noen fordeler og ulemper med å implementere nivå 2 og 3 av REST i Richardson Maturity Model? 
- Hensikten med REST er å ha en måte å overføre data over nett på en måte som ikke er avhengig av state, eller et
spesifikt programmeringspråk. REST fungerer på ulike "nivåer". 

Fordelen med nivå 2 er at mindre forvirrende URL strukturer, sammenligned med nivå 1. Dette er fordi nivå 2 skiller 
ut "handlinger"(CRUD) fra URL'en, og implementerer dette med HTTP verb isteden. Dermed slipper man f.eks
/users/:id/delete og kan heller implementere deete med DELETE forespørsel mot /user/:id

En fordel med nivå 3 er ovenfor nivå 2 har med "kobling" å gjøre. Nivå 3 senker kobling ved å sende med linker til ulike 
ressurer sammen med dataen man får fra spørringer. Dette gjør at færre URL'er trenger å hardkodes hos klienten. 
Dette gjør at client applikasjoner mindre sårbare til endringer i API'et.

Nedsidene med nivå 3 har mest med tid og kompleksitet å gjøre. Ofte så vil det være kjappere for både klient applikasjoner 
og API'et å gå for nivå 2, enn å sette inn ekstra tid på å håndtere "lenkesystemet" som nivå 3 krever.

### Hva er hensikten med å automatisere testing av en fullstack webapplikasjon? Hvis du måtte velge mellom å skrive unit-tester, integrasjonstester, og end-to-end-tester, hvilken type test ville du valgt å skrive for prosjektet? Hvorfor?

#### Hensikten
- Hensikten med å automatisere testing er å spare tid og få testing som er mer pålitelig. Hvis en manuelt tester en applikasjon så er det fort gjort å ikke være like grundig hver gang. I tillegg blir det fort kjedelig. Dette gjør at etterhvert så lar en være  å teste like ofte. 

- En konsekvens av å ikke teste like ofte er at man ikke kan gjøre like hyppige endringer og samtidig være sikker på at en ikke introduserer bugs. 
I tilleggg så vil automatisering av tester spare mer og mer tid jo større applikasjonen blir. Når en applikasjon blir stor nok, så vil det til slutt uansett være umulig å teste alt manuelt. Med  andre ord så sparer en både tid og gjør applikasjonen mer fri for feil. 


#### Hvilken test ville jeg valgt:
- Hvis jeg kun skulle skrevet et type test så ville det vært unit-tester. Fordelen med unit tester er man teste veldig små deler av systemet, som ulike funksjoner. Dette gjør at det er veldig lett å se hvor noe går feil, hvis en har mange nok tester.
Ulempen med unit-tester vil da være at det er veldig tidskrevende å skrive tester for å dekke hele systemet.  En annen nedside er at unit-tester kun tester funksjonalitet i isolasjon, ikke hvordan de fungerer/integreres med hverandre.

- End to end- og integrasjons-tester  er fine for å teste hele applikasjonen i et miljø som er så likt som mulig som produksjonsmijøet. Fordelen med dette er at det tester at de ulike funksjonalitetene i applikasjonen fungerer med hverandre.
Nedsiden med denne typen tester er at de er mye mindre spesifikke på hvor feilen ligger. 

Ettersom som ulike typer tester utfyller hverandre, så vil man ideelt sett ha mest unit tester, færre integrasjons tester og minst end to end tester.

#### Hva er fordeler og ulemper ved å bruke WebSockets? Når bør man ikke bruke dem?

##### Fordeler:
Fordelen med Websockets er at det lar serveren "kommunisere" med klienter. Dette gjør at serveren kan "pushe" ny informasjon direkte til klienten, istedenfor at klienten må konstant sjekke etter ny informasjon.

Websockets er perfekt til applikasjoner hvor klienter ofte trenger ny informasjon fra serveren, på ujevne intervaller. Et godt eksempel for dette er en chat applikasjon. 

En fordel med websockets er at klienten får ny informasjon så fort som mulig, uten at det båndbredde må sløses ved å konstant spørre etter ny informasjon

##### Nedsider:
En nedside med websockets er at det introduserer state på serveren. Serveren må holde oversikt over alle klienter og må 
håndtere ny informasjon ofte. Dette vil gjøre at serveren får mer å gjøre. 

Et annet negativt aspekt ved state i serveren, er at det gjør raskt mer komplisert. State gjør det vanskeligere å håndtere tilfeller hvor en server må byttes ut eller programmet må byttes ut.  
I tillegg kan det gjøre ting som lastbalansering mer komplisert.

Generelt sett så vil det være lurt å unngå Websockets med mindre du har et spesfikt behov for kontinuerlig kommunikasjon mellom klient og server.

