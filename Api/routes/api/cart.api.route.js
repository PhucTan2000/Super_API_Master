const express = require('express');

const cartController = require('../../controller/api/cart.api.controller');
const Mailing=require('../../mailing')

const router = express.Router()

router.get('/:userID',cartController.index);
//  router.post('/',cartController.checkPostIndex,Mailing.contentMail,Mailing.sendMail,cartController.postIndex);

router.post('/',cartController.checkPostIndex,cartController.postIndex)

router.post('/add', cartController.addCart);
router.post('/delete',cartController.deleteCart);

module.exports = router