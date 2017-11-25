const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');

const server = require('../server');
const app = express();

const testUserJson = {
  username: 'Username',
  password: 'password',
};
const testMovieJson = {
  title: 'A vampire cat on new adventures',
  year: '1997',
  description:
    'Which daring adventure will the Vampire-cat known as "Litten"  undertake this time?  (http://slides.com/theneva/pg6300-17-03-full-stack#/7/3)',
  isPublic: false,
  ownerUsername: testUserJson.username,
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

    const loginRes = await request(app)
      .post('/authenticate')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testUserJson)
      .expect(200);

    const loginToken = await createRes.text;
    cleanDatabase();
    return expect(loginToken).toBe(createToken);
  });

  it('Should not be able to create movies without authentication', () => {
    return request(app)
      .post('/movies')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testMovieJson)
      .expect(401);
  });

  it('Should create movie with authentication', async () => {
    cleanDatabase();
    const userRes = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testUserJson)
      .expect(201);
    const userToken = await userRes.text;

    const createMovieRes = await request(app)
      .post('/movies')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('token', userToken)
      .send(testMovieJson)
      .expect(201);
    const result = await createMovieRes.text;

    expect(result).not.toBeNull();
    const getMovieRes = await request(app)
      .get('/movies')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('token', userToken)
      .expect(200);
    cleanDatabase();

    let movieResults = await getMovieRes.text;
    movieResults = JSON.parse(movieResults);

    expect(movieResults[0].username).toEqual(testMovieJson.username);
    expect(movieResults[0].year.toString()).toEqual(testMovieJson.year);
    expect(movieResults[0].description).toEqual(testMovieJson.description);
    return expect(movieResults[0].ownerUsername).toEqual(
      testMovieJson.ownerUsername
    );
  });
});

function cleanDatabase() {
  return mongoose.connection.db.dropDatabase();
}
