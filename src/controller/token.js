const jwt = require('../modules/login/jwt');
const jwtDB = require('../modules/login/jwtDB');

// 토큰 유효성 검증 
module.exports = {
    //access token 검증	
    token_verify: async (...args) => {
        const verify = jwt.verify(args[0], args[1]);
        return new Promise(async (resolve, reject) => {
            if (verify.user_id) {
                try {
                    let result = verify.user_id in jwtDB.jwtDB;
                    if (!result) throw Error();
                    resolve({
                        state: 'success',
                        message: 'Token verified !',
                        user_id: verify.user_id
                    });

                } catch (err) {
                    reject({
                        state: 'fail',
                        message: err
                    });
                }
            } else {
                resolve({
                    state: 'fail',
                    message: verify
                });
            }
        })
    }
}