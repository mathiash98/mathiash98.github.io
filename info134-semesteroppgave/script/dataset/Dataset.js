/**
 * General API that is similar for all datasets 
 * @author Mathias Haugsbø
 */
class Dataset {
    /**
     * Instantiate the api for this dataset.
     * @param {String} url Url to JSON data.
     * @param {function} cb
     */
    constructor(url, cb){
        this.onload = cb || null;
        this.data = null;
        this.load(url);
    }

    /**
     * Get a object of all name-kommunenummer pairs.
     * @return {Object} List of all pairs {kommunenavn: kommunenummer}
     */
    getKommunePairs(){
        let pairs = new Object();
        for(var kommuneName in this.data.elementer) {
            pairs[kommuneName] = this.data.elementer[kommuneName]["kommunenummer"];
        }
        return pairs;
    }

    /**
     * Get names for all kommuner in dataset.
     * @return {Array} Array of all names.
     */
    getNames() {
        let kommuneNames = [];
        for(var kommuneName in this.data.elementer) {
            kommuneNames.push(kommuneName);
        }
        return kommuneNames;
    }

    /**
     * Get all kommuneIDs.
     * @return {Array} List of all kommuneIDs as string.
     */
    getIDs() {
        let kommuneIDs = [];
        for(var kommune in this.data.elementer){
            if (this.getInfo(kommune).hasOwnProperty("kommunenummer")) {
                kommuneIDs.push(this.getInfo(kommune)["kommunenummer"]);
            }
        }
        return kommuneIDs;
    }

    /**
     * Gives info about kommune with kommunenummer in this dataset.
     * @param {(Number | String)} kommune Kommunenummer or kommunenavn as String.
     * @return {Object} An object with info about this kommune.
     */
    getInfo(kommune){
        // Check if kommune is only digits -> is kommunenummer and not name
        if (/^\d+$/.test(kommune)) {
            for (var kommunenavn in this.data.elementer) {
                if (this.data.elementer[kommunenavn]["kommunenummer"] == kommune) {
                    return this.data.elementer[kommunenavn];
                }
            }
        } else {
            return this.data.elementer[kommune];
        }
    }
    
    /**
     * Gives name of kommune with kommunenummer in this dataset.
     * @param {String} kommune Kommunenummer as String.
     * @return {String} Name of kommune.
     */
    getName(kommunenummer){
        for (var kommunenavn in this.data.elementer) {
            if (this.data.elementer[kommunenavn]["kommunenummer"] == kommunenummer) {
                return this.data.elementer[kommunenavn];
            }
        }
        return undefined;
    }

    /**
     * Downloads data and insert it to this.data
     * @param {String} url Url to dataset, has to be JSON data.
     * @param {function} [cb]
     */
    load(url, cb){
        let self = this; // Need to do this because XHR takes over this
        let XHR = new XMLHttpRequest();
        XHR.open("GET", url);
        XHR.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                self.data = JSON.parse(this.response);
                self.ready = true;
                if (typeof self.onload == 'function') {
                    self.onload();
                }
            }
        };
        XHR.send(null);
    }
}