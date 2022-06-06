var express = require('express');

var router = express.Router();

var controller = require('../../controller/server/auth.controller');

//Login
router.get('/', controller.index);
router.post('/', controller.login);

module.exports = router;