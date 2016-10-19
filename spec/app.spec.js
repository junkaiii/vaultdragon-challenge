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
var index_number = randomInt(0, property.length - 1).toString();
var store_utc,
  store_utc2;

obj[propType[index_number]] = property[index_number];

describe("POST to /object endpoint", function() {
  it("returns object saved", function(done) {
    supertest(app)
      .post('/object')
      .send(obj)
      .expect(200)
      .end(function(err, res) {
        // console.log(res.body);
        // console.log(propType[index_number]);
        res.body.should.have.property(propType[index_number]);
        store_utc = res.body.utc;
        done();
      });
  });
});

describe("GET /object without timestamp", function() {
  it("returns the latest found object", function(done) {
    supertest(app)
      .post('/object')
      .send(obj)
      .expect(200)
      .end(function() {
        supertest(app)
          .get('/object/' + obj[propType[index_number]])
          .expect(200)
          .end(function(err, res) {
            res.body.should.have.property(propType[index_number]);
            expect(res.body.utc > store_utc).to.be.ok;
            //latest utc number generated from second post
            store_utc2 = res.body.utc;
            done();
          });
        done();
      });
  });
});

// describe("GET /object with timestamp minus one comapred to last posted object", function() {
//   it("returns the object before the last posted object", function(done) {
//     //test exact timestamp minus 1
//     supertest(app)
//       .get('/object/' + obj[propType[index_number]] + '?timestamp=' + (store_utc2 - 1))
//       .expect(200)
//       .end(function(err, res) {
//         //responds with the object created with the first post - timestamp cannot be found and therefore show the previous one
//         expect(store_utc == res.body.utc).to.be.ok;
//         done();
//       });
//   });
// });
//
//
// describe("GET /object with timestamp similar to last posted object", function() {
//   it("returns the last posted object", function(done) {
//     //test exact timestamp
//     supertest(app)
//       .get('/object/' + obj[propType[index_number]] + '?timestamp=' + store_utc2)
//       .expect(200)
//       .end(function(err, res) {
//         //responds with the same object because timestamp can be found
//         expect(store_utc2 == res.body.utc).to.be.ok;
//         done();
//       });
//   });
// });
