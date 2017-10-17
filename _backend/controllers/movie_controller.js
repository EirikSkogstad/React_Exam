module.exports = {
  getMovies: (req, res) => {
    MovieModel.find((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },

  postMovie: (req, res) => {
    const body = req.body;
    const movie = new MovieModel(body);

    movie.save((err, savedMovie) => {
      if (err) {
        res.send(err);
      } else {
        res.send(savedMovie);
      }
    });
  },

  deleteMovie: (req, res) => {
    const id = req.param('id');
    if (id) {
      MovieModel.remove({_id: id}, err => {
        if (err) {
          res.send(err);
        } else {
          console.log('Deleted movie with id: ' + id);
        }
      });
    }
  },
};