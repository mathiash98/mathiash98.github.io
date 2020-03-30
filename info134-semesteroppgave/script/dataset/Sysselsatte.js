/**
 * Sysselsetting API
 * @author Mathias Haugsbø
 */
class Sysselsatte extends Dataset {
    /**
     * Get employement percentage of kommune.
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @return {Number} Employement percentage in kommune.
     */
    getLastEmployementPercentage(kommune) {
        let kommuneData = kommune;
        let lastCount = 0;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
            console.log(kommuneData);
            lastCount = this.getLastCountYear(kommuneData);
        } else {
            lastCount = this.getLastCountYear(kommune);
        }
        return kommuneData["Begge kjønn"][lastCount];
    }


    /**
     * Get the last employement count year
     * @param {(String | Object)} kommune Name of kommune or the kommune object.
     * @return {Number} Year.
     */
    getLastCountYear(kommune){
        let kommuneData = kommune;
        if (typeof kommune == "string") {
            kommuneData = this.getInfo(kommune);
        }
        // Find the most recent count year
        // Have to do it this way because Objects isn't guaranteed to be in order.
        let latestCount = 0;
        for(var year in kommuneData["Begge kjønn"]){
            if (year > latestCount) {
                latestCount = year;
            }
        }
        return latestCount;
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