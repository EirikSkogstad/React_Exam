import React, { Component } from 'react';
import './movie_form.css';

class MovieForm extends Component {
  constructor(isApiOnline, backendUrl, submitHandler) {
    super(isApiOnline, backendUrl, submitHandler);
    this.state = {
      maxYear: new Date().getFullYear(),
      minYear: 1800,
      title: '',
      year: new Date().getFullYear(),
      description: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="col-xs-12 col-lg-4">
        <div className="movie-form-wrapper">
          <h2 className="header-underline">New Movie:</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="titleInput">
              Title:
              <input
                onChange={this.handleInputChange}
                value={this.state.title}
                type="text"
                name="title"
                id="titleInput"
                required
              />
            </label>
            <label htmlFor="yearInput">
              Year:
              <input
                onChange={this.handleInputChange}
                value={this.state.year}
                type="number"
                name="year"
                min={this.state.minYear}
                max={this.state.maxYear}
                id="yearInput"
                required
              />
            </label>
            <label htmlFor="descriptionInput">
              Description:
              <textarea
                onChange={this.handleInputChange}
                value={this.state.description}
                type="textbox"
                name="description"
                id="descriptionInput"
                required
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>
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

  handleSubmit(e) {
    e.preventDefault();

    this.props.isApiOnline(this.props.backendUrl).then(isApiOnline => {
      if (!isApiOnline) {
        alert('JSON api is not available, cannot create new movie');
        return;
      }

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
    });
  }

  isFormFilled() {
    if (this.state.title === '') {
      return false;
    }
    if (this.state.year === 0) {
      return false;
    }
    return this.state.description !== '';
  }

  resetForm() {
    this.setState(prevState => {
      return {
        title: '',
        year: prevState.maxYear,
        description: '',
      };
    });
  }
}

export default MovieForm;
