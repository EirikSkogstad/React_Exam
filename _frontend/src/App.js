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
      restUrl: 'http://localhost:1234/movies',
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.submitMovie = this.submitMovie.bind(this);
  }

  componentWillMount() {
    fetch(this.state.restUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data });
      });
  }

  render() {
    if (this.isUserLoggedIn()) {
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
      return <LoginForm />;
    }
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

  submitMovie(movie) {
    fetch('http://localhost:1234/movies', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

  isUserLoggedIn() {
    return localStorage.token !== undefined;
  }

  addToArray(movie) {
    let newArray = this.state.movies.slice();
    newArray.push(movie);
    this.setState({ movies: newArray });
  }
}

export default App;
