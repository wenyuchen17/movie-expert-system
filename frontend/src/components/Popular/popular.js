import React, { Component } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import MovieList from '../Movies/movieList';
import MovieInfo from '../Movies/movieInfo';


export default class Popular extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            movies: [],
            currentUser: null,
            currentMovie: null,
        }
    }

    componentDidMount() {
        this.setState({ movies: [] });

        trackPromise(
            axios.get(`http://localhost:5000/users/get/trending`)
            .then(res => this.setState({ movies: res.data }) )
            .catch((error) => {
                console.log(error);
                alert(`Error, sorry something is wrong.`);
            })
        );
    } 

    viewMovieInfo = (id) => {
        const filteredMovie = this.state.movies.filter(movie => movie.id === id);
        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
        this.setState({ currentMovie: newCurrentMovie });
    }

    closeMovieInfo = () => this.setState({ currentMovie: null });

    addMovie = () => {}

    render() {
        return (
            <div>
                <h3>Popular</h3>
                { 
                    this.state.currentMovie == null
                    ?   
                    <div>
                        <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} />
                        <p style={{ paddingBottom: "40px" }}> </p>
                    </div>
                    :
                    <div>
                        <MovieInfo 
                            currentMovie={this.state.currentMovie} 
                            closeMovieInfo={this.closeMovieInfo} 
                            addMovie={this.addMovie}
                            isHome={true}
                        />
                        <p style={{ paddingBottom: "40px" }}> </p>
                    </div>
                }
            </div>
        );
    }
}