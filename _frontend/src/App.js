import React, { Component } from 'react';
import './App.css';
import MovieContainer from './components/MovieContainer';
import MovieForm from './components/MovieForm';
import TitleContainer from './components/TitleContainer';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesUrl: 'http://localhost:1234/movies/',
      isUserLoggedIn: false,
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.submitMovie = this.submitMovie.bind(this);

    this.updateLoggedInState = this.updateLoggedInState.bind(this);
  }

  async componentWillMount() {
    await this.updateLoggedInState();
    await this.fetchMovies();
  }

  async fetchMovies() {
    if (this.state.isUserLoggedIn) {
      const res = await fetch(this.state.moviesUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          token: localStorage.token,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        alert(error);
        return;
      }

      const movies = await res.json();
      this.setState({ movies: movies });
    }
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return (
        <div className="app-container">
          <TitleContainer />
          <div className="container">
            <div className="row">
              <MovieForm submitHandler={this.submitMovie} />
              <MovieContainer
                movies={this.state.movies}
                deleteHandler={this.onDeleteClick}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <LoginForm submitHandler={this.updateLoggedInState} />;
    }
  }

  onDeleteClick(uniqueId, index) {
    fetch(`${this.state.moviesUrl + uniqueId}`, {
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

  submitMovie(movie) {
    fetch(this.state.moviesUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
      body: JSON.stringify({
        title: movie.title,
        year: movie.year,
        description: movie.description,
      }),
    })
      .then(res => res.json())
      .then(json => this.addToArray(json)) // Recently added movie needs to be added this way, so that _id exists in this.state.movies
      .catch(err => console.log(err));
  }

  updateLoggedInState() {
    if (localStorage.token !== undefined) {
      this.setState({ isUserLoggedIn: true });
    } else {
      this.setState({ isUserLoggedIn: false });
    }
    this.fetchMovies();
  }

  addToArray(movie) {
    let newArray = this.state.movies.slice();
    newArray.push(movie);
    this.setState({ movies: newArray });
  }
}

export default App;
