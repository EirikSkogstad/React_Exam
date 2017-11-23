import React, { Component } from 'react';

class PublicMovieContainer extends Component {
  constructor(backendUrl) {
    super(backendUrl);
    this.state = {
      publicMovies: [],
    };
  }

  async componentWillMount() {
    const res = await fetch(`${this.props.backendUrl}/movies?public=true`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.log(err);
      alert(err);
      return;
    }

    const movies = await res.json();
    this.setState({ publicMovies: movies });
  }

  render() {
    return <div className="container">{this.renderMovies()}</div>;
  }

  renderMovies() {
    if (this.state.publicMovies.length === 0) {
      return (
        <div className="col-12">
          <h3>Could not find any movies..</h3>
        </div>
      );
    }

    return this.state.publicMovies.map((movie, key) => {
      return (
        <div key={key} className="col-md-6 col-xs-12">
          <div className="movie-item-wrapper">
            <h1>{movie.title}</h1>
            <h3>{movie.year}</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      );
    });
  }
}

export default PublicMovieContainer;
