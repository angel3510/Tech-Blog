const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

//define our associations

//User => Post
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Post.belongsTo(User, {
    foreignKey: "user_id"
})

//User => Comment
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

//Post => Comment
Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(Post, {
    foreignKey: "post_id"
})

module.exports = {User, Post, Comment}