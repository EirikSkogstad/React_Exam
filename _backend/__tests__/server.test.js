const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');

const server = require('../server');
const app = express();

const testUserJson = {
  username: 'Username',
  password: 'password',
};

app.use(server);
describe('Movies', () => {
  it('Api should be available', () => {
    return request(app)
      .get('/')
      .expect(200);
  });

  it('Should create new user and login', async () => {
    cleanDatabase();

    const createRes = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testUserJson)
      .expect(201);

    const createToken = await createRes.text;
    expect(createToken).not.toBeNull();

    const loginRes =  await request(app)
    .post('/authenticate')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(testUserJson)
    .expect(200);

    const loginToken = await createRes.text;

    cleanDatabase();
    return expect(loginToken).toBe(createToken);

  });
});

function cleanDatabase() {
  return mongoose.connection.db.dropDatabase();
}
