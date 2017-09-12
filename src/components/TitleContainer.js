import React, { Component } from "react";
import "./title_container.css";

class TitleContainer extends Component {
  constructor() {
    super();
    this.state = {
      animals: ["cats", "honey badgers", "mongeese", "monkeys", "donkeys"]
    };
  }
  render() {
    return (
      <div className="title-container-wrapper">
        <h1>Movie list</h1>
        <h4>
          This page was coded by{" "}
          {
            this.state.animals[
              Math.floor(Math.random() * this.state.animals.length)
            ]
          }
        </h4>
      </div>
    );
  }
}

export default TitleContainer;
