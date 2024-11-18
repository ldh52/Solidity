// Pinata API에 접속하여 테스트 해본다.
// promise와 then 사용.

const axios = require('axios');                                     // 필요한 라이브러리를 불러온다.
const { myAPIKey , mySecretAPIKey } =  require('./myKeys.json')     // require를 사용해서 JSON을 객체로 가져온다.
const url = 'https://api.pinata.cloud/data/testAuthentication'      // 주소 주의.

axios.get(url, {                                    // GET.
    headers: {
        'pinata_api_key': myAPIKey ,
        'pinata_secret_api_key': mySecretAPIKey 
        }
    })
    .then(function (res) {
        console.log(res['data']['message'])         // 성공한 경우.
    })
    .catch(function (err) {
        console.log('오류발생!')                    // 실패한 경우.
    });