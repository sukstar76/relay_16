const express = require('express');
const router = express.Router();
const verify = require('../../../controller/token')

//토큰 검증 - access token 
router.get('/', function (req, res)  {
    let access_token = req.headers['authorization'];
    let result = verify.token_verify(access_token)
    /*.catch((err) => {
        res.status(500).send(err);
    });*/
    res.send(result);
});

// 토큰 검증 - access token & refresh token 
router.post('/', async (req, res) => {
    let access_token = req.headers['authorization'];
    try{
        let result = verify.token_verify(access_token);
        // access token 유효한 경우 
        if(result.state === 'success') res.status(200).send(result);
        // access token 만료된 경우 
       else { // 잘못된 access token 값
            console.log('잘못된 access 토큰 값');
            res.status(401).send(result);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    };
    
});
module.exports = router;