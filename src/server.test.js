const test = require('tape')
const nock = require('nock')
const {
  getRequest,
  postRequest
} = require('./handlers.js')

test('git request ', t => {
  nock('http://jsonplaceholder.typicode.com')
    .get('/users/1')
    .reply(200, {
      name: 'Leanne Graham'
    });

  getRequest(
    'http://jsonplaceholder.typicode.com/users/1',
    (error, response) => {

      t.error(error, 'No Error');

      t.equal(
        response.status,
        200,
        'the API should respond with a status code of 200'
      );

      t.deepEqual(
        response.data.name,
        'Leanne Graham',
        'the response body should contain the correct json'
      );

      t.end();

    }
  );
});


test('postRequest adds the new user correctly', t => {

  nock('http://jsonplaceholder.typicode.com')
    .post('/users')
    .reply(200, {
      success: true
    });

  postRequest(
    { firstName: 'Mario' },
    'http://jsonplaceholder.typicode.com/users',
    (error, response) => {

      t.error(error, 'No Error');

      t.equal(
        response.status,
        200,
        'the API should respond with a status code of 200'
      );

      t.deepEqual(
        response.data.success,
        true,
        'the response body should contain the correct json'
      );

      t.end();

    }
  );
});