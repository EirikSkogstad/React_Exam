const request = require('supertest');
const express = require('express');

const server = require('../server');

const app = express();
app.use(server);

describe('Movies', () => {
  it('Api should be available', () => {
    return request(app)
      .get('http://localhost:1234/')
      .expect(200);
  });
});
