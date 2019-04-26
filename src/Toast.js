// @ts-check
const { request, LRU, getInstance } = require('./common');

const EndPoint = 'https://api-compute.cloud.toast.com/compute';

class Toast {

    /**
     * @typedef {object} TokenStore
     * @property {TokenStoreGet} get
     * @property {TokenStoreSet} set
     * @memberof Toast
     */

    /**
     * @typedef {function} TokenStoreGet
     * @callback 
     * @param {string} key
     * @returns {string} token.id
     * @memberof Toast
     */

    /**
     * @typedef {function} TokenStoreSet
     * @callback
     * @param {string} key
     * @param {string} id token.id
     * @param {number} expireRemainMs
     * @returns {void}
     * @memberof Toast
     */

    /**
     * @typedef {object} CommonHeaders
     * @property {string} X-Auth-Token
     */

    /**
     * Create new Toast Instance
     * @param {object} authInfo
     * @param {string} authInfo.TOAST_ID
     * @param {string} authInfo.APPKEY
     * @param {string} authInfo.TENANT_ID
     * @param {string} authInfo.API_PASSWORD
     * @param {TokenStore} [authInfo.tokenStore]
     */
    constructor({ TOAST_ID, APPKEY, TENANT_ID, API_PASSWORD, tokenStore }) {

        this.TOAST_ID = TOAST_ID;
        this.APPKEY = APPKEY;
        this.TENANT_ID = TENANT_ID;
        this.API_PASSWORD = API_PASSWORD;

        this.tokenStore = tokenStore || new LRU();

    }

    /**
     * @param {string} url 
     * @param {object} [options]
     * @return {Promise<object>}
     */
    async request(url, options = {}) {

        options.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            ...options.headers,
        };

        /** @type {{header: object}} */
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
     * @returns {Promise<CommonHeaders>}
     */
    async getCommonHeaders() {

        /** @type {string} */
        const token = await this.getCommonToken();

        // @ts-ignore 현재 VSCode TS 파서가 - 이 포함된 @property를 제대로 처리하지 못함
        return { 'X-Auth-Token': token };

    }

    /**
     * Compute / Network 등에서 사용하는 일반 토큰 획득
     * @returns {Promise<string>} token.id
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
