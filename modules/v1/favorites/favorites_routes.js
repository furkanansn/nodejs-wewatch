let express = require('express');
let response = require('../../../config/response')
let controller = require("./favorites_controllers")
let router = express.Router();

router.get('/profile', async function(req, res, next) {
    try {
        let data = await controller.getProfile(req)
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