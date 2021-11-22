module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {
        return await (await pool.query('SELECT * FROM trips')).rowCount;
    }

    async function findAllRegions() {
        return await (await pool.query('SELECT name FROM region')).rows;
    }

    async function findTaxisForRegion(regionName) {
        return await (await pool.query('SELECT reg_number FROM taxi JOIN region ON region.id = taxi.region_id WHERE region.name=$1', [regionName])).rows;
    }

    async function findTripsByRegNumber(regNumber) {
        return await (await pool.query('SELECT trips.id FROM trips JOIN taxi ON taxi.id = trips.taxi_id WHERE taxi.reg_number=$1', [regNumber])).rows;
    }

    async function findTripsByRegion(regionName) {
        const taxis = await (await pool.query('SELECT taxi.id FROM taxi JOIN region ON region.id = taxi.region_id WHERE region.name=$1', [regionName])).rows;

        return await (await pool.query('SELECT * FROM trips WHERE taxi_id IN ($1, $2, $3)', [taxis[0].id, taxis[1].id, taxis[2].id])).rowCount;
    }

    async function findIncomeByRegNumber(regNumber) {
        const route_id = await (await pool.query('SELECT route_id FROM trips JOIN taxi ON taxi.id = trips.taxi_id WHERE reg_number=$1', [regNumber])).rows;

        let total = 0;
        for (let i = 0; i < route_id.length; i++) {
            total += await (await pool.query('SELECT fare FROM routes WHERE id=$1', [route_id[i].route_id])).rows[0].fare;
        }

        return total;
    }

    async function findTotalIncomePerTaxi() {
        const reg_numbers = await (await pool.query('SELECT reg_number FROM taxi')).rows;

        let result = {};
        for (let i = 0; i < reg_numbers.length; i++) {
            result[reg_numbers[i].reg_number] = await findIncomeByRegNumber(reg_numbers[i].reg_number);
        }

        return result;
    }

    async function findTotalIncome() {
        let result = 0;
        Object.values(await findTotalIncomePerTaxi()).forEach((item) => {
            result += item;
        })

        return result;
    }

    async function findTotalIncomeByRegion() {
        let tripsObj = {};
        for (let i = 1; i < 4; i++) {
            tripsObj[i] = await (await pool.query('SELECT trips.route_id FROM taxi JOIN trips ON trips.taxi_id = taxi.id WHERE taxi.region_id=$1', [i])).rows;
        }

        let incomeByRegion = {};
        for (let i = 1; i < 4; i++) {
            let currObj = tripsObj[i];
            incomeByRegion[i] = 0;
            for (let j = 0; j < currObj.length; j++) {
                let currObj2 = currObj[j];
                incomeByRegion[i] += await (await pool.query('SELECT fare FROM routes WHERE id=$1', [currObj2.route_id])).rows[0].fare;
            }
        }

        return incomeByRegion;
    }

    return {
        totalTripCount,
        findAllRegions,
        findTaxisForRegion,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncomePerTaxi,
        findTotalIncome,
        findTotalIncomeByRegion,
    }
}