const express = require('express');

var productController = require('../../controller/api/product.api.controller');

const router = express.Router()

router.get('/', productController.index);


module.exports = router