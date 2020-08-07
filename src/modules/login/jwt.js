const jwt = require('jsonwebtoken');

module.exports = {
  // access token 생성
  sign : function(user_id) { 
    const options = {
      algorithm : "HS256",
      expiresIn : 100000000000 // 1분
    };
    const payload = {
      user_id : user_id
    };
    return jwt.sign(payload, 'secret_key', options);
  },

  verify : function(token, options) {
    let decoded;
    try {
      decoded = jwt.verify(token, 'secret_key', options);
    }
    catch(err) {
      return err.message;
    }
    return decoded;
  }
};