// @ts-check

const { APPKEY, TENANT_ID, API_PASSWORD, TOAST_ID, TEST } = require('../testenv');

const Toast = require('../');

const oToast = new Toast({ TOAST_ID, APPKEY, TENANT_ID, API_PASSWORD });

const fs = require('fs');

const list = fs.readdirSync(__dirname).filter(f => f !== 'index.js');
const filtered = list.filter(f => f.indexOf(TEST + '.js') === 0);
const executeTestList = filtered.length ? filtered : list;

describe('Toast Tests', () => {

    for (let filename of executeTestList)
        require(`${__dirname}/${filename}`)(oToast);

});
