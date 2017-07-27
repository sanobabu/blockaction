const express = require('express');
let router = express.Router()
let user = require('../controllers/userController')
const mw = require('../middlewares/response.middleware');

router.post('/register',user.collectToRegister, user.register,mw.respond,mw.error);
router.post('/login', user.collectToAuthenticate,user.authenticate,mw.respond,mw.error);
router.post('/subscribe', user.subscribe, mw.respond, mw.error);
router.post('/request/ether', user.requestEther, mw.respond, mw.error);

module.exports = router

