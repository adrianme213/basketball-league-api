const http = require('http');
const assert = require('assert');
const path = require('path');


describe('Express Server', () => {
  it('should return 200', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return 404', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}/gibberish`, res => {
      assert.equal(404, res.statusCode);
      done();
    });
  });

});
