/**
 * Utdanning API
 * @author Mathias Haugsbø
 */
class Utdanning extends Dataset {

    /**
     * Get a dataset on the form {year: percentage} with combined percentage of
     * population which had one of educations.
     * 01: Grunnskolenivå
     * 02a: Videregående skole-nivå
     * 11: Fagskolenivå
     * 03a: Universitets- og høgskolenivå kort
     * 04a: Universitets- og høgskolenivå lang
     * 09a: Uoppgitt eller ingen fullført utdanning
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {Array<String>} educations Id of the educations you want combined stats for.
     * @return {Object} Percentage of people that has done one of these educations.
     */
    getEducationPercentageData(kommune, educations) {
        let kommuneData = kommune;
        let kommunenavn = "";
        let data = {};
        // Check if kommune is actual object or kommunenavn
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
            kommunenavn = kommune;
        } else {
            kommunenavn = this.getName(kommune.kommunenummer);
        }
        for (var i = 0; i < educations.length; i++) {
            if (kommuneData.hasOwnProperty(educations[i])) {
                Object.keys(kommuneData[educations[i]]).forEach((gender) => {
                   Object.keys(kommuneData[educations[i]][gender]).forEach( (year) => {
                       if (!data[year]) {
                           data[year] = {};
                       }
                       if (data[year][gender]) {
                           data[year][gender] = Math.round((data[year][gender] + kommuneData[educations[i]][gender][year])*10) / 10;
                       } else {
                           data[year][gender] = kommuneData[educations[i]][gender][year];
                       }
                   })
                });
            }
        }
        return data;
    }
    /**
     * Get Number of population which has one of educations.
     * 01: Grunnskolenivå
     * 02a: Videregående skole-nivå
     * 11: Fagskolenivå
     * 03a: Universitets- og høgskolenivå kort
     * 04a: Universitets- og høgskolenivå lang
     * 09a: Uoppgitt eller ingen fullført utdanning
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {Array<String>} [educations]
     * @return {Number} Number of people that has done one of these educations.
     */
    getLastEducationNum(kommune, educations) {
        let kommuneData = kommune;
        let kommunenavn = "";
        let searchYear = 0;

        // Check if kommune is actual object or kommunenavn
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
            kommunenavn = kommune;
        } else {
            kommunenavn = this.getName(kommune.kommunenummer);
        }

        if (searchYear == 0) {
            searchYear = this.getLastCountYear(kommuneData);
        }
        let popData = befolkning.getPopulation(kommunenavn, searchYear);
        let num = 0;
        for (var i = 0; i < educations.length; i++) {
            if (kommuneData.hasOwnProperty(educations[i])) {
                Object.keys(kommuneData[educations[i]]).forEach((gender) => {
                    num += popData[gender] * kommuneData[educations[i]][gender][searchYear] / 100;
                });
            }
        }
        return Math.round(num);
    }

    /**
     * Get the last count year
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {String} education Id of the desired education to check for.
     * @return {Number} Year.
     */
    getLastCountYear(kommune, education = "03a") {
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        // Find the most recent population count year
        // Have to do it this way because Objects isn't guaranteed to be in order.
        let getLastCountYear = 0;
        for (var year in kommuneData[education]["Kvinner"]) {
            if (year > getLastCountYear) {
                getLastCountYear = year;
            }
        }
        return getLastCountYear;
    }

    /**
     * Get the first count year
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {String} [education="03a"] Id of the desired education to check for.
     * @return {Number} Year.
     */
    getFirstCountYear(kommune, education="03a") {
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        // Find the most recent population count year
        // Have to do it this way because Objects isn't guaranteed to be in order.
        let firstCountYear = Math.max;
        for (var year in kommuneData[education]["Kvinner"]) {
            if (year < firstCountYear) {
                firstCountYear = year;
            }
        }
        return firstCountYear;
    }

    /**
     * Get data, within yearspan
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {Number} [from=latest] First year inclusive.
     * @param {Number} [to=latest] Last year inclusive.
     * @return {Object} Dataset.
     */
    getData(kommune, from = 0, to = 0) {
        let kommuneData = kommune;
        let start = from;
        let stop = to;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        if (start == 0) {
            start = this.getFirstCountYear(kommuneData);
        }
        if (stop == 0) {
            stop = this.getLastCountYear(kommuneData)
        }

        let data = {};
        Object.keys(kommuneData).forEach( (educationid) => {
            if (typeof kommuneData[educationid] == "object") {
                data[educationid] = {};
                Object.keys(kommuneData[educationid]).forEach( (gender) => {
                    data[educationid][gender] = {};
                    Object.keys(kommuneData[educationid][gender]).forEach( (year) => {
                        if (start <= year && year <= stop) {
                            data[educationid][gender][year] = kommuneData[educationid][gender][year];
                        }
                    });
                });
            }
        });

        return data;
    }

    /**
     * Get name of education by id
     * ID: Name
     * "01": "Grunnskolenivå",
     * "02a": "Videregående skole-nivå",
     * "11": "Fagskolenivå",
     * "03a": "Universitets- og høgskolenivå kort",
     * "04a": "Universitets- og høgskolenivå lang",
     * "09a": "Uoppgitt eller ingen fullført utdanning"
     * @param {String} id Education ID
     * @return {String} Name of education
     */
    getEducationName(id) {
        let names = {
            "01": "Grunnskolenivå",
            "02a": "Videregående skole-nivå",
            "11": "Fagskolenivå",
            "03a": "Universitets- og høgskolenivå kort",
            "04a": "Universitets- og høgskolenivå lang",
            "09a": "Uoppgitt eller ingen fullført utdanning"
        }

        if (names.hasOwnProperty(id)) {
            return names[id];
        } else {
            return null;
        }
    }
}