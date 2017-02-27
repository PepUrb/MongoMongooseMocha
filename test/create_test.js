const assert = require('assert');
const User = require('../src/user');  //Inclede to test User model  "U" to represent class


describe('Creating records', () => {
  it('saves a user', (done) => {
    //assert(1+1 === 2);
    const joe = new User({ name: 'Joe' });  //creates a new model, but not saved to db, "U" to represent class
    joe.save()       //saved to db
      .then(() => {
        //Has Joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
});
