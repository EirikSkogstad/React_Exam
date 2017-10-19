// Imports:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const app = express();
const router = express.Router();

const jwtSecret = 'aiosdjoasdjoaisjd12930u1203j';
const serverPort = 1234;
const dbName = 'movies';

const MIN_PASSWORD_LENGTH = 4;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(`mongodb://localhost/${dbName}/`);

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true, min: 1800 },
  description: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, minlength: MIN_PASSWORD_LENGTH, required: true },
  privateMovies: { type: [movieSchema], required: false },
});

const MovieModel = mongoose.model('Movie', movieSchema);
const UserModel = mongoose.model('User', userSchema);

app.get('/movies', (req, res) => {
  MovieModel.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/movies', (req, res) => {
  const body = req.body;
  const movie = new MovieModel(body);

  movie.save((err, savedMovie) => {
    if (err) {
      res.send(err);
    } else {
      res.send(savedMovie);
    }
  });
});

app.delete('/movies/:id', (req, res) => {
  const id = req.param('id');
  if (id) {
    MovieModel.remove({ _id: id }, err => {
      if (err) {
        res.send(err);
      } else {
        console.log('Deleted movie with id: ' + id);
      }
    });
  } else {
    res.status(400).send('Must contain id');
  }
});

// TODO unsure about path, user?? Usermovies?
app.get('/private_movies', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send('Token is missing!');
    return;
  }
});

app.post('/users', (req, res) => {
  const input = req.body;
  if (sendResponseIfInputInvalid(input, res)) {
    return;
  }

  bcrypt.hash(req.username, 10, function(err, hash) {
    const user = new UserModel(input.username, hash);

    if (err) {
      res.send(err);
      return;
    }

    user.save((err, savedUser) => {
      if (err) {
        res.send(err);
      }
      res.status(201).send('User successfully created');
    });
  });
});

app.get('/users', (req, res) => {
  UserModel.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/login', (req, res) => {});

app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));

/**
 *
 * @param user
 * @param res
 * @returns {boolean} True if input is invalid.
 */
function sendResponseIfInputInvalid(user, res) {
  if (!user.username) {
    res.send(400).send('Username must be present');
    return true;
  }

  if (!user.password) {
    res.status(400).send('Password cannot be empty');
    return true;
  }

  if (user.password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).send(`Password must be longer than ${MIN_PASSWORD_LENGTH}`);
    return true;
  }

  return false;
}
