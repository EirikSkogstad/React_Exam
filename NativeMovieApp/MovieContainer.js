import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

class MovieContainer extends Component {
  constructor(movies, deleteHandler) {
    super(movies, deleteHandler);
    this.state = {
      movieFilter: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    return (
      <View >
        <View >
          <Text >Movies:</Text>
          </View>
          <View >{this.renderMovies()}</View>
        </View>
    );
  }

  renderMovies() {
    const movieFilter = this.state.movieFilter;
    let matchingMovies = this.props.movies;
    const containerStyle = {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
    };
    if (movieFilter !== '') {
      matchingMovies = this.filterMovies(movieFilter);
    }

    if (matchingMovies.length === 0) {
      return (
        <View >
          <Text>Could not find any movies..</Text>
        </View>
      );
    }

    return matchingMovies.map((movie, key) => {
      return (
        <View style={containerStyle} key={key}>
          <View >
            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
            <Text>{movie.description}</Text>
            <Button title='Delete' onPress={() => this.props.deleteHandler(movie._id, key)}/>
          </View>
        </View>
      );
    });
  }

  filterMovies(movieFilter) {
    return this.props.movies.filter(movie => {
      const searchString = movieFilter.toLowerCase();
      const title = movie.title.toLowerCase();

      return title.includes(searchString);
    });
  }

  onFilterChange(e) {
    this.setState({ movieFilter: e.target.value });
    this.renderMovies();
  }
}

export default MovieContainer;
