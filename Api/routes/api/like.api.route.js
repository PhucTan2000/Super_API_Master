const express = require('express');

const likeController = require('../../controller/api/like.api.controller');

const router = express.Router()

router.get('/:userID',likeController.index);

router.post('/add', likeController.add);
router.post('/delete',likeController.delete);

module.exports = router