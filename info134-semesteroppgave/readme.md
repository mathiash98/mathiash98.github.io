# INFO134 Semesteroppgave

For å vise nettsiden åpne `index.html`

## Filer:
* `index.html`
    - Laster inn alle javascript filer og stilark. Setter opp html strukturen.
* `script/main.js`
    - Inneholder all logikken.
    
    Alt skjer via endring i `window.location.hash` så om nettadressen endres vil `paginate()` kjøres. Den viser riktig element utifra nettadressen.
    
    Eksempel 1:
    >Trykker du på en lenke i navbaren endres nettadressen til f.eks. `/#oversikt`. Når dette skjer vil en eventListener på hashchange kjøre `paginate()` som finner div med riktig id, viser den og skjuler de andre.

    Eksempel 2:
    >Skriver du inn Bergen i søkefeltet under detaljer, så endres url til `/#detaljer/bergen`. Da kjøres `paginate()` som viser detaljer-elementet og kjører `searchAndPopulateDetails("bergen")` som viser informasjon om bergen. Tilsvarende skjer når det sammenlignes mellom kommuner.
* `script/dataset/Dataset.js`
    - Class som definerer metoder som er lik for alle dataset.
* `script/dataset/Befolkning.js`
    - Class som utvider `Dataset` inneholder metoder som er spesifik for befolkningsdataset.
* `script/dataset/Utdanning.js`
    - Class som utvider `Dataset` inneholder metoder som er spesifik for utdanningsdataset.
* `script/dataset/Sysselsatte.js`
    - Class som utvider `Dataset` inneholder metoder som er spesifik for sysselsattedataset.
* `style/style.css`
    - Stilark for `index.html` bygget opp med flex.

___

## Spørsmål:

### 1) - Synkron eller asynkron nedlasting av dataset
Datasettene lastes ned parallelt. Det skjer fordi javascript er et asynkront språk som kjører hver linje nedover rett etter hverandre uten å vente på at første linje skal bli ferdig. Se neste oppgave for hvordan jeg løser det.


### 2) - Hvordan vet programmet når alle 3 dataset er klare
Når jeg initierer datasettene, legges det ved en callback funksjon som kjøres når klassen har lastet ned datasettet fra urlen. Når alle 3 lastes ned samtidig vet vi ikke hvilken som fullføres sist. Derfor har jeg to variabler: `numDatasets` og `datasetsDone` som forteller hvor mange dataset som skal lastes ned og hvor mange som er ferdig. Så hver gang en av datasettene er ferdig lastet økes `datasetsDone` med 1 og sjekker om alle er ferdig. Er de ferdig settes `dataset_ready` til true og `paginate()` kjøres.
```javascript
/**
 * Loads the datasets in parallel and runs paginate() when all datasets has loaded.
 */
function loadDatasetsParallel() {
    let numDatasets = 3;
    let datasetsDone = 0;
    sysselsatte = new Sysselsatte("http://wildboy.uib.no/~tpe056/folk/100145.json", function () {
        datasetsDone++;
        if (numDatasets == datasetsDone) {
            datasets_ready = true;
            paginate();
        }
    });
    utdanning = new Utdanning("http://wildboy.uib.no/~tpe056/folk/85432.json", function () {
        datasetsDone++;
        if (numDatasets == datasetsDone) {
            datasets_ready = true;
            paginate();
        }
    });
    befolkning = new Befolkning("http://wildboy.uib.no/~tpe056/folk/104857.json", function () {
        datasetsDone++;
        if (numDatasets == datasetsDone) {
            datasets_ready = true;
            paginate();
        }
        populateOversiktTable();
    });
}
```


### 3) - Stilendring på brede og smale skjermer
For å få tabellene til å vises horisontalt på brede skjermer og vertikalt på smale skjermer har jeg tatt i bruk @media egenskapen i css.
Der valgte jeg 900px som grense og lagde to sett med regler, en for under 900px og en for over 900px.

Kort sagt brukte jeg flex-direction til å bestemme om tabellene skulle være på rekke eller nedefor hverandre som i en kolonne.
```css
@media only screen and (max-width: 899px) {
    .tablesContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
}

@media only screen and (min-width: 900px) {
    .tablesContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .table {
        display: flex;
        flex-direction: row;
    }
    
    .table thead tr {
        display: flex;
        flex-direction: column;
    }
    .table tbody {
        display: flex;
        flex-direction: row;
    }
    .table tbody tr {
        display: flex;
        flex-direction: column;
    }
}
```

### 4) - Datasett inneholder samme kommuner?
Nei datasettene inneholder ikke likt antall kommuner. Utdanning inneholder 54 kommuner som har fått nytt kommunenummer og har dermed endingen `(-2017)` Eksempel: `"Holmestrand (-2017)"`. Utdanning mangler og `"Rindal"` kommune, men som utdanning og sysselsatte inneholder alle tre har kommunen `"Rindal (-2018)"` som viser data før 2019 Dette er fordi de fikk nytt kommunenummer.


Tok først å sammenlignet lengden på de forskjellige `dataset.getNames()` og så at det var forskjell.
Lagde deretter et program som fant union av de forskjellige listene og fant at de inneholder 422 like navn i alle tre. Denne funksjonen ga og ut hvilke som var unike eller som manglet i den andre listen.