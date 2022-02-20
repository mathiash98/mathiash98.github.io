---
title: "Hvordan lage ditt eget turkart"
date: 2022-02-14T21:58:00+01:00
description: "En liten guide til hvordan designe ditt eget kart i Mapbox Studio med OpenStreetMap data"
tags: ["kart", "norsk"]
categories: ["design", "maps"]
author: "Mathias Haugsbø"
showToc: false
draft: true
---

{{< rawhtml >}}

<iframe width='100%' height='400px' src="https://api.mapbox.com/styles/v1/mathiash98/ckz5xaxx8001w14qig119f4jr.html?title=false&access_token=pk.eyJ1IjoibWF0aGlhc2g5OCIsImEiOiJjazh1cW4zeXIwOGplM2ZwaHBvMDlsNjBkIn0.CRNICu-ha9HWO4-G1DNuiw&zoomwheel=false#10.89/60.4183/7.2841" title="Skikart" style="border:none;"></iframe>

{{< /rawhtml >}}

- [Mapbox studio style link om du vil kopiere min stil](https://api.mapbox.com/styles/v1/mathiash98/ckz5xaxx8001w14qig119f4jr.html?title=copy&access_token=pk.eyJ1IjoibWF0aGlhc2g5OCIsImEiOiJjazh1cW4zeXIwOGplM2ZwaHBvMDlsNjBkIn0.CRNICu-ha9HWO4-G1DNuiw&zoomwheel=true&fresh=true#10.89/60.4183/7.2841)

Det var nylig morsdag og mine foreldre har nylig kjøpt ny hytte på fjellet, hva er vel bedre å gi enn et kart?
Jeg har tenkt lenge på å lage et kart basert på OSM data da jeg er over middels interessert i OSM, og nå fikk jeg endelig muligheten.

### Mine krav for kartet:

- Høydekurver
- Skiløyper i blått (slik som ut.no)
- Sommerstier i rødt (slik som ut.no)
- Navn og høyde på fjelltopper
- Navn på steder
- Pent nok å se på til at man vil printe et 70x50 cm bilde og henge på veggen
- Brukbart til å lese på, skrift kan ikke være for liten

## Guide:

### Finne inspirasjon:

Her så jeg på de aller fleste karttjeneste jeg kunne finne om det var noen som allerede hadde det jeg ville, men det fant jeg ikke.

- [Ut.no](https://ut.no/kart#11.8/60.41919/7.29482) -> God data, men ingen av karttype en spesielt dekorative til å henge stort på veggen.
- [Mapy.cz - winter](https://en.mapy.cz/zimni?x=7.2867145&y=60.4185746&z=14&l=0) -> Nesten perfekt kart for meg, men jeg skulle gjerne hatt større skrift og tydeligere sommerruter. Men ellers er det dekorativt og inneholder det man må ønske for vinter
- [dapamaps.com](https://dapamaps.com/products/skikart-bergsjo?variant=42346659807485) -> Veldig fine dekorative kart som har det jeg vil ha, men skrift er for liten og dekker for stort område til at det blir særlig nyttig utenom for dekorasjon. Jeg tok mye inspirasjon fra dem når jeg designet mitt kart.
  - Hadde de hatt mulighet for å zoome og velge område selv hadde jeg nok endt opp med å kjøpe fra dem.
- [opensnowmap.org](https://www.opensnowmap.org/#map=14/7.298/60.413&b=snowmap) -> Innholdsrikt kart med infoen jeg vil vise, men litt mindre dekorativt enn mapy.cz og skrift er fortsatt ganske liten.

### Lage nyt stil i Mapbox studio:

Jeg valgte å bruke Mapbox studio til å designe kartet fordi jeg har brukt det før og de har et veldig bra redigeringsverktøy hvor du kan redigere stil på egentlig absolutt alt. For spesielt interesserte så er dette mulig fordi Mapbox bruker vektorer istedenfor bilder til å tegne kart på skjermen din. Da lastes hvert element (hver bygning og vei) ned fra serveren og blir deretter rendret til skjermen din basert på stilark. Normalt lastest det ned mange små bilder som så blir satt sammen til et stort bilde, men da må bildet lages på server og stilen kan ikke endres med et tastetrykk.

- Et annet alternativ til Mapbox er [Maptiler](maptiler.com) der kan alt det samme designes, men grensesnittet er ikke like pent som hos Mapbox.

1. Lag den en konto hos [Mapbox](https://studio.mapbox.com/)
2. Lag en ny style ved å klikke `New style` i [studio.mapbox.com](https://studio.mapbox.com/)
3. Velg gjerne Outdoors som template, men kan være lettere å begynne med blank om du skal ha et simplistisk kart og klikk `Customize` for å fortsette.
4. Nå er du i studio editoren hvor magien skjer.

- Legg til komponentene:
  - Terain
    - Her slår du på høydekurver ved å slå på `Contours`
  - Road Network
  - Land, water & sky
  - Natural features
- Flytt kartet til dit du ønsker å lage kart

5. Nå har vi et blankt svart kart som vi kan starte med å modifisere. Dette gjøres ved å gå til `Layers`. Nå kan du trykke hvor som helst på kartet og få opp hvilke datakilder som er plasssert der du trykker.
   ![Skjermdump av mapbox studio hvor jeg har valgt en feature i kartet og endrer fargen](/turkart/Edit-layer-color.png)
   - Gjør dette for vann, høydekurver og land til kartet ser mer ut som noe du liker.

### Samle data:

Nå har du et greit grunnkart vi kan bygge videre på og skape litt interessant liv på toppen. Jeg fant fort ut at standard data som tilbys fra Mapbox serveren er for begrenset for meg og de viser for eksempel ikke stier i fjell før man har zoom nivå 13 eller mer. Så da måtte jeg hente ut og laste opp data selv.

Dataene henter jeg fra [Open Street Map](https://www.openstreetmap.org/about) en åpen kartdatabase over hele verden laget av frivillige. Jeg er personlig stor bidragsyter i [OSM Norge miljøet](https://wiki.openstreetmap.org/wiki/Norway) og får nå endelig høste frukter av mitt arbeid.

For å hente ut data fra OSM bruker jeg [Overpass Turbo](https://overpass-turbo.eu/), en tjeneste for å spørre etter data i OSM databasen. Når man får dreisen på det er det rimelig greit å bruke, men læringskurven kan være litt bratt.

Her spurte jeg etter alle fjelltopper i Eidfjord med følgende query:

```
/*
This shows all mountains (peaks) in Eidfjord kommune.
*/
[out:json];
rel["name"="Eidfjord"];
// turn the relation into an area
map_to_area;
// get all peaks in the area
node
  [natural=peak]
  (area);
out body qt;
```

Og så hentet jeg alle hills ved å bytte ut `natural=peak` med `natural=hill`.

Deretter hentet jeg alle skiløyper ved å spørre etter tagen `piste:type=*`