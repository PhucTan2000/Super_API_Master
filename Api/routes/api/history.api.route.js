const express = require('express');

const historyController = require('../../controller/api/history.api.controller');

const router = express.Router()

router.get('/',historyController.index);
router.post('/preOrder',historyController.preOrder)
module.exports = router