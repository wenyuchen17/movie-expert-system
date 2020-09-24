import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

import { years, runtimes, genres, adults, engmntLevels } from '../Create/options';


export default class Edit extends Component {
    constructor(props) {
        super(props);
        
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

    componentDidMount() {
        axios.get(`http://localhost:5000/users${this.props.location.pathname}`)
        .then(res => {
            this.setState({
                username: res.data.username,
                password: res.data.password,
                year: res.data.year,
                runtime: res.data.runtime,
                genres: this.addLabel(res.data.genres),
                adult: res.data.adult,
                engmntLevel: res.data.engmntLevel
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //add labels to the genres array
    addLabel = (e) => {
        e.forEach(element => element.label = element.value);
        return e;
    }

    onChangeUsername = (e) => this.setState({ username: e.target.value }); 

    onChangePassword = (e) => this.setState({ password: e.target.value });

    onChangeYear = (e) => this.setState({ year: e.value });

    onChangeRuntime = (e) => this.setState({ runtime: e.value });

    onChangeGenres = (e) => {
        if (e === null || e.length <= 3)
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
            /*
            for genres, I extract values this way so the array stored in DB only contains values and IDs
            */
            genres: this.extractVal(this.state.genres),
            adult: this.state.adult,
            engmntLevel: this.state.engmntLevel
        }

        axios.post(`http://localhost:5000/users${this.props.location.pathname}`, user)
        .then(res => {
            //console.log(res.data);
            window.location= '/profile';
        })
        .catch(err => alert(`This username is already used`));
    }

    render() {
        return (
            <div>
                <h3>Edit User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username (minimum of 5 letters):</label>
                        <input 
                            ref="userInput"
                            required
                            minLength={5}
                            value={this.state.username}
                            className="form-control"
                            onChange={this.onChangeUsername}>
                        </input>
                    </div>
                    <div className="form-group"> 
                        <label>Password (minimum of 5 letters):</label>
                        <input 
                            ref="userInput"
                            type="password"
                            required
                            minLength={5}
                            value={this.state.password}
                            className="form-control"
                            onChange={this.onChangePassword}>
                        </input>
                    </div>
                    <div className="form-group"> 
                        <label>Movie Year:</label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={years}
                            value={years.find(op => {
                                return op.value === this.state.year
                            })}
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
                            value={runtimes.find(op => {
                                return op.value === this.state.runtime
                            })}
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
                            options={genres}
                            value={this.state.genres}
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
                            value={adults.find(op => {
                                return op.value === this.state.adult
                            })}
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
                            value={engmntLevels.find(op => {
                                return op.value === this.state.engmntLevel
                            })}
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
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}