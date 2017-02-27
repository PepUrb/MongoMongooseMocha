const assert = require('assert');
const User = require('../src/user');

describe('Updating records from the DB', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
    .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  }

  it('model instance type using set and save', (done) => {
    joe.set('name', 'Alex');  //only in memory
    joe.save()
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  });

  it('model instance type using set and save and helper fxn', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('model instance can update (with helper fxn)', (done) => {
       assertName(joe.update({ name: 'Alex' }), done);  //bulk update
    });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it('A user can increment their likes by 12', (done) => {
    User.update({ name: 'Joe' }, { $inc: {likes: 12 } })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.likes === 12);
      done();
    });
  });
});
