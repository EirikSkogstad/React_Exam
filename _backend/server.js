// Imports:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jwt-simple');
const bcryptjs = require('bcryptjs');

const app = express();
const router = express.Router();

const serverPort = 1234;
const dbName = 'movies';

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(`mongodb://localhost/${dbName}/`);

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true, min: 1800 },
  description: { type: String, required: true },
});
const MovieModel = mongoose.model('Movie', movieSchema);

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
  }
});

app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));
