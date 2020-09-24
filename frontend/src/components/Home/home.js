import React, { Component } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import MovieList from '../Movies/movieList';
import MovieInfo from '../Movies/movieInfo';


export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            movies: [],
            currentUser: null,
            currentMovie: null
        }
    }

    onChangeUsername = (e) => this.setState({ username: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();

        //Clear current movie suggestions(posters) if any, so that the load indicator are being shown
        //while waiting for the result of API call
        this.setState({ movies: [] });

        trackPromise(
            axios.get(`http://localhost:5000/users/get/current`, {
                params: { username: this.state.username }
            })
            .then(res => {
                if (res.data === "")
                    alert(`User not found`);
                else {
                    //console.log(res.data)
                    this.setState({ 
                        currentUser: res.data.currentUser,
                        movies: res.data.movies 
                    });
                }
            })
            .catch((error) => console.log(error) )
        );
    }

    viewMovieInfo = (id) => {
        const filteredMovie = this.state.movies.filter(movie => movie.id === id);
        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
        this.setState({ currentMovie: newCurrentMovie });
    }

    closeMovieInfo = () => this.setState({ currentMovie: null });

    addMovie = () => {
        axios.post('http://localhost:5000/users/add/favorite', {
            params: {
                currentUser: this.state.currentUser,
                movie: this.state.currentMovie
            }
        })
        .then(res => {
            //console.log(res.data);
            this.closeMovieInfo();
        })
        .catch(err =>  alert(`failed`));
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                { 
                    this.state.currentMovie == null
                    ?   
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group"> 
                                <label>Enter your username to find your movie suggestions</label>
                                <input 
                                    ref="userInput"
                                    required
                                    value={this.state.username}
                                    className="form-control"
                                    onChange={this.onChangeUsername}>
                                </input>
                            </div>       
                            <div className="form-group">
                                <input type="submit" value="Search" className="btn btn-primary" />
                            </div>
                        </form>
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