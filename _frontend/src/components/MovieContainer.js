import React, { Component } from "react";
import "./movie_container.css";
import MovieItem from "./MovieItem";

class MovieContainer extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      restUrl: "http://localhost:9000/movies"
    };
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
        {this.renderMovies()}
      </div>
    );
  }

  renderMovies() {
    if (this.state.movies.length > 0) {
      console.log(this.state.movies);
      return this.state.movies.map(movieJSON => {
        return (
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <MovieItem movie={movieJSON} />
            </div>
          </div>
        );
      });
    } else {
      return <h3>No movies found!</h3>;
    }
  }
}

export default MovieContainer;
