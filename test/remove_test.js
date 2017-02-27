const assert = require('assert');
const User = require('../src/user');

describe('deleting users from the DB', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    // joe instance
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Class-based, User, often used when removing a bunch of records w/criteria
    User.remove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class method findOneAndRemove', (done) => {
  // Class-based, User
    User.findOneAndRemove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class method findByIdAndRemove', (done) => {
   // Class-based, User
   User.findByIdAndRemove(joe._id)
   .then(() => User.findOne({ name: 'Joe' }))
   .then((user) => {
     assert(user === null);
     done();
   });
  });
});
