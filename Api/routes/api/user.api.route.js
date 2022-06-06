const express = require('express');

const userController = require('../../controller/api/user.api.controller');

const router = express.Router()

router.post('/create', userController.postCreate);

router.post('/update', userController.updatePassword);

module.exports = router