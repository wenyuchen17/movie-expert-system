import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

import { years, runtimes, genres, adults, engmntLevels } from './options';


export default class Create extends Component {
    constructor(props) {
        super();
        
        this.state = {
            username: '',
            password: '',
            year: '',
            runtime: '',
            genres: '',
            adult: '',
            engmntLevel: ''
        }
    }

    onChangeUsername = (e) => this.setState({ username: e.target.value });

    onChangePassword = (e) => this.setState({ password: e.target.value });
    
    onChangeYear = (e) => this.setState({ year: e.value });

    onChangeRuntime = (e) => this.setState({ runtime: e.value });

    onChangeGenres = (e) => {
        if (e == null || e.length <= 3)
            this.setState({ genres: e });
        else {
            alert('You can only select maximum of 3 genres')
            this.setState({ genres: this.state.genres });
        }
    }

    extractVal = (e) => {
        const arr = [];
        e.forEach(element => {
            const temp = {
                id: element.id,
                value: element.value
            }
            arr.push(temp)
        });
        
        return arr;
    }

    onChangeAdult = (e) => this.setState({ adult: e.value });

    onChangeEngmntLevel = (e) => this.setState({ engmntLevel: e.value });

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            year: this.state.year,
            runtime: this.state.runtime,
            genres: this.extractVal(this.state.genres),
            adult: this.state.adult,
            engmntLevel: this.state.engmntLevel,
            favorites: []
        }

        axios.post('http://localhost:5000/users/create', user)
            .then(res => {
                //console.log(res.data);
                window.location= '/';
            })
            .catch(err =>  alert(`This username is already used`));
    }

    render() {
        return (
            <div>
                <h3>Add a New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username (minimum of 5 letters):</label>
                        <input 
                            ref="userInput"
                            className="form-control"
                            required
                            minLength={5}
                            onChange={this.onChangeUsername}>
                        </input>
                    </div>
                    <div className="form-group"> 
                        <label>Password (minimum of 5 letters):</label>
                        <input 
                            ref="userInput"
                            className="form-control"
                            type="password" 
                            required
                            minLength={5}
                            onChange={this.onChangePassword}>
                        </input>
                    </div>
                    <div className="form-group"> 
                        <label>Movie Year:</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={years}
                            onChange={this.onChangeYear}
                        />
                        {/* The JavaScript code below and input tag are used to make <Select> required */}
                        {this.state.year == null && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                required
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label>Movie Runtime:</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={runtimes}
                            onChange={this.onChangeRuntime}
                        />
                        {this.state.runtime == null && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                required
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label>Movie Genres (up to 3):</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            required
                            isMulti
                            name="genre options"
                            value={this.state.genres}
                            options={genres}
                            onChange={this.onChangeGenres}
                        />
                        {this.state.genres == null && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                required
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label>Age Restricted Movies:</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={adults}
                            onChange={this.onChangeAdult}
                        />
                        {this.state.adult == null && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                required
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label>How Serious Are the Movies:</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={engmntLevels}
                            onChange={this.onChangeEngmntLevel}
                        />
                        {this.state.engmntLevel == null && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                required
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}