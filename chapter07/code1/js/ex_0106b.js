// Pinata API에 접속하여 이미지 데이터를 올려본다.
// async와 await 사용.

const axios = require('axios');                                     // 필요한 라이브러리를 불러온다.
const fs = require('fs');                                           // 필요한 라이브러리를 불러온다.
const FormData = require('form-data');                              // 필요한 라이브러리를 불러온다.
const { myAPIKey , mySecretAPIKey } =  require('./myKeys.json')     // require를 사용해서 JSON을 객체로 가져온다.

const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';       // 이미지 업로드 주소에 주의한다.
let data = new FormData();                                          // Form 태그와 유사한 역할을 할 객체.
data.append('file', fs.createReadStream('../images/monkey_01.png'));

// 비동기 처리를 해주는 async 즉시호출 함수.
(async function() {    
    try {
        let res = await axios.post(url,              // POST로 보낸다.
        data,                                        // 이미지 데이터.
        { headers: {
            'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            'pinata_api_key': myAPIKey ,
            'pinata_secret_api_key': mySecretAPIKey 
            }
        })
        console.log(`ipfs://${res['data']['IpfsHash']}`)       // 성공한 경우 CID 출력.
    } catch (err) {
        console.log('오류발생!');                               // 실패한 경우.
    }

})();


