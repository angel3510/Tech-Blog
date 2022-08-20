const {User, Post, Comment} = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {

    try{
        //get our raw data
        const homepageData = await Post.findAll(
            {
                attributes: ["id", "title", "createdAt"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ).catch((err) => {
            res.json(err);
        })
        
        //trim back the data to a manageable format
        const posts = homepageData.map(post => post.get({plain: true}));

        posts.forEach(post => {
            const date = new Date(post.createdAt).toLocaleDateString();
            post.createdAt = date
        });
        
        //render the page using handlebars
        res.render("homepage", {
            posts, 
            logged_in: req.session.logged_in
        })

    }catch(err){
        res.status(500).json(err);
    }
})

//handles looking at an individual post
router.get("/single/:id", async (req,res) => {
    try {
        if(!req.session.logged_in){
            res.redirect("/login");
            return;
        }
        //get the post data
        const postDataDb = await Post.findByPk(req.params.id,{
            attributes: ["id", "title","content", "createdAt"],
            include: {
                model: User,
                attributes: ["username"]
            },
        })
        //get the comments for the post
        const commentDataDb = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            attributes: ["id", "content", "createdAt"],
            include: {
                model: User,
                attributes: ["username"]
            }
        })

        //clean up our data
        const postData = await postDataDb.get({plain : true})
        postData.createdAt = new Date(postData.createdAt).toLocaleDateString();
        const commentData = await commentDataDb.map(comment => comment.get({plain: true}))
        //append the comments to the post
        postData.comments = commentData

        res.render("post", {
            postData,
            logged_in: req.session.logged_in
        })
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;