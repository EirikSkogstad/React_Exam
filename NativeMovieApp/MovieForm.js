import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  TextInput
} from 'react-native';

class MovieForm extends Component {
  constructor(submitHandler) {
    super(submitHandler);
    this.state = {
      maxYear: new Date().getFullYear().toString(),
      minYear: 1800 + '',
      title: '',
      year: new Date().getFullYear().toString(),
      description: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
          <View style={{padding: 10}}>
            <Text>New Movie:</Text>
            <Text>Title:</Text>
              <TextInput
                onChangeText={e => this.setState({title: e})}
                value={this.state.title}
                placeholder='title'
                type="text"
                name="title"
                id="titleInput"
                required
              />
            <Text >Year:</Text>
              <TextInput
                  editable={true}
                onChangeText={e => this.setState({year: e})}
                value={this.state.year}
                placeholder='year'
                type="number"
                name="year"
                min={this.state.minYear}
                max={this.state.maxYear}
                id="yearInput"
                required
              />
            <Text >Description:</Text>
              <TextInput
                  editable={true}
                onChangeText={e => this.setState({description: e})}
                value={this.state.description}
                placeholder='description'
                type="textbox"
                name="description"
                id="descriptionInput"
                required
              />
        <Button title='Submit' onPress={this.handleSubmit}/>
    </View>
    );
  }

  handleInputChange(e) {
    let value = e.target.value;
    const name = e.target.name;

    if (e.target.name === 'year') {
      value = parseInt(value, 10);
    }
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    if (this.isFormFilled()) {
      const movie = {
        title: this.state.title,
        year: this.state.year,
        description: this.state.description,
      };
      this.props.submitHandler(movie);
    } else {
      alert('Form is not filled properly out!');
    }

    this.resetForm();
  }

  isFormFilled() {
    if (this.state.title === '') {
      return false;
    }
    if (this.state.year === '') {
      return false;
    }
    return this.state.description !== '';
  }

  resetForm() {
    this.setState({
        title: '',
        year: new Date().getFullYear().toString(),
        description: '',
      });
  }
}

export default MovieForm;
