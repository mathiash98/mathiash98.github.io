/**
 * Befolkning API
 * @author Mathias Haugsbø
 */
class Befolkning extends Dataset {
    /**
     * Get population of kommune.
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {Number} [year=latest] What year you wan't statistics from.
     * @return {Object} Last population data as {Kvinner: Num, Menn: Num}.
     */
    getPopulation(kommune, year = 0) {
        let kommuneData = kommune;
        let searchYear = year;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        if (searchYear == 0) {
            searchYear = this.getLastCountYear(kommuneData);
        }
        return {
            "Kvinner": kommuneData["Kvinner"][searchYear],
            "Menn": kommuneData["Menn"][searchYear]
        };
    }

    /**
     * Get total population of kommune.
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @param {Number} [year=latest] What year you wan't statistics from.
     * @return {Number} Last total population data.
     */
    getTotalPopulation(kommune, year = 0) {
        let searchYear = year;
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
            if (searchYear == 0) {
                searchYear = this.getLastCountYear(kommune);
            }
        } else {
            if (searchYear == 0) {
                searchYear = this.getLastCountYear(kommune);
            }
        }

        let popData = this.getPopulation(kommuneData, year);
        return popData["Kvinner"] + popData["Menn"];
    }

    /**
     * Get the last popuilation count year
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @return {Number} Year.
     */
    getLastCountYear(kommune) {
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        // Find the most recent population count year
        // Have to do it this way because Objects isn't guaranteed to be in order.
        let latestPopulationCount = 0;
        for (var year in kommuneData["Kvinner"]) {
            if (year > latestPopulationCount) {
                latestPopulationCount = year;
            }
        }
        return latestPopulationCount;
    }

    /**
     * Get the first count year
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @return {Number} Year.
     */
    getFirstCountYear(kommune) {
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        // Find the most recent population count year
        // Have to do it this way because Objects isn't guaranteed to be in order.
        let firstCountYear = Math.max;
        for (var year in kommuneData["Kvinner"]) {
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
        data = {};
        Object.keys(kommuneData).forEach((gender) => {
            if (typeof kommuneData == "object") {
                data[gender] = {};
                Object.keys(kommuneData[gender]).forEach((year) => {
                    if (start <= year && year <= stop) {
                        data[gender][year] = kommuneData[gender][year];
                    }
                });
            }
        });

        return data;
    }
}