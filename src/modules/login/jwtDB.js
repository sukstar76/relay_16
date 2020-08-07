const jwt = require('./jwt');
let accessToken = jwt.sign("123");
module.exports = {
    jwtDB : { "123" : accessToken}
}