// Imports:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const app = express();

const jwtSecret = 'aiosdjoasdjoaisjd12930u1203j';
const serverPort = 1234;
const dbName = 'movies';

const MIN_PASSWORD_LENGTH = 4;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useMongoClient: true,
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true, min: 1800 },
  description: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, minlength: MIN_PASSWORD_LENGTH, required: true },
  privateMovies: [movieSchema],
});
userSchema.plugin(uniqueValidator);

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
  const id = req.params['id'];
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

app.get('/users/:id/movies', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send('Token is missing!');
    return;
  }
});

app.post('/users', (req, res) => {
  let input = req.body;

  if (sendResponseIfInputInvalid(input, res)) {
    return;
  }

  UserModel.findOne({ username: input.username }, function(err, result) {
    if (err) {
      res
        .status(500)
        .send('Reading from database went wrong... (please send help)');
      return;
    }
    if (result) {
      console.log(result);
      res.status(401).send('Username is already taken');
      return;
    }

    bcrypt.hash(input.password, 10, function(hashErr, hash) {
      if (hashErr) {
        res.send(hashErr);
        return;
      }

      input.password = hash;

      const user = new UserModel(input);
      user.save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(400).send(saveErr);
          return;
        }
        res.status(201).send('User successfully created');
      });
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

app.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (sendResponseIfInputInvalid(req.body, res)) {
    return;
  }

  UserModel.findOne({ username: username }, function(err, result) {
    if (err) {
      res.status(500).send('Could not read users from database');
      return;
    }
    if (!result) {
      res.status(401).send('No user by that username.');
      return;
    }

    const passwordMatches = bcrypt.compareSync(password, result.password);
    if (!passwordMatches) {
      res.status(401).send('wrong password');
      return;
    }

    const token = jwt.encode(
      {
        username,
      },
      jwtSecret
    );

    res.status(201).send(token);
  });
});

app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));

/**
 *
 * @param user
 * @param res
 * @returns {boolean} True if input is invalid.
 */
function sendResponseIfInputInvalid(user, res) {
  if (!user.username) {
    res.status(400).send('Username must be present');
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

  if (user.movies !== undefined) {
    res.status(400).send('User cannot be created with existing movies.');
    return true;
  }

  return false;
}
