const express = require('express');

const authController = require('../../controller/api/auth.api.controller')
const Mailing=require('../../mailing')


const router = express.Router()

router.post('/login',authController.login);

router.post('/forgetPassword',authController.forgetPassword,Mailing.contentOTP,Mailing.sendMail);
module.exports = router