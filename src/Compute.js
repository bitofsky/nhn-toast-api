// @ts-check

class Compute {

    /**
     * @param {import("./Toast")} oToast 
     */
    constructor(oToast) {

        this.oToast = oToast;

    }

    async request(path, options = {}) {

        const url = `https://api-compute.cloud.toast.com/compute/v1.0/appkeys/${this.oToast.APPKEY}/${path}`;
        const headers = await this.oToast.getCommonHeaders();

        return this.oToast.request(url, { headers, ...options });

    }

    /**
     * 가용영역 조회
     */
    async availabilityZones() {
        /** @type {{ zones: NSCompute.Zone[] }} */
        const { zones } = await this.request('availability-zones', { method: 'GET' });
        return zones;
    }

    /**
     * 인스턴스 조회
     * @param {string} [instanceId] 인스턴스 ID. 비우는 경우 모든 인스턴스 조회
     */
    async instances(instanceId) {
        /** @type {{ instances: NSCompute.Instance[] }} */
        const { instances } = await this.request(`instances${instanceId ? `?id=${instanceId}` : ''}`, { method: 'GET' });
        return instances;
    }

    /**
     * 인스턴스 상세 조회
     * @param {string} [instanceId] 인스턴스 ID. 비우는 경우 모든 인스턴스 조회
     */
    async instancesDetail(instanceId) {
        /** @type {{ instances: NSCompute.InstanceDetail[] }} */
        const { instances } = await this.request(`instances-detail${instanceId ? `?id=${instanceId}` : ''}`, { method: 'GET' });
        return instances;
    }

    /**
     * 인스턴스 생성
     * @param {NSCompute.InstanceCreate} instance 
     */
    async createInstance(instance) {
        /** @type {{ instance: NSCompute.Instance }} */
        const { instance: ret } = await this.request('instances', { method: 'POST', body: { instance } });
        return ret;
    }

    /**
     * 인스턴스 삭제
     * @param {string} instanceId 인스턴스 ID
     */
    async deleteInstance(instanceId) {
        /** @type {{ instance: NSCompute.Instance }} */
        const { ...result } = await this.request(`instances?id=${instanceId}`, { method: 'DELETE' });
        return result;
    }

}

module.exports = Compute;
