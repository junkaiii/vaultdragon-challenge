var frisby = require('frisby');

function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}

var name_to_test = 'john';
var utc_number = randomInt(1476670462, 2147483647).toString();

frisby.create('POST to /object endpoint')
.post('/object/',
  { data: 'abc', obj: 'john' },
  {json: true}
  )
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss();

frisby.create('GET JSON data from params')
  .get('/object/' + name_to_test)
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .expectJSON('?',{
    object: name_to_test
  })
  .expectJSONTypes('?',{
    object: String,
    utc: Number,
    data: String
  })
.toss();

frisby.create('GET JSON data from query')
  .get('/object/' + name_to_test + '?timestamp=' + utc_number)
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .expectJSON('?',{
    object: name_to_test
    })
.toss();
