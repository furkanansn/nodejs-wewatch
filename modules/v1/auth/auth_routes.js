let express = require('express');
let response = require('../../../config/response')
let controller = require("./auth_controllers")
let jwt = require("../../../core/jwt")
let router = express.Router();

router.post('/login', async function(req, res, next) {
    let data = await controller.login(req)
    if(data != null){        
        data.token = jwt.generateJwt(data.id)                
        delete data.passwrd;
        res.json(response(false,data));
    }else{

        res.json(response(true,"Wrong credentials"));
    }

});

router.post('/register', async function(req, res, next) {
    try {
        let data = await controller.register(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});
module.exports = router;