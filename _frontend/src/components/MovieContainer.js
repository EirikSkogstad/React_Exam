import React, { Component } from 'react';
import './movie_container.css';

class MovieContainer extends Component {
  constructor(displayPublicMovies, movies, deleteHandler, changeMovieHandler) {
    super(displayPublicMovies, movies, deleteHandler, changeMovieHandler);
    this.state = {
      movieFilter: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    return (
      <div className="col-xs-12 col-lg-8">
        <div className="movie-container-wrapper">
          <h2 className="header-underline">Movies:</h2>
          <div className="movie-filter-wrapper">
            <label htmlFor="movie-filter-input">Filter:</label>
            <input
              id="movie-filter-input"
              type="text"
              onChange={this.onFilterChange}
            />
          </div>
          <div className="row">{this.renderMovies()}</div>
        </div>
      </div>
    );
  }

  renderMovies() {
    const movieFilter = this.state.movieFilter;
    let matchingMovies = this.props.movies;
    if (movieFilter !== '') {
      matchingMovies = this.filterMovies(movieFilter);
    }

    if (matchingMovies.length === 0) {
      return (
        <div className="col-12">
          <h3>Could not find any movies..</h3>
        </div>
      );
    }

    return matchingMovies.map((movie, key) => {
      return (
        <div key={key} className="col-md-6 col-xs-12">
          <div className="movie-item-wrapper">
            <h1>{movie.title}</h1>
            <h3>{movie.year}</h3>
            <p>{movie.description}</p>
            <label htmlFor="isPublicInput">
              Is public?
              <input
                id="isPublicInput"
                type="checkbox"
                checked={movie.isPublic}
                onChange={() => this.props.changeMovieHandler(movie)}
              />
            </label>
            <button onClick={() => this.props.deleteHandler(movie._id, key)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  filterMovies(movieFilter) {
    return this.props.movies.filter(movie => {
      const searchString = movieFilter.toLowerCase();
      const title = movie.title.toLowerCase();

      return title.includes(searchString);
    });
  }

  onFilterChange(e) {
    this.setState({ movieFilter: e.target.value });
    this.renderMovies();
  }
}

export default MovieContainer;
