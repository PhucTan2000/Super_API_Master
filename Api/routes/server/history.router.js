var express = require('express');

var router = express.Router();

var controller = require('../../controller/server/history.controller');

router.get('/', controller.index);

router.get('/:id',controller.view);

module.exports = router;