// Imports:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const app = express();

const jwtSecret = 'aiosdjoasdjoaisjd12930u1203j';
const serverPort = 1234;
const host = process.env.DOCKER_DB || 'localhost';
const dbName = 'movies';

const MIN_PASSWORD_LENGTH = 4;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(`mongodb://${host}/${dbName}`, {
  useMongoClient: true,
});

const movieSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  year: {type: Number, required: true, min: 1800},
  description: {type: String, required: true},
  isPublic: {type: Boolean, required: true},
  userId: {type: String, required: true},
});

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, minlength: MIN_PASSWORD_LENGTH, required: true},
});

const MovieModel = mongoose.model('Movie', movieSchema);
const UserModel = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/movies', (req, res) => {
  if (sendErrorIfTokenIsNotPresent(req, res)) {
    return;
  }

  const token = req.header('token');
  const username = jwt.decode(token, jwtSecret);

  console.log(username);
  UserModel.findOne({username: username}, function(err, result) {
    if (err) {
      console.log(err);

      res.status(500).
          send('Reading from database went wrong... (please send help)');
      return;
    }
    if (!result) {
      res.status(404).send('User of this token no longer exists in database');
      return;
    }

    MovieModel.find({userId: result._id}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.post('/movies', (req, res) => {
  if (sendErrorIfTokenIsNotPresent(req, res)) {
    return;
  }
  const token = req.header('token');
  const username = jwt.decode(token, jwtSecret);
  const body = req.body;

  MovieModel.findOne({title: body.title}, function(err, result) {
    if (err) {
      res.status(500).
          send('Reading from database went wrong... (please send help)');
      console.log('Could not read from db');
      return;
    }
    if (result) {
      res.status(400).send('Movie already exists, duplicates are not allowed');
      return;
    }

    UserModel.findOne({username: username}, function(err, result) {
      if (err) {
        res.status(500).
            send('Reading from database went wrong... (please send help)');
        console.log('Could not read from db');
        return;
      }
      if (!result) {
        res.status(404).send('User of this token no longer exists in database');
        console.log('Could not find token user');
        return;
      }

      body.userId = result._id;
      movie = new MovieModel(body);
      movie.isPublic = false;

      movie.save((err, movie) => {
        if (err) {
          res.send(err);
          console.log('Could not save movie');
        } else {
          res.status(201).send(movie);
        }
      });
    });
  });
});

app.put('/movies/:id', (req, res) => {
  const id = req.params['id'];
  const body = req.body;

  if (sendErrorIfMovieIsInvalid(body, res)) {
    return;
  }

  if (id) {

    MovieModel.findById(id, (err, movie) => {
      if (err) {
        res.status(400).send(err);
        return;
      }

      movie.title = body.title;
      movie.year = body.year;
      movie.description = body.description;
      movie.isPublic = body.isPublic;

      console.log(movie);
      movie.save((saveErr, savedMovie) => {
        if(saveErr) {
          console.log(saveErr);
          res.status(400).send(saveErr);

          return;
        }

        console.log(movie);
        res.status(200).send(savedMovie);
      });


    });
  } else {
    res.status(400).send('Must contain id');
  }
});

app.delete('/movies/:id', (req, res) => {
  const id = req.params['id'];
  if (id) {
    MovieModel.remove({_id: id}, err => {
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

app.post('/users', (req, res) => {
  let body = req.body;

  if (sendResponseIfInputInvalid(body, res)) {
    return;
  }

  UserModel.findOne({username: body.username}, function(err, result) {
    if (err) {
      res.status(500).
          send('Reading from database went wrong... (please send help)');
      return;
    }
    if (result) {
      res.status(401).send('Username is already taken');
      return;
    }

    bcrypt.hash(body.password, 10, function(hashErr, hash) {
      if (hashErr) {
        res.send(hashErr);
        return;
      }

      body.password = hash;

      const user = new UserModel(body);
      user.save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(400).send(saveErr);
          return;
        }

        const token = jwt.encode(user.username, jwtSecret);
        res.status(201).send(token);
      });
    });
  });
});

app.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (sendResponseIfInputInvalid(req.body, res)) {
    return;
  }

  UserModel.findOne({username: username}, function(err, result) {
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

    const token = jwt.encode(username, jwtSecret);

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
    res.status(400).
        send(`Password must be longer than ${MIN_PASSWORD_LENGTH}`);
    return true;
  }

  if (user.movies !== undefined) {
    res.status(400).send('User cannot be created with existing movies.');
    return true;
  }
  return false;
}

function sendErrorIfMovieIsInvalid(movie, res) {
  if (
      movie.title === undefined ||
      movie.year === undefined ||
      movie.description === undefined ||
      movie.isPublic === undefined
  ) {
    res.status(400).send('Cannot create movie with missing fields');
    return true;
  }

  if(movie._id !== undefined) {
    res.status(400).send('Cannot change _id of movie!');
    return true;
  }

  if(movie.userId !== undefined) {
    res.status(400).send('Cannot change owner/userId of movie using this method!');
    return true;
  }

  return false;
}

function sendErrorIfTokenIsNotPresent(req, res) {
  if (req.header('token') === null || req.header('token') === '') {
    res.status(401).send('Token is missing!');
    return true;
  }

  return false;
}
