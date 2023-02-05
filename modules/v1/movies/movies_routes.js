let express = require('express');
let response = require('../../../config/response')
let controller = require("./movies_controllers")
let router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let data = await controller.get(req)
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