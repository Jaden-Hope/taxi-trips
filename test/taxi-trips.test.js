let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://jaden:mypass@localhost:5432/my_balloon_tests';

const pool = new Pool({
    connectionString
});

describe('Taxi Trips', function () {

    // beforeEach(async function () {

    // });

    it('should find how many trips all the taxis made', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.equal(await taxiTrips.totalTripCount(), 32);

    });

    it('should find all the regions', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepEqual(await taxiTrips.findAllRegions(), [{"name": "Durban"},{"name": "Cape Town"},{"name": "Gauteng"}]);

    });

    it('should find all the taxis for a region', async function () {
        const taxiTrips = TaxiTrips(pool);

        let result = await taxiTrips.findTaxisForRegion('Durban');
        assert.equal(result[0].reg_number, 'ND 12345');
        assert.equal(result[1].reg_number, 'ND 54321');
        assert.equal(result[2].reg_number, 'ND 98765');

        result = await taxiTrips.findTaxisForRegion('Cape Town');
        assert.equal(result[0].reg_number, 'CA 76543');
        assert.equal(result[1].reg_number, 'CA 12376');
        assert.equal(result[2].reg_number, 'CA 98734');

        result = await taxiTrips.findTaxisForRegion('Gauteng');
        assert.equal(result[0].reg_number, 'GP 67890');
        assert.equal(result[1].reg_number, 'GP 09512');
        assert.equal(result[2].reg_number, 'GP 12094');

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);

        let result = await taxiTrips.findTripsByRegNumber('ND 12345');
        assert.equal(result[0].id, 1);
        assert.equal(result[1].id, 2);
        assert.equal(result[2].id, 3);

        result = await taxiTrips.findTripsByRegNumber('CA 76543');
        assert.equal(result[0].id, 11);
        assert.equal(result[1].id, 12);
        assert.equal(result[2].id, 13);

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.equal(await taxiTrips.findTripsByRegion('Cape Town'), 10);
        assert.equal(await taxiTrips.findTripsByRegion('Gauteng'), 12);
        assert.equal(await taxiTrips.findTripsByRegion('Gauteng'), 12);

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(await taxiTrips.findIncomeByRegNumber('ND 54321'), 47);
        assert.deepStrictEqual(await taxiTrips.findIncomeByRegNumber('ND 12345'), 42);

    });

    it('should find the total income for each taxi', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(await taxiTrips.findTotalIncomePerTaxi(), { 'CA 12376': 36, 'CA 76543': 27, 'CA 98734': 27, 'GP 09512': 45, 'GP 12094': 48, 'GP 67890': 79, 'ND 12345': 42, 'ND 54321': 47, 'ND 98765': 24 });

    });

    it('should find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(await taxiTrips.findTotalIncome(), 375);
    });

    it('should find the total income for all the taxis in a given region', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepEqual(await taxiTrips.findTotalIncomeByRegion(), { '1': 113, '2': 90, '3': 172 });
    });

    after(function () {
        pool.end();
    });

});