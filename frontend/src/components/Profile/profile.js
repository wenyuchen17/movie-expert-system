import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const User = props => (
  <tr>
    <td>
      <button>
        <Link to={{ pathname: `/edit/${props.user._id}` }}>edit</Link>
      </button>
    </td>
    <td>
      <Link to={{ pathname: `/favorite/${props.user._id}`, state: props.user }}>{props.user.username}</Link>
    </td>
    <td>{props.user.year}</td>
    <td>{props.user.runtime}</td>
    <td>{props.user.genres.map(element => element.value).join(', ')}</td>
    <td>{props.user.adult ? 'yes' : 'no'}</td>
    <td>{props.user.engmntLevel}</td>
    <td>
      <button onClick={() => { props.deleteUser(props.user._id) }}>delete</button>
    </td>
  </tr>
);
  
export default class Profile extends Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      password: '', 
      users: null
    };
  }

  onChangeUsername = (e) => this.setState({ username: e.target.value });
  
  onChangePassword = (e) => this.setState({ password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    axios.get('http://localhost:5000/users/get/profile', {
        params: {
          username: this.state.username,
          password: this.state.password
      }
    })
      .then(res => {
        if (res.data === "")
          alert(`User not found`);
        else {
          this.setState({ users: res.data });
        }
      })
      .catch((error) => {console.log(error);});
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/delete/${id}`)
      .then(res => this.setState({
        username: '',
        password: '', 
        users: null 
      }));
  }

  userList() { return <User user={this.state.users} deleteUser={this.deleteUser} />; }

  render() {
    return (
      <div>
        <h3>My Profile</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <label>Username</label>
              <input 
                  ref="userInput"
                  className="form-control"
                  required
                  minLength={5}
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
              </input>
          </div>
          <div className="form-group"> 
              <label>Password</label>
              <input 
                  ref="userInput"
                  className="form-control"
                  type="password" 
                  required
                  minLength={5}
                  value={this.state.password}
                  onChange={this.onChangePassword}>
              </input>
          </div>
          <div className="form-group">
            <input type="submit" value="Show" className="btn btn-primary" />
          </div>
        </form>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th></th>
              <th>Usernname</th>
              <th>Movie Year</th>
              <th>Runtime</th>
              <th>Genres</th>
              <th>Age Restriction</th>
              <th>Engagement Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { 
              //<tr></tr> instead of '' because apparently <tbody> requires <tr> tags and gives warning when theres none
              this.state.users != null ? this.userList() : <tr></tr> 
            }
          </tbody>
        </table>
      </div>
    )
  }
}