const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');

router.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            // Handle the case where the post is not found
            return res.status(404).render('error404', { message: 'Post not found' });
        }

        // Render the 'post_detail' page with the fetched post data
        return res.render('admin/posts/post_detail', { post });
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error(error);
        return res.status(500).render('error500', { message: 'Internal Server Error' });
    }
});

module.exports = router;
