import React, { Component } from "react";
import "./movie_form.css";

class MovieForm extends Component {
  constructor() {
    super();
    this.state = {
      maxYear: new Date().getFullYear(),
      minYear: 1800,
      title: "",
      year: 0,
      description: ""
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
              name="title"
              id="titleInput"
              required
            />
          </label>
          <label htmlFor="yearInput">
            Year:
            <input
              onChange={this.handleInputChange}
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
              type="textbox"
              name="description"
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
    let value = event.target.value;
    const name = event.target.name;

    if (event.target.name === "year") {
      value = parseInt(value, 10);
    }
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isFormFilled()) {
      fetch("http://localhost:1234/movies", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.state.title,
          year: this.state.year,
          description: this.state.description
        })
      });
    } else {
      alert("Form is not filled properly out!");
    }

    this.resetForm();
  }

  isFormFilled() {
    if (this.state.title === "") {
      return false;
    }
    if (this.state.year === 0) {
      return false;
    }
    return this.state.description !== "";
  }

  resetForm() {
    this.formRef.reset();
    this.setState({
      title: "",
      year: 0,
      description: ""
    });
  }
}

export default MovieForm;
