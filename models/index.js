const User = require('./User');
const Bike = require('./Bike');
const Like = require('./Like');
const Dislike = require('./Dislike');
const Comment = require('./Comment');
const Photo = require('./Photo');

User.hasMany(Bike);
Bike.belongsTo(User);

User.hasMany(Photo);
Photo.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Dislike);
Dislike.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Bike.hasMany(Photo);
Photo.belongsTo(Bike);

Bike.hasMany(Like);
Like.belongsTo(Bike);

Bike.hasMany(Dislike);
Dislike.belongsTo(Bike);

Bike.hasMany(Comment);
Comment.belongsTo(Bike);

module.exports = { User, Bike, Photo, Like, Dislike, Comment };

