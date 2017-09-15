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
          <input id="movie-filter-input" type="text" onChange={this.onFilterChange}/>
        </div>
        <div className="row">{this.renderMovies()}</div>
      </div>
    );
  }

  renderMovies() {
    if (this.state.movies.length > 0) {
      return this.state.movies.map((movieJSON, key) => {
        return (
          <div className="col-xl-6 col-md-12">
            <MovieItem key={key} movie={movieJSON} />
          </div>
        );
      });
    } else {
      return <h3>No movies found!</h3>;
    }
  }

  onFilterChange(event) {
      const name = event.target.value;
      console.log(name);
  }
}

export default MovieContainer;
