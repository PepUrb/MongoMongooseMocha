//Maps Mongo and Mongoose together
const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true,  'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});
// Virtual field
UserSchema.virtual('postCount').get(function() {  // es6 getter - allows use of 'this' only here
// console.log('Hi!');
  return this.posts.length;
});


UserSchema.pre('save', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // is basically like:  this === joe

  //async

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});


const User = mongoose.model('user', UserSchema);

//"User class"/"User model" used interchangably

module.exports = User;
