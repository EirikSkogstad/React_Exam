import React, { Component } from 'react';
import './App.css';
import MovieContainer from './components/MovieContainer';
import PublicMovieContainer from './components/PublicMovieContainer';
import MovieForm from './components/MovieForm';
import TitleContainer from './components/TitleContainer';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      backendUrl: 'http://localhost:1234',
      isUserLoggedIn: false,
      isDisplayingPublicMovies: false,
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.changeMovieHandler = this.changeMovieHandler.bind(this);
    this.submitMovie = this.submitMovie.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.updateLoggedInState = this.updateLoggedInState.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  displayErrorIfApiNotOnline() {
    this.isApiOnline(this.state.backendUrl).then(isOnline => {
      if (!isOnline) {
        alert('Could not reach JSON api.');
      }
    });
  }

  async isApiOnline(apiUrl) {
    try {
      const result = await fetch(apiUrl);
      if (result === undefined) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async componentWillMount() {
    this.displayErrorIfApiNotOnline();
    const apiIsOnline = await this.isApiOnline(this.state.backendUrl);
    if (apiIsOnline) {
      await this.updateLoggedInState();
      await this.fetchMovies();
    }
  }

  async fetchMovies() {
    if (this.state.isUserLoggedIn) {
      const res = await fetch(this.state.backendUrl + /movies/, {
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
      if (this.state.isDisplayingPublicMovies) {
        return this.renderPublicMovies();
      } else {
        return this.renderMovies();
      }
    } else {
      return this.renderLoginForm();
    }
  }

  renderLoggedInInfo() {
    return (
      <div className="user-info-container">
        <button onClick={this.logoutHandler}>Logout</button>
        <p>Username: {localStorage.username}</p>
        {this.renderToggleLink()}
      </div>
    );
  }

  renderToggleLink() {
    return (
      <button
        onClick={() =>
          this.setState({
            isDisplayingPublicMovies: !this.state.isDisplayingPublicMovies,
          })}
      >
        {this.state.isDisplayingPublicMovies
          ? 'Show private movies'
          : 'Show inspirational movies'}
      </button>
    );
  }

  renderMovies() {
    return (
      <div className="app-container">
        {this.renderLoggedInInfo()}
        <TitleContainer />
        <div className="container">
          <div className="row">
            <MovieForm
              isApiOnline={this.isApiOnline}
              backendUrl={this.state.backendUrl}
              submitHandler={this.submitMovie}
            />
            <MovieContainer
              movies={this.state.movies}
              deleteHandler={this.deleteHandler}
              changeMovieHandler={this.changeMovieHandler}
            />
          </div>
        </div>
      </div>
    );
  }

  renderPublicMovies() {
    return (
      <div className="app-container">
        {this.renderLoggedInInfo()}
        <TitleContainer />
        <div className="container">
          <PublicMovieContainer backendUrl={this.state.backendUrl} />
        </div>
      </div>
    );
  }

  renderLoginForm() {
    return (
      <LoginForm
        isApiOnline={this.isApiOnline}
        backendUrl={this.state.backendUrl}
        setUsernameHandler={this.setUsername}
        submitHandler={this.updateLoggedInState}
      />
    );
  }

  deleteHandler(uniqueId, index) {
    this.isApiOnline(this.state.backendUrl).then(isOnline => {
      if (!isOnline) {
        alert('Cannot contact JSON api, therefore cannot delete.');
        return;
      }
      fetch(`${this.state.backendUrl}/movies/${uniqueId}`, {
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
    });
  }

  async changeMovieHandler(movie) {
    const id = movie._id;

    let newArray = this.state.movies.slice();
    const index = newArray.findIndex(e => e._id === id);

    if (index === -1) {
      return;
    }

    let tempElement = newArray[index];
    tempElement.isPublic = !tempElement.isPublic;

    const res = await fetch(`${this.state.backendUrl}/movies/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
      body: JSON.stringify({
        title: tempElement.title,
        year: tempElement.year,
        description: tempElement.description,
        isPublic: tempElement.isPublic,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      alert(error);
      return;
    }

    newArray[index] = tempElement;
    this.setState({ movies: newArray });
  }

  async submitMovie(movie) {
    const res = await fetch(`${this.state.backendUrl}/movies/`, {
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
    });

    if (!res.ok) {
      const error = await res.text();
      alert(error);
      return;
    }

    const json = await res.json();
    this.addToArray(json);
  }

  updateLoggedInState() {
    if (localStorage.token !== undefined) {
      this.setState({ isUserLoggedIn: true });
    } else {
      this.setState({ isUserLoggedIn: false });
    }
    this.fetchMovies();
  }

  logoutHandler() {
    localStorage.removeItem('token');

    localStorage.removeItem('username');
    this.setState({
      isUserLoggedIn: false,
    });
  }

  setUsername(newUsername) {
    if (newUsername === null || newUsername === undefined) {
      alert('Cannot set username to empty value!');
      return;
    }
    localStorage.username = newUsername;
  }

  addToArray(movie) {
    let newArray = this.state.movies.slice();
    newArray.push(movie);
    this.setState({ movies: newArray });
  }
}

export default App;
