const express = require('express');
const { check, body } = require('express-validator');
const feedsController = require('../controller/feed');
const isAuth = require('../middleware/auth-guard');
const router = express.Router();

router.get("/posts", isAuth, feedsController.getPosts);
router.get("/post/:postId", isAuth, feedsController.getPostById);

router.post("/post", isAuth, body('content').trim().notEmpty().withMessage("content is required").isLength({ min: 5 }).withMessage("Minimum length is 5"), feedsController.createPost);
module.exports = router;