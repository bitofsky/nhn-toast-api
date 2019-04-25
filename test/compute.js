// @ts-check

/**
 * @param {import("../")} oToast
 */
module.exports = (oToast) => {

    const assert = require('assert');

    describe('Toast Compute API', async () => {

        it('Compute.availabilityZones', async () =>
            assert.strictEqual(
                true,
                Array.isArray(await oToast.compute.availabilityZones())
            )
        );

        it('Compute.instances', async () =>
            assert.strictEqual(
                true,
                Array.isArray(await oToast.compute.instances())
            )
        );

        it('Compute.instancesDetail', async () =>
            assert.strictEqual(
                true,
                Array.isArray(await oToast.compute.instancesDetail())
            )
        );

    });

};