const http = require('http');
const assert = require('assert');
const path = require('path');

let server;
describe('Express Server', () => {
  beforeEach(function() {
    server = require('../src/index.ts');
  });
  afterEach( done => {
    server.close(() => {
      delete require.cache[require.resolve( '../src/index.ts' )]
      done();
    });
  });

  it('should return 200', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}`, res => {
      assert.strictEqual(200, res.statusCode);
      done();
    });
  });

  it('Should return 404', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}/gibberish`, res => {
      assert.strictEqual(404, res.statusCode);
      done();
    });
  });
});

describe('DB Routes and DB Controllers', () => {
  beforeEach(function() {
    server = require('../src/index.ts');
  });
  afterEach( done => {
    server.close(() => {
      delete require.cache[require.resolve( '../src/index.ts' )]
      done();
    })
  });

  it('should return 200 for returning all seasons as an array', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}/api/seasons`, res => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          assert.strictEqual(200, res.statusCode);
          assert.strictEqual(true, Array.isArray(parsedData));
          done();
        } catch (e) {
          console.error('Test error: ', e.message);
          done(e);
        }
      });
    }).on('error', (e) => {
      console.error(`Ending error: ${e.message}`);
      done(e);
    });
  });

  it('should return season with 200 for specific season search', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}/api/one-season?monthYearStartDate=01/2017`, res => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          assert.strictEqual(200, res.statusCode);
          assert.deepEqual([{monthYearStartDate: '01/2017'}], parsedData);
          done();
        } catch (e) {
          console.error('Test error: ', e.message);
          done(e)
        }
      });
    }).on('error', (e) => {
      console.error(`Ending error: ${e.message}`);
      done(e);
    });
  });

  it('should return helpful message with 400 for wrong season format', done => {
    http.get(`http://127.0.0.1:${process.env.PORT}/api/one-season?monthYearStartDate=ab/cdef`, res => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          assert.strictEqual(400, res.statusCode);
          assert.strictEqual('Season format wrong. Must be \'00/0000\'. Try again.', parsedData);
          done();
        } catch (e) {
          console.error('Test error: ', e.message);
          done(e)
        }
      });
    }).on('error', (e) => {
      console.error(`Ending error: ${e.message}`);
      done(e);
    });
  });
  // INSTALL AXIOS TO TEST A POST ROUTE?
});
