let express = require('express');
let response = require('../../../config/response')
let controller = require("./users_controllers")
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

router.get('/matches', async function(req, res, next) {
    try {
        let data = await controller.getMatches(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});

router.post('/image', async function(req, res, next) {
    try {
        let data = await controller.uploadImage(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});

router.put('/profile', async function(req, res, next) {
    try {
        let data = await controller.editProfile(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});

router.put('/change-password', async function(req, res, next) {
    try {
        let data = await controller.changePassword(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});

router.delete('/image', async function(req, res, next) {
    try {
        let data = await controller.deleteImage(req)
        if(data.error){
            res.json(response(true, data.error));
        }else{
            res.json(response(false, data));
        }
   } catch (e) {
        next(e)
    }
});

router.delete('/profile', async function(req, res, next) {
    try {
        let data = await controller.deleteAccount(req)
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