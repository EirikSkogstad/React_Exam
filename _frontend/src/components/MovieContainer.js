import React, { Component } from "react";
import "./movie_container.css";
import MovieItem from "./MovieItem";

class MovieContainer extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      restUrl: "http://localhost:1234/movies",
      movieFilter: ""
    };

    this.onFilterChange = this.onFilterChange.bind(this);
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
      <div className="movie-container-wrapper container">
        <div className="movie-filter-wrapper">
          <label for="movie-filter-input">Filter:</label>
          <input
            id="movie-filter-input"
            type="text"
            onChange={this.onFilterChange}
          />
        </div>
        <div className="row">{this.renderMovies()}</div>
      </div>
    );
  }

  renderMovies() {
    const movieFilter = this.state.movieFilter;

    if (movieFilter === "") {
      return this.state.movies.map((movieJSON, key) => {
        return (
          <div className="col-xl-6 col-md-12">
            <MovieItem key={key} movie={movieJSON} />
          </div>
        );
      });
    } else {
      return this.state.movies
        .filter(movie => {
          const searchString = movieFilter.toLowerCase();
          const title = movie.title.toLowerCase();

          //FIXME bug somewhere here, displays items that doesnt match search, instead of those that do.
          return title.includes(searchString);
        })
        .map((movieJSON, key) => {
          return (
            <div className="col-xl-6 col-md-12">
              <MovieItem key={key} movie={movieJSON} />
            </div>
          );
        });
    }
  }

  onFilterChange(event) {
    this.setState({ movieFilter: event.target.value });
    this.renderMovies();
  }
}

export default MovieContainer;
