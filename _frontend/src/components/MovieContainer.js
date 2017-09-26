import React, { Component } from 'react';
import './movie_container.css';

class MovieContainer extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      restUrl: 'http://localhost:1234/movies',
      movieFilter: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillMount() {
    fetch(this.state.restUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data });
      });
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
    let matchingMovies = this.state.movies;
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
        <div className="col-md-6 col-xs-12">
          <div className="movie-item-wrapper" key={key}>
            <h1>{movie.title}</h1>
            <h3>{movie.year}</h3>
            <p>{movie.description}</p>
            <button onClick={() => this.onDeleteClick(movie._id, key)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  filterMovies(movieFilter) {
    return this.state.movies.filter(movie => {
      const searchString = movieFilter.toLowerCase();
      const title = movie.title.toLowerCase();

      //FIXME bug somewhere here,
      // displays items that doesnt match search, instead of those that do.
      return title.includes(searchString);
    });
  }

  onFilterChange(event) {
    this.setState({ movieFilter: event.target.value });
    this.renderMovies();
  }

  onDeleteClick(uniqueId, index) {
    fetch(`http://localhost:1234/movies/${uniqueId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));

    // Update local array
    let newMovies = this.state.movies.slice();
    newMovies.splice(index, 1);
    this.setState({
      movies: newMovies,
    });
  }
}

export default MovieContainer;
