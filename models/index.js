const User = require("./User");
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User);

module.exports = { User, BlogPost };