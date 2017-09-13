import React, { Component } from "react";
import "./title_container.css";

class TitleContainer extends Component {
  constructor() {
    super();
    this.state = {
      animals: [
        "cats",
        "honey badgers",
        "mongeese",
        "monkeys",
        "donkeys",
        "snakes",
        "'Vampire'-kittens"
      ],
      currentAnimal: ""
    };
    this.changeAnimal = this.changeAnimal.bind(this);
  }

  componentWillMount() {
    this.changeAnimal();
  }

  render() {
    return (
      <div className="title-container-wrapper">
        <h1>Movie list</h1>
        <h4>This page was coded by {this.state.currentAnimal}</h4>

        <button onClick={this.changeAnimal}>View other contributors..</button>
      </div>
    );
  }

  changeAnimal() {
    let nextAnimal = this.state.currentAnimal;
    do {
      nextAnimal = this.state.animals[
        Math.floor(Math.random() * this.state.animals.length)
      ];
    } while (nextAnimal === this.state.currentAnimal);

    this.setState({ currentAnimal: nextAnimal });
  }
}

export default TitleContainer;
