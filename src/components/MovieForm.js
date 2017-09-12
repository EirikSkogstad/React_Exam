import React, { Component } from "react";
import "./movie_form.css";

class MovieForm extends Component {
  render() {
    return (
      <div className="movie-form-wrapper container-fluid">
        <form>
          <label htmlFor="input1">
            Title:
            <input type="text" id="input1" />
          </label>
          <label htmlFor="input2">
            Year:
            <input type="text" id="input2" />
          </label>
          <label htmlFor="input3">
            Description:
            <input type="text" id="input3" />
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
