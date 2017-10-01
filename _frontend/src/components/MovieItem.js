import React, { Component } from 'react';
import './movie_item.css';

class MovieItem extends Component {
  constructor(movie, arrayIndex, deleteHandler) {
    super(movie, arrayIndex, deleteHandler);
    this.state = this.props.movie;
  }

  render() {
    return (
      <div className="movie-item-wrapper">
        <h1>{this.state.title}</h1>
        <h3>{this.state.year}</h3>
        <p>{this.state.description}</p>
        <button
          onClick={() =>
            this.props.deleteHandler(
              this.props.movie._id,
              this.props.arrayIndex
            )}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default MovieItem;
