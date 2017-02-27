const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  //mongoose.connect('mongodb://65.54.6.46:4000/users_test');
  mongoose.connect('mongodb://localhost/users_test');   //creates a new db called users_test
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
  });
});

//hook
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;  //all of collection must be lower-case
  //mongoose.connection.collections.users.drop(() => {
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
