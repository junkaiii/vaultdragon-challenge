var app = require('../app');
var supertest = require('supertest');

function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}

var name_to_test = 'john';
var utc_number = randomInt(1476670462, 2147483647).toString();

describe("POST to /object endpoint", function() {
  it("returns object saved", function(done) {
    supertest(app)
      .post('/object')
      .send({  data: "def",
               object: "john"
             })
      .expect(200,{
        message: 'object saved!'
      }, done);
  });
});

var checkProperty = function(res) {
  res.body.name.should.equal("object", name_to_test);
};

describe('GET JSON data from params', function() {
  it("returns the correct data", function(done) {
    supertest(app)
      .get('/object/' + name_to_test)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(checkProperty)
      .end(done);
  });
});

//
//
//
// describe('GET JSON data from query', function() {
//   it("returns the correct data", function(done) {
//     supertest(app)
//       .get('/object/' + name_to_test + '?timestamp=' + utc_number)
//       .expect('Content-Type', /json/)
//       .expect(200, res.body.should.have.property("object", name_to_test), done);
//   });
// });
