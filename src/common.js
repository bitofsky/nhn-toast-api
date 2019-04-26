/**
 * 공용 기능 모듈
 * @module common
 */

// @ts-check

const request = require('request-promise');
const LRU = require('lru-cache');
const sInstance = Symbol('common.getInstance');

/** @see https://github.com/request/request-promise */

exports.request = request;

/** @see https://github.com/isaacs/node-lru-cache */
exports.LRU = LRU;

/**
 * Toast 서브클래스 싱글턴 구현
 * 각 서브클래스 인스턴스 객체를 필요한 때 1회만 생성하기 위함
 * @template T
 * @param {import('./Toast')} oToast 
 * @param {string} name 
 * @param {{ new(oToast: import('./Toast')): T }} cls Class
 * @returns {T}
 */
exports.getInstance = (oToast, name, cls) => {

   const container = oToast[sInstance] || (oToast[sInstance] = {});

   return container[name] = container[name] || new cls(oToast);

};
