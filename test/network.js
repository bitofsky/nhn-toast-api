// @ts-check

/**
 * @param {import("../")} oToast
 */
module.exports = (oToast) => {

    const assert = require('assert');

    describe('Toast Network API', async () => {

        it('Network.securityGroups', async () =>
            assert.strictEqual(
                true,
                Array.isArray(await oToast.network.securityGroups())
            )
        );

    });

};