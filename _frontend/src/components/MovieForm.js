import React, { Component } from "react";
import "./movie_form.css";

class MovieForm extends Component {
  constructor() {
    super();
    this.state = {
      maxYear: new Date().getFullYear(),
      minYear: 1800,
      Title: "",
      Year: "",
      Description: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="movie-form-wrapper">
        <form onSubmit={this.handleSubmit} ref={ref => (this.formRef = ref)}>
          <label htmlFor="titleInput">
            Title:
            <input
              onChange={this.handleInputChange}
              type="text"
              name="Title"
              id="titleInput"
              required
            />
          </label>
          <label htmlFor="yearInput">
            Year:
            <input
              onChange={this.handleInputChange}
              type="number"
              name="Year"
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
              type="textbox"
              name="Description"
              id="descriptionInput"
              required
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isFormFilled()) {
      alert("Sending form!");
    } else {
      alert("Form is not filled properly out!");
    }

    this.resetForm();
  }

  isFormFilled() {
    if (this.state.Title === "") {
      return false;
    }
    if (this.state.Year === "") {
      return false;
    }
    return this.state.Description !== "";
  }

  resetForm() {
    this.formRef.reset();
    this.setState({
      Title: "",
      Year: "",
      Description: ""
    });
  }
}

export default MovieForm;
