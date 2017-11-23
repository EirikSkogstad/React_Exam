import React, { Component } from 'react';
import './public_movie_container.css';

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

    this.setupWebsocket();
  }

  setupWebsocket() {
    const wsUrl = 'ws://localhost:1234';
    const ws = new WebSocket(wsUrl);
    this.setState({ webSocket: ws });

    ws.onopen = () => {
      console.log('Connected!');
    };

    ws.onmessage = message => {
      const movie = message.data;
      console.log(movie);
      let json = JSON.parse(movie);

      this.setState((prevState, props) => {
        return { publicMovies: [...prevState.publicMovies, json] };
      });
    };
  }

  render() {
    return (
      <div className="container public-movie-wrapper">
        <div className="public-movie-item-header">
          <h1>Title:</h1>
          <h1>Year:</h1>
          <h1>Description:</h1>
          <h1>User:</h1>
        </div>
        {this.renderMovies()}
      </div>
    );
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
        <div key={key}>
          <div className="public-movie-item-wrapper">
            <h4>{movie.title}</h4>
            <h4>{movie.year}</h4>
            <h4>{movie.description}</h4>
            <h4>{movie.ownerUsername}</h4>
          </div>
        </div>
      );
    });
  }
}

export default PublicMovieContainer;
