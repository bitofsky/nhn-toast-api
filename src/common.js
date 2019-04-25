// @ts-check

const request = require('request-promise');
const LRU = require('lru-cache');

const sInstance = Symbol('common.getInstance');

/**
 * Toast 서브클래스 싱글턴 구현
 * 각 서브클래스 인스턴스 객체를 필요한 때 1회만 생성하기 위함
 * 
 * @template T
 * @param {import("./Toast")} oToast 
 * @param {string} name 
 * @param {{ new(oToast: import("./Toast")): T }} cls
 * @returns {T}
 */
const getInstance = (oToast, name, cls) => {

    const container = oToast[sInstance] || (oToast[sInstance] = {});

    return container[name] = container[name] || new cls(oToast);

};

module.exports = {
    request, LRU, getInstance
};
