// @ts-check

class Compute {

    /**
     * @typedef {object} Zone
     * @property {string} zoneName
     * @property {object} zoneState
     * @property {boolean} zoneState.available
     * @memberof Compute
     */

    /**
     * @typedef {object} Instance
     * @property {string} id
     * @property {string} name
     * @property {string} status
     * @memberof Compute
     */

    /**
     * @typedef {object} InstanceDetail
     * 
     * @property {object[]} addresses
     * @property {string} addresses.macAddress
     * @property {string} addresses.ipAddress
     * @property {number} addresses.version
     * @property {string} addresses.floatingIpAddress
     * @property {string} availabilityZone
     * 
     * @property {object} flavor
     * @property {string} flavor.id
     * @property {string} flavor.name
     * @property {number} flavor.cpu
     * @property {number} flavor.ram
     * 
     * @property {string} status
     * @property {string} id
     * @property {string} name
     * @property {string} image
     * @property {Object.<string, string>} metadata
     * 
     * @property {string} keyName
     * 
     * @property {object} volumes
     * @property {string} volumes.root
     * @property {number} volumes.size
     * @property {object[]} volumns.attachments
     * @property {string} volumns.attachments.id
     * @property {string} volumns.attachments.name
     * @property {number} volumns.attachments.size
     * @property {string} volumns.attachments.type
     * 
     * @property {object[]} securityGroups
     * @property {string} securityGroups.name
     * 
     * @property {string} launchedAt
     * @property {string} string
     * @property {string} string
     * 
     * @memberof Compute
     */

    /**
     * @typedef {object} InstanceCreate
     * @property {string} name
     * @property {string} image
     * @property {string} flavor
     * @property {object[]} [networks]
     * @property {string} networks.id
     * @property {string} networks.subnetId
     * @property {string} availabilityZone
     * @property {string} keyName
     * @property {number} count
     * @property {object} volume
     * @property {number} volume.size
     * @property {string} volume.type
     * @property {object[]} securityGroups
     * @property {string} name
     * @memberof Compute
     */


    /**
     * @param {import('./Toast')} oToast 
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
     * 가용영역 조회
     * @return {Promise<Zone[]>}
     * 
     */
    async availabilityZones() {
        const { zones } = await this.request('availability-zones', { method: 'GET' });
        return zones;
    }

    /**
     * 인스턴스 조회
     * @param {string} [instanceId] 인스턴스 ID. 비우는 경우 모든 인스턴스 조회
     * @return {Promise<Instance[]>}
     */
    async instances(instanceId) {
        const { instances } = await this.request(`instances${instanceId ? `?id=${instanceId}` : ''}`, { method: 'GET' });
        return instances;
    }

    /**
     * 인스턴스 상세 조회
     * @param {string} [instanceId] 인스턴스 ID. 비우는 경우 모든 인스턴스 조회
     * @return {Promise<InstanceDetail[]>}
     */
    async instancesDetail(instanceId) {
        const { instances } = await this.request(`instances-detail${instanceId ? `?id=${instanceId}` : ''}`, { method: 'GET' });
        return instances;
    }

    /**
     * 인스턴스 생성
     * @param {InstanceCreate} instance 
     * @return {Promise<Instance>}
     */
    async createInstance(instance) {
        const { instance: ret } = await this.request('instances', { method: 'POST', body: { instance } });
        return ret;
    }

    /**
     * 인스턴스 삭제
     * @param {string} instanceId 인스턴스 ID
     * @return {Promise<void>}
     */
    async deleteInstance(instanceId) {
        await this.request(`instances?id=${instanceId}`, { method: 'DELETE' });
    }

}

module.exports = Compute;
