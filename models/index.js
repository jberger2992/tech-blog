const User = require("./user");
const BlogPost = require('./blogpost');

User.hasMany(BlogPost, {
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User);

module.exports = { User, BlogPost };