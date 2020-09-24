import React, { Component } from 'react';
import axios from 'axios'

import MovieList from '../Movies/movieList';
import MovieInfo from '../Movies/movieInfo';


export default class Favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.location.state,
            currentMovie: null
        }
    }

    viewMovieInfo = (id) => {
        const filteredMovie = this.state.currentUser.favorites.filter(movie => movie.id === id);
        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
        this.setState({ currentMovie: newCurrentMovie });
    }

    closeMovieInfo = () => this.setState({ currentMovie: null });

    //remove movie that the user has already seen
    removeMovie = () => {
        axios.post(`http://localhost:5000/users/edit${this.props.location.pathname}`, this.state.currentMovie)
        .then(res => {
            this.setState({ currentUser: res.data })
            this.closeMovieInfo();
        })
        .catch(err =>  alert(`failed`));
    }

    render() {
        return (
            <div>
                {
                    this.state.currentUser == null
                    ?
                    <h3>Oops! Something is wrong, please check back later.</h3>
                    :
                    <div>
                        <h3>{this.state.currentUser.username}'s Favorite List</h3>
                        { 
                            this.state.currentMovie == null
                            ?   
                            <div>
                                <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.currentUser.favorites} />
                                <p style={{ paddingBottom: "40px" }}> </p>
                            </div>
                            :
                            <div>
                                <MovieInfo 
                                    currentMovie={this.state.currentMovie} 
                                    closeMovieInfo={this.closeMovieInfo} 
                                    removeMovie={this.removeMovie}
                                    isHome={false}
                                />
                                <p style={{ paddingBottom: "40px" }}> </p>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}