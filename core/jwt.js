const api_secret_key = require('../config/api_secret_key')
let jwt = require('jsonwebtoken')

module.exports.generateJwt = (user_id) => {
    const payLoad = {
        id : user_id,        
    };

    return jwt.sign(payLoad, api_secret_key, { expiresIn: "1000 days" });

}