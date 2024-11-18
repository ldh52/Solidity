//
// 웹사이트를 통해서 입력받은 이미지를 Pinata API를 통해서 IPFS에 업로드 해준다.
// 또한 이미지의 CID를 사용해서 메타데이터를 만들고 이것 또한 IPFS에 올린다.
//

// 모든 정보를 보관해 주는 객체.
let App = {
    img : {
        url1 : 'https://api.pinata.cloud/pinning/pinFileToIPFS',       // 이미지 업로드 주소에 주의한다.
        url2 : 'https://api.pinata.cloud/pinning/pinJSONToIPFS',       // JSON 업로드 주소에 주의한다.
        myAPIKey : '',
        mySecretAPIKey : '',
        imgFile : null,
        imgFileName: '',
        imgCID : '',
        metaCID : '',
        metadata : {}
    }
} // App의 끝.


// 비동기 처리를 해주는 async 함수.
async function uploadIPFS() {    
    try {
        $('#result').text('처리중...')
        let data = new FormData()
        data.append('file', App.img.imgFile)
        let res = await axios.post(App.img.url1,         // POST로 보낸다.
        data,                                        // 이미지 데이터.
        { headers: {
            'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            'pinata_api_key': App.img.myAPIKey ,
            'pinata_secret_api_key': App.img.mySecretAPIKey 
            }
        })
        App.img.imgCID = `ipfs://${res['data']['IpfsHash']}`       // 성공한 경우 CID 기록.
//        console.log(App.img.imgCID)
//        console.log(App.img.imgFileName)
        
        // 메타데이터를 만든다.
        App.img.metadata['pinataContent'] = {}
        App.img.metadata['pinataContent']['description'] = $('#description').val()
        App.img.metadata['pinataContent']['image'] = App.img.imgCID
        App.img.metadata['pinataContent']['name'] = App.img.imgFileName
        App.img.metadata['pinataMetadata'] = {}
        App.img.metadata['pinataMetadata']['name'] = (App.img.imgFileName).split('.')[0] +'.json'
//        console.log(JSON.stringify(App.img.metadata))

        // 이어서 메타데이터를 IPFS에 올린다.
        try {
            res = await axios.post(App.img.url2,                                // POST로 보낸다.
            App.img.metadata,                                                   // 객체 자체. (stringify 되지 않음)
            { headers: {
                'Content-Type': 'application/json',                             // 주의!
                'pinata_api_key': App.img.myAPIKey ,
                'pinata_secret_api_key': App.img.mySecretAPIKey 
                }
            })
            App.img.metaCID = `ipfs://${res['data']['IpfsHash']}`               // 성공한 경우 cid를 만든다.
            $('#result').text('Metadata CID : ' + App.img.metaCID)              // 메타데이터의 cid 출력.

        } catch (err) {
            alert('메타데이터 올리는 도중 오류발생!');                       // 메타데이터 업로드실패한 경우.
            $('#result').text('')
        }

    } catch (err) {
        alert('이미지 올리는 도중 오류발생!');                                     // 실패한 경우.
        $('#result').text('')
    }

}

// 이벤트 처리 함수 설정 및 초기화.
$('#result').text('')
$('#upload').change( (e) => { App.img.imgFile =  e.target.files[0]; App.img.imgFileName = e.target.files[0].name; } )
$('#btn_upload').click(() => { uploadIPFS() } ) 
$.getJSON('./js/myKeys.json', (data)=> { App.img.myAPIKey = data['myAPIKey']; App.img.mySecretAPIKey = data['mySecretAPIKey'];})