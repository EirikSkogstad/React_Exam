import React, {Component} from 'react';
import './App.css';
import MovieContainer from "./components/MovieContainer";
import MovieForm from "./components/MovieForm";
import TitleContainer from "./components/TitleContainer";

class App extends Component {
    render() {
        return (
            <div className="app-container">

                <TitleContainer/>
                <MovieForm/>
                <MovieContainer/>
            </div>
        );
    }
}

export default App;
