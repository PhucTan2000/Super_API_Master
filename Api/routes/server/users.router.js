var express = require('express');

var router = express.Router();

var controller = require('../../controller/server/users.controller');

router.get('/', controller.index);

router.get('/create', controller.viewCreateProduct);
router.post('/create', controller.addProduct);

//Delete
router.post('/', controller.deleteProduct);

//Update
router.get('/update/:id', controller.viewUpdate);
router.post('/update/:id', controller.updateUser);

module.exports = router;