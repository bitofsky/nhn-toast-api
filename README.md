NHN Toast API - NodeJS 모듈 입니다.

개발 진행중으로 현재는 간단한 조회 기능만 제공 됩니다.

## Npm Install
    npm install nhn-toast-api

## Uses
``` javascript
const TOAST_ID = "Your Toast Email ID";
const APPKEY = "Your APP Key";
const TENANT_ID = "API Endpoint Tenant ID";
const API_PASSWORD = "API Endpoint Password";

const Toast = require('nhn-toast-api');

// Create Instance
const oToast = new Toast({ TOAST_ID, APPKEY, TENANT_ID, API_PASSWORD });

// Support Async / Await
(async () => {
    
    const instances = await oToast.compute.instances();
    
    // [{ status: 'ACTIVE', id: '6#-##', name: '###' },{ status: 'ACTIVE', id: 'd#-##', name: '###' }]
    console.log(instances);

})();
```

## API Documents
* [nhn-toast-api](https://bitofsky.github.io/nhn-toast-api) - JSDOC
* [docs.toast.com Api Guide](https://docs.toast.com/ko/Compute/Instance/ko/api-guide/)

## Token Store
 - LRU 대신 별도의 Token 보관소(File or DB or etc...) 사용은 Toast 객체 생성시 tokenStore 를 지정해주면 됩니다.
 - tokenStore는 LRU와 같이 다음과 같은 get / set 인터페이스를 갖추고 있어야 합니다.
 - get / set 은 Async 가능합니다.

``` javascript

const tokenStore = {

    /**
     * @param {string} key 저장키
     * @return {string|undefined} Token ID. 없거나 만료된 토큰은 undefined를 반환합니다.
     */
    async get(key){ return token; },

    /**
     * @param {string} key 저장키
     * @param {string} token Token ID
     * @param {number} expireRemainMs miliseconds
     * @return {void}
     */
    async set(key, token, expireRemainMs){ /* save token */  }
};

const oToast = new Toast({ ...authInfo, tokenStore });
```


## Todos
1. Compute / Network API
1. ObjectStorage API

## Contributing

이 모듈은 NodeJS 11 & JavaScript 로 개발되며 JSDoc 으로 문서화 하고 있습니다.

### VS Code & Test

* VSCode 에서 F5 를 눌러 Mocha Tests 를 실행하면 DEBUG CONSOLE 을 사용할 수 있습니다.
* ``` npm test ``` 로 테스트 할 수 있습니다.
* /test_env.js 에 Test API 를 실행하기 위한 인증 정보를 넣습니다. (.gitignore 되어 있습니다.)

``` javascript
module.exports = {
    "TOAST_ID": "Your Toast Email ID",
    "APPKEY": "Your APP Key",
    "TENANT_ID": "API Endpoint Tenant ID",
    "API_PASSWORD": "API Endpoint Password",
    // "TEST": "compute", 특정 Mocha Test 만 선택적으로 실행할 수 있습니다.
};
```

* /.vscode/launch.json 에 다음과 같이 Mocha Tests 환경 구성을 할 수 있습니다.
    
``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Mocha Tests",
            "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
            "args": [
                "--timeout",
                "999999",
                "--colors",
                "${workspaceFolder}/test",
            ],
            "internalConsoleOptions": "openOnSessionStart",
        },
    ]
}
```

### JSDoc 파일 위치
    docs/index.html

### JSDoc 재생성
    npm run jsdoc

## License
(The MIT License)

Copyright (c) 2019 Bum-seok Hwang bitofsky@naver.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.