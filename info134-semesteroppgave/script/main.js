/**
 * Main file for javascript.
 * Imports several APIs for the different datasets.
 * Show and hides the different containers
 * Handle form submits and displays data
 * 
 * Flow:
 * User clicks link or submit a form
 * -> window.location.hash changes
 * --> paginate() is run
 * ---> paginate() parses window.location.hash "#page/:id/:id"
 * ----> showPage(page) shows the appropiate element and hides the others
 * ----> run appropiate searchAndPopulate(id) if hash has id parameter
 * @author Mathias Haugsbø
 */


let main = document.getElementById('main');

let searchInput = document.getElementById('searchInput');
let searchResult = document.getElementById('searchResult');
let searchForm = document.getElementById('searchForm');
let detaljerKommuneData = document.getElementById('detaljerKommuneData');
let sammenligningSearchForm = document.getElementById('sammenligningSearchForm');
let compareContainer = document.getElementById('compareContainer');

let datasets_ready = false;

// Datasets
let sysselsatte;
let utdanning;
let befolkning;

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

loadDatasetsParallel();

// ============ Pagination stuff ===================
window.addEventListener('hashchange', function (e) {
    paginate();
});


/**
 * Based on url ending, show appropiate div under main element.
 */
function paginate() {
    console.log('Paginate start');
    if (datasets_ready) {
        console.log('Datasets loaded');
        let page = window.location.hash.slice(1).split('/');
        
        if (page.length > 1) {
            if (page[0] == 'detaljer') {
                searchAndPopulateDetails(page[1]);
            } else if (page[0] == 'sammenligning' && page.length == 3) {
                searchAndPopulateCompare(page[1], page[2]);
            }
        }
    
        showPage(page[0]);
    }
}

/**
 * Makes selected div visible, and the others hidden.
 * @param {String} page Id of div you wan't to show.
 */
function showPage(page) {
    if (page) {
        main.childNodes.forEach(element => {
            if (element.id != undefined) {
                if (element.id == page) {
                    //element.hidden = false; // <- Denne koden vil løse alle overflow og css problem mye lettere...
                    element.classList.add('visible');
                    element.classList.add('mainContainer');
                    element.classList.remove('hidden');
                } else {
                    //element.hidden = true; // <- Denne koden vil løse alle overflow og css problem mye lettere...
                    element.classList.add('hidden');
                    element.classList.remove('visible');
                    element.classList.remove('mainContainer');
                }
            }
        });
        // Scroll to top
        window.scrollTo(0, 0);
    }
}


// ======================== Oversikt ================================
/**
 * Populate table with data over all kommuner.
 */
function populateOversiktTable() {
    let oversiktTableBody = document.getElementById("oversiktTableBody");
    let kommuneNames = befolkning.getNames();
    for (let i = 0; i < kommuneNames.length; i++) {
        let kommuneNavn = kommuneNames[i];
        let kommune = befolkning.getInfo(kommuneNavn);
        let tmpRow = document.createElement('tr');
        tmpRow.dataset.id = kommune.kommunenummer;
        tmpRow.insertCell().innerText = kommuneNavn;
        tmpRow.insertCell().innerText = kommune.kommunenummer;
        tmpRow.insertCell().innerText = befolkning.getTotalPopulation(kommune) + " (" + befolkning.getLastCountYear(kommune) + ")";
        oversiktTableBody.appendChild(tmpRow);
    }
}

/**
 * When user clicks on a row in overview, it will redirect to details about that kommune
 */
document.getElementById("oversiktTableBody").addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.parentNode.dataset.id) {
        window.location.hash = '#detaljer/' + e.target.parentNode.dataset.id;
    }
});

// ======================== Detaljer ================================
var kommunePairs = null;
searchInput.addEventListener('input', function (e) {
    searchInputChange(searchInput.value);
});
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.hash = '#detaljer/' + this.search.value;
});

searchResult.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.value != undefined) {
        searchInput.value = e.target.dataset.kommunenummer;
        searchInputChange(e.target.dataset.kommunenummer);
        window.location.hash = '#detaljer/' + searchInput.value;
    }
});

/**
 * Searches for matching kommunes and populates searchResult.
 * @param {String} search
 */
function searchInputChange(search) {
    searchResult.hidden = false;
    searchResult.innerHTML = "";
    let resultPairs = searchForKommunePairs(search);
    for (let kommunenavn in resultPairs) {
        if (kommunenavn.toLowerCase().startsWith(search.toLowerCase()) || kommunePairs[kommunenavn].startsWith(search)) {
            let tmpEl = document.createElement('li');
            tmpEl.dataset.kommunenummer = String(kommunePairs[kommunenavn]);
            tmpEl.innerHTML = kommunenavn + " - " + kommunePairs[kommunenavn];
            searchResult.appendChild(tmpEl);
        }
    }
}

/**
 * Search for kommune in kommunePairs
 * @param {String} search String to search for, kommunenavn or kommunenummer.
 * @param {Number} [maxResults=10] Search result to return.
 * @return {Object} List of matching pairs {kommunenavn: kommunenummer}
 */
function searchForKommunePairs(search, maxResults = 10) {
    if (kommunePairs == null) {
        kommunePairs = befolkning.getKommunePairs();
    }
    let resultPairs = {};
    let results = 0;
    for (let kommunenavn in kommunePairs) {
        if (results < maxResults) {
            if (kommunenavn.toLowerCase().startsWith(search.toLowerCase()) || kommunePairs[kommunenavn].startsWith(search)) {
                resultPairs[kommunenavn] = kommunePairs[kommunenavn];
                results++;
            }
        } else {
            break;
        }
    }

    return resultPairs;
}

/**
 * Will search for kommune based on input and display all info.
 * @param {String} search String, kommunenavn or kommunenummer
 */
function searchAndPopulateDetails(search) {
    searchResult.hidden = true;
    let resultPairs = searchForKommunePairs(search, 1);
    let kommunenavn = Object.keys(resultPairs)[0];
    let kommunenummer = resultPairs[kommunenavn];
    let kommuneBefolkningData = befolkning.getInfo(kommunenummer);
    searchInput.value = kommunenummer;

    detaljerKommuneData.innerHTML = "";
    let totalPopulation = befolkning.getTotalPopulation(kommuneBefolkningData);
    let lastPopulationCountYear = befolkning.getLastCountYear(kommuneBefolkningData);

    let lastEmployementPercentage = sysselsatte.getLastEmployementPercentage(kommunenavn);
    let lastEmployementCountYear = sysselsatte.getLastCountYear(kommunenavn);

    let lastEducationNum = utdanning.getLastEducationNum(kommunenavn, ["03a", "04a"]);
    let lastEducationCountYear = utdanning.getLastCountYear(kommunenavn);

    // Find the data year range that all datasets includes
    let dataFromYear = 0;
    let dataToYear = Math.max;
    if (befolkning.getFirstCountYear(kommunenavn) > dataFromYear) {
        dataFromYear = befolkning.getFirstCountYear(kommunenavn);
    }
    if (befolkning.getLastCountYear(kommunenavn) < dataToYear) {
        dataToYear = befolkning.getLastCountYear(kommunenavn);
    }
    if (sysselsatte.getFirstCountYear(kommunenavn) > dataFromYear) {
        dataFromYear = sysselsatte.getFirstCountYear(kommunenavn);
    }
    if (sysselsatte.getLastCountYear(kommunenavn) < dataToYear) {
        dataToYear = sysselsatte.getLastCountYear(kommunenavn);
    }
    if (utdanning.getFirstCountYear(kommunenavn) > dataFromYear) {
        dataFromYear = utdanning.getFirstCountYear(kommunenavn);
    }
    if (utdanning.getLastCountYear(kommunenavn) < dataToYear) {
        dataToYear = utdanning.getLastCountYear(kommunenavn);
    }
    let populationData = befolkning.getData(kommunenavn, dataFromYear, dataToYear);
    let employementData = sysselsatte.getData(kommunenavn, dataFromYear, dataToYear);
    let educationData = utdanning.getData(kommunenavn, dataFromYear, dataToYear);
    let higherEducationData = utdanning.getEducationPercentageData(educationData, ["03a", "04a"]);

    let tmpHTML = `
        <h3>Navn: ${kommunenavn}</h3>
        <h3>Kommunenummer: ${kommunenummer}</h3>
        <h3>Befolkning: ${totalPopulation} (${lastPopulationCountYear})</h3>
        <h3>Sysselsatte: ${lastEmployementPercentage}% (${lastEmployementCountYear})</h3>
        <h3>Utdanning høyere nivå: ${lastEducationNum}, ${Math.round(lastEducationNum/totalPopulation*100)}% (${lastEducationCountYear})</h3>
        <div class="tablesContainer">
            <div class="container">
            <h3>Befolkning</h3>
            <table id="detaljerBefolkningTable" class="table">
                <thead>
                    <th>År</th>
                    <th>Kvinner</th>
                    <th>Menn</th>
                    <th>Begge kjønn</th>
                </thead>
                <tbody>
                    ${range(dataFromYear, dataToYear).map( (year, i) => `
                    <tr>
                    <td>${year}</td>
                    <td>${populationData["Kvinner"][year]}</td>
                    <td>${populationData["Menn"][year]}</td>
                    <td>${populationData["Kvinner"][year]+populationData["Menn"][year]}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
                
            <div class="container">
            <h3>Høyere utdanning</h3>
            <table id="detaljerUtdanningTable" class="table">
                <thead>
                    <th>År</th>
                    <th>Kvinner</th>
                    <th>Menn</th>
                    <th>Begge kjønn</th>
                </thead>
                <tbody>
                    ${range(dataFromYear, dataToYear).map( (year, i) => `
                    <tr>
                        <td>${year}</td>
                        <td>${higherEducationData[year]["Kvinner"]}%</td>
                        <td>${higherEducationData[year]["Menn"]}%</td>
                        <td>${Math.round(10*(higherEducationData[year]["Kvinner"]+higherEducationData[year]["Menn"])/2)/10}%</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            
            <div class="container">
            <h3>Sysselsatte</h3>
            <table id="detaljerSysselsatteTable" class="table">
                <thead>
                    <th>År</th>
                    <th>Kvinner</th>
                    <th>Menn</th>
                    <th>Begge kjønn</th>
                </thead>
                <tbody>
                    ${range(dataFromYear, dataToYear).map( (year, i) => `
                    <tr>
                        <td>${year}</td>
                        <td>${employementData["Kvinner"][year]}%</td>
                        <td>${employementData["Menn"][year]}%</td>
                        <td>${employementData["Begge kjønn"][year]}%</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        </div>
    `;

    detaljerKommuneData.innerHTML = tmpHTML;
}


sammenligningSearchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.hash = '#sammenligning/' + this.search1.value + '/' + this.search2.value;
});

/**
 * Will search for two kommune based on input and compare employement.
 * @param {String} search1 String, kommunenavn or kommunenummer
 * @param {String} search2 String, kommunenavn or kommunenummer
 */
function searchAndPopulateCompare(search1, search2) {
    let search1Results = searchForKommunePairs(search1, 1);
    let kommunenavn1 = Object.keys(search1Results)[0];
    let kommunenummer1 = search1Results[kommunenavn1];

    let search2Results = searchForKommunePairs(search2, 1);
    let kommunenavn2 = Object.keys(search2Results)[0];
    let kommunenummer2 = search2Results[kommunenavn2];

    // Check if kommune1 and kommune2 actually exists.
    if (typeof kommunenavn1 == "undefined" || typeof kommunenavn2 == "undefined") {
        if (typeof kommunenavn1 == "undefined") {
            compareContainer.innerHTML = `<span class="error">Fant ikke ${search1}!</span>`;
        } else {
            compareContainer.innerHTML = `<span class="error">Fant ikke ${search2}!</span>`;
        }
    } else {
        // Find the data year range that both datasets includes
        let dataFromYear = 0;
        let dataToYear = Math.max;
        if (sysselsatte.getFirstCountYear(kommunenavn1) > dataFromYear) {
            dataFromYear = sysselsatte.getFirstCountYear(kommunenavn1);
        }
        if (sysselsatte.getLastCountYear(kommunenavn1) < dataToYear) {
            dataToYear = sysselsatte.getLastCountYear(kommunenavn1);
        }
        if (sysselsatte.getFirstCountYear(kommunenavn2) > dataFromYear) {
            dataFromYear = sysselsatte.getFirstCountYear(kommunenavn2);
        }
        if (sysselsatte.getLastCountYear(kommunenavn2) < dataToYear) {
            dataToYear = sysselsatte.getLastCountYear(kommunenavn2);
        }

        // Get the data from each dataset within year-range
        let employementData1 = sysselsatte.getData(kommunenavn1, dataFromYear, dataToYear);
        let employementData2 = sysselsatte.getData(kommunenavn2, dataFromYear, dataToYear);

        // Build the HTML
        let tmpHTML = `
        <div class="compareContainer">
            <h3>Sysselsatte</h3>
            <p>De verdiene med størst økning fra året før sammenlignet med den andre kommunen er markert med grønn.</p>
            <div class="tablesContainer">
                <div class="container">
                    <h4>${kommunenavn1} - ${kommunenummer1}</h4>
                    <table id="compareTable1" class="table">
                        <thead>
                            <th>År</th>
                            <th>Kvinner</th>
                            <th>Menn</th>
                            <th>Begge kjønn</th>
                        </thead>
                        <tbody id="compareTableBody1">
                            ${range(dataFromYear, dataToYear).map( (year, i) => `
                            <tr>
                                <td>${year}</td>
                                <td class="${i != 0 && (employementData1["Kvinner"][year] - employementData1["Kvinner"][year-1]) > (employementData2["Kvinner"][year] - employementData2["Kvinner"][year-1]) ? 'larger' : 'smaller'}">${employementData1["Kvinner"][year]}%</td>
                                <td class="${i != 0 && (employementData1["Menn"][year] - employementData1["Menn"][year-1]) > (employementData2["Menn"][year] - employementData2["Menn"][year-1]) ? 'larger' : 'smaller'}">${employementData1["Menn"][year]}%</td>
                                <td class="${i != 0 && (employementData1["Begge kjønn"][year] - employementData1["Begge kjønn"][year-1]) > (employementData2["Begge kjønn"][year] - employementData2["Begge kjønn"][year-1]) ? 'larger' : 'smaller'}">${employementData1["Begge kjønn"][year]}%</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="container">
                    <h4>${kommunenavn2} - ${kommunenummer2}</h4>
                    <table id="compareTable2" class="table">
                        <thead>
                            <th>År</th>
                            <th>Kvinner</th>
                            <th>Menn</th>
                            <th>Begge kjønn</th>
                        </thead>
                        <tbody id="compareTableBody2">
                            ${range(dataFromYear, dataToYear).map( (year, i) => `
                            <tr>
                                <td>${year}</td>
                                <td class="${i != 0 && (employementData2["Kvinner"][year] - employementData2["Kvinner"][year-1]) > (employementData1["Kvinner"][year] - employementData1["Kvinner"][year-1]) ? 'larger' : 'smaller'}">${employementData2["Kvinner"][year]}%</td>
                                <td class="${i != 0 && (employementData2["Menn"][year] - employementData2["Menn"][year-1]) > (employementData1["Menn"][year] - employementData1["Menn"][year-1]) ? 'larger' : 'smaller'}">${employementData2["Menn"][year]}%</td>
                                <td class="${i != 0 && (employementData2["Begge kjønn"][year] - employementData2["Begge kjønn"][year-1]) > (employementData1["Begge kjønn"][year] - employementData1["Begge kjønn"][year-1]) ? 'larger' : 'smaller'}">${employementData2["Begge kjønn"][year]}%</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

        // Output the HTML to compareContainer
        compareContainer.innerHTML = tmpHTML;
    }

}

/**
 * Return an array with number from start to end inclusive.
 * @param {Number} from
 * @param {Number} to
 * @return {Array<Number>} Array with numbers.
 */
function range(from, to) {
    var out = [];
    for (var i = from; i <= to; i++) {
        out.push(i);
    }
    return out;
}