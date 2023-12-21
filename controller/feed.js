require('dotenv').config()
const { validationResult } = require("express-validator");
const Feed = require("../models/feed");
const User = require("../models/user");
exports.getPostById = (req, res, next) => {
    const prodId = req.params.postId;
    Feed.findById(prodId)
        .then((result) => {
            return res.status(200).json({
                "message": "data loaded",
                "response": result
            })
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
}

exports.getPosts = (req, res, next) => {
    Feed.find()
        .then((result) => {
            return res.status(200).json({
                "message": "data loaded",
                "response": result
            })
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
}

exports.createPost = (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        return res.status(422).json(errorResult.array());
    }
    const { image } = req.files;
    var imageName = "";
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    imageName = currentDate+"_"+image.name;
    const destinationFolder = process.env.FILE_PATH;

    image.mv(destinationFolder + imageName, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    const feed = new Feed(
        {
            content: req.body.content,
            title: req.body.title,
            image: imageName,
            creator: req.userId
        });

    feed.save()
        .then((feedObj) => {
            return res.status(201).json({
                "message": "feed created",
                "response": feedObj
            });
        })
        .catch((error) => {
            console.log(error);
            error.statusCode = 500;
            next(error);            
        });

}