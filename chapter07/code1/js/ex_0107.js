// Pinata API에 접속하여 이미지 데이터를 올리고,
// 해당 CID를 사용해서 메타데이터를 만들고 이것 또한 IPFS에 올린다.
// async와 await 사용.

const axios = require('axios');                                     // 필요한 라이브러리를 불러온다.
const fs = require('fs');                                           // 필요한 라이브러리를 불러온다.
const FormData = require('form-data');                              // 필요한 라이브러리를 불러온다.
const { myAPIKey , mySecretAPIKey } =  require('./myKeys.json')     // require를 사용해서 JSON을 객체로 가져온다.

const fileName = 'monkey_01.png'
const metadataName = 'monkey_01.json'
const url1 = 'https://api.pinata.cloud/pinning/pinFileToIPFS';       // 이미지 업로드 주소에 주의한다.
const url2 = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';       // JSON 업로드 주소에 주의한다.
let data = new FormData();                                          // Form 태그와 유사한 역할을 할 객체.
data.append('file', fs.createReadStream(`../images/${fileName}`) );

// 비동기 처리를 해주는 async 즉시호출 함수.
(async function() {    

    let cid1 = ''
    let cid2 = ''
    let metadata = {}
    let res
    // 이미지를 IPFS에 올린다.
    try {
        res = await axios.post(url1,                 // POST로 보낸다.
        data,                                        // 이미지 데이터.
        { headers: {
            'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            'pinata_api_key': myAPIKey ,
            'pinata_secret_api_key': mySecretAPIKey 
            }
        })
        cid1 = `ipfs://${res['data']['IpfsHash']}`              // 성공한 경우 cid를 만든다.

        // 메타데이터를 만든다.
        metadata['pinataContent'] = {}
        metadata['pinataContent']['description'] = 'The image for NFT minting purpose.'
        metadata['pinataContent']['image'] = cid1
        metadata['pinataContent']['name'] = fileName
        metadata['pinataMetadata'] = {}
        metadata['pinataMetadata']['name'] = metadataName
        console.log(JSON.stringify(metadata))

        // 이어서 메타데이터를 IPFS에 올린다.
        try {
            res = await axios.post(url2,                                        // POST로 보낸다.
            metadata,                                                           // 객체 자체. (stringify 되지 않음)
            { headers: {
                'Content-Type': 'application/json',                             // 주의!
                'pinata_api_key': myAPIKey ,
                'pinata_secret_api_key': mySecretAPIKey 
                }
            })
            cid2 = `ipfs://${res['data']['IpfsHash']}`                          // 성공한 경우 cid를 만든다.
            console.log('Metadata CID :', cid2)
        } catch (err) {
            console.log('메타데이터 올리는 도중 오류발생!');                       // 메타데이터 업로드실패한 경우.
        }

    } catch (err) {
        console.log('이미지 올리는 도중 오류발생!');                               // 이미지 업로드 실패한 경우.
    }

})();




