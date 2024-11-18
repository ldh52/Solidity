// Pinata API에 접속하여 테스트 해본다.
// async와 await 사용.

const axios = require('axios');                                     // 필요한 라이브러리를 불러온다.
const { myAPIKey , mySecretAPIKey } =  require('./myKeys.json')     // require를 사용해서 JSON을 객체로 가져온다.
const url = 'https://api.pinata.cloud/data/testAuthentication';     // 주의: 세미콜론 사용!

// 비동기 처리를 해주는 async 즉시호출 함수.
(async function() {    
    try {
        let res = await axios.get(url, {             // GET.
        headers: {
            'pinata_api_key': myAPIKey ,
            'pinata_secret_api_key': mySecretAPIKey 
            }
        })
        console.log(res['data']['message']);         // 성공한 경우.
    } catch (err) {
        console.log('오류발생!');                     // 실패한 경우.
    }

})();