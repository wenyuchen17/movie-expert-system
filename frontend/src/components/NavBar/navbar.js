import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="navbar-brand">Movie Finder</div>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/popular" className="nav-link">Popular</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}