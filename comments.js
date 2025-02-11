//create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//add comment
router.post('/add', (req, res, next) => {
    let newComment = new Comment({
        content: req.body.content,
        post: req.body.post,
        user: req.body.user
    });

    Comment.addComment(newComment, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add comment' });
        } else {
            res.json({ success: true, msg: 'Comment added' });
        }
    });
});

//get comments by post id
router.get('/post/:id', (req, res, next) => {
    Comment.getCommentsByPostId(req.params.id, (err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json({ success: true, comments: comments });
        }
    });
});

//get comments by user id
router.get('/user/:id', (req, res, next) => {
    Comment.getCommentsByUserId(req.params.id, (err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json({ success: true, comments: comments });
        }
    });
});

//get all comments
router.get('/all', (req, res, next) => {
    Comment.getAllComments((err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json({ success: true, comments: comments });
        }
    });
});

//delete comment
router.delete('/delete/:id', (req, res, next) => {
    Comment.deleteComment(req.params.id, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete comment' });
        } else {
            res.json({ success: true, msg: 'Comment deleted' });
        }
    });
});

module.exports = router;
