/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MovieContainer from './MovieContainer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesUrl: 'http://10.0.2.2:1234/movies/',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImJvYiI.52yrd_lodFvxSBKVbxdU57Sw-I_OXjaTDSONmNiAlmc'
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.submitMovie = this.submitMovie.bind(this);
  }

  async componentWillMount() {
    await this.fetchMovies();
  }

  async fetchMovies() {
      const res = await fetch(this.state.moviesUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          token: this.state.token,
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

  render() {
    return (
      <View style={styles.container}>
        <MovieContainer movies={this.state.movies} deleteHandler={this.onDeleteClick}/>
      </View>
    );
  }

  onDeleteClick(uniqueId, index) {
    fetch(this.state.moviesUrl + uniqueId, {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
