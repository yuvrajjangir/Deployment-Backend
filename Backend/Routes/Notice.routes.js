const express = require('express');
const noticeController = require("../Controllers/noticeController");
const router = express.Router();
const authMiddleware = require("../Middleware/authmiddleware");

router.use(authMiddleware);

router.post('/', noticeController.CreateNotice);

router.get('/', noticeController.getAllNotices);

router.put('/:id', noticeController.UpdateNotice);

router.delete('/:id', noticeController.DeleteNotice);

module.exports = router;