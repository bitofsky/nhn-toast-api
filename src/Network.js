// @ts-check

class Network {

    /**
     * @typedef {object} SecurityGroupRule
     * @property {string} direction
     * @property {string} ethertype
     * @property {string} id
     * @property {number} [portRangeMax]
     * @property {number} [portRangeMin]
     * @property {string} [protocol]
     * @property {string} [remoteGroupId]
     * @property {string} [remoteIpPrefix]
     * @property {string} securityGroupId
     * @property {string} description
     * @memberof Network
     */

    /**
     * @typedef {object} SecurityGroup
     * @property {string} description
     * @property {string} id
     * @property {string} name
     * @property {SecurityGroupRule[]} securityGroupRules
     * @memberof Network
     */

    /**
     * @param {import("./Toast")} oToast 
     */
    constructor(oToast) {

        this.oToast = oToast;

    }

    /**
     * Request API
     * @param {string} path 
     * @param {object} [options]
     * @return {Promise<object>}
     */
    async request(path, options = {}) {

        const url = `https://api-compute.cloud.toast.com/compute/v1.0/appkeys/${this.oToast.APPKEY}/${path}`;
        const headers = await this.oToast.getCommonHeaders();

        return this.oToast.request(url, { headers, ...options });

    }

    /**
     * 보안 그룹 목록 조회
     * @param {string} [securityGroupId] 조회할 보안 그룹 ID. 기재하지 않을 경우 모든 보안 그룹의 정보를 조회합니다.
     * @returns {Promise<SecurityGroup[]>}
     */
    async securityGroups(securityGroupId) {
        const { securityGroups } = await this.request(`security-groups${securityGroupId ? `?id=${securityGroupId}` : ''}`, { method: 'GET' });
        return securityGroups;
    }


}

module.exports = Network;
