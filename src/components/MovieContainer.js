import React, {Component} from "react";
import "./movie_container.css";
import MovieItem from "./MovieItem";

class MovieContainer extends Component {

    constructor() {
        super();
        this.state = {
            movie: {title: "Fish attacks", description: "There once was a fish that attacked", year: 2014}
        };
    }

    render() {
        return (
            <div className="movie-container-wrapper container"> 
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <MovieItem
                            movie={this.state.movie}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieContainer;
