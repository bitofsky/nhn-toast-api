// @ts-check

const { request, LRU, getInstance } = require('./common');

const EndPoint = 'https://api-compute.cloud.toast.com/compute';

class Toast {

    constructor({ TOAST_ID, APPKEY, TENANT_ID, API_PASSWORD, tokenStore }) {

        this.TOAST_ID = TOAST_ID;
        this.APPKEY = APPKEY;
        this.TENANT_ID = TENANT_ID;
        this.API_PASSWORD = API_PASSWORD;

        this.tokenStore = tokenStore || new LRU();

    }

    async request(url, options = {}) {

        options.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            ...options.headers,
        };

        const { header, ...result } = await request({
            method: 'POST',
            url,
            json: true,
            ...options,
        });

        if (!header.isSuccessful) throw new Error(`[${header.resultCode}] ${header.resultMessage}`);

        return result;

    }

    /**
     * Compute / Network 등에서 사용하는 엑세스 토큰 헤더 획득
     */
    async getCommonHeaders() {

        const token = await this.getCommonToken();

        return { 'X-Auth-Token': token };

    }

    /**
     * Compute / Network 등에서 사용하는 일반 토큰 획득
     */
    async getCommonToken() {

        const curToken = await this.tokenStore.get('ToastCommonToken');

        if (curToken) return curToken; // 토큰 재사용

        const path = 'tokens';
        const username = this.TOAST_ID;
        const password = this.API_PASSWORD;
        const body = { auth: { username, password } };

        const { access: { token, user }, ...r } = await this.request(`${EndPoint}/v1.0/appkeys/${this.APPKEY}/${path}`, { body });
        const expireRemainMs = +new Date(token.expires) - +new Date() - (1000 * 60 * 5); // 토큰 만료 5분전까지 유효

        await this.tokenStore.set('ToastCommonToken', token.id, expireRemainMs);

        return token.id;

    }

    get compute() { return getInstance(this, 'compute', require('./Compute')); }
    get network() { return getInstance(this, 'network', require('./Network')); }

}

module.exports = Toast;
