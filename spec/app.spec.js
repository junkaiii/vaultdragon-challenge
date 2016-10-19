var app = require('../app');
var supertest = require('supertest');
var should = require('chai').should();
var expect = require('chai').expect();


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var propType = ['animal', 'car', 'name'];
var property = ['cat', 'Vios', 'Kai'];
var obj = {};
var utc_number = randomInt(1476670462, 2147483647).toString();
var index_number = randomInt(0, property.length-1).toString();
var store_utc;

obj[propType[index_number]] = property[index_number];

describe("POST to /object endpoint", function() {
  it("returns object saved", function(done) {
    supertest(app)
      .post('/object')
      .send(obj)
      .expect(200)
      .end(function(err,res){
        console.log(res.body);
        console.log(propType[index_number]);
        res.body.should.have.property(propType[index_number]);
        store_utc = res.body.utc;
        done();
      });
  });
});

describe("GET /object endpoint", function() {
  it("returns object saved or cannot be found", function(done) {
    supertest(app)
      .post('/object')
      .send(obj)
      .expect(200)
      .end(function(){
        supertest(app)
          .get('/object/' + obj[propType[index_number]])
          .expect(200)
          .end(function(err, res){
            res.body.should.have.property(propType[index_number]);
            expect(res.body.utc > store_utc);
          });
      });
  });
});


// var checkProperty = function(res) {
//   res.body.name.should.equal("object", name_to_test);
// };
//
// describe('GET JSON data from params', function() {
//   it("returns the correct data", function(done) {
//     supertest(app)
//       .get('/object/' + name_to_test)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .expect(checkProperty)
//       .end(done);
//   });
// });

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
