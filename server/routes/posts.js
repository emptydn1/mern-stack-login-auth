const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const passport = require('passport');

router.get('/', function (req, res, next) {
    Post.find().sort({ date: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
        })
});


//add posts
router.post('/add', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        // trim() use to cut the space at begin and end of the text
        //.body from form user input
        const text = req.body.text.trim();

        const newPosts = new Post({
            user: {
                //.user from config passport
                id: req.user.id,
                login: req.user.login,
            },
            text
        })
        newPosts.save()
            .then(Posts => {
                res.json(Posts);
            })
            .catch(err => {
                console.log(err);
            })
    });


module.exports = router;