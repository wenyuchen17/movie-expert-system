import React from 'react';

const MovieInfo = (props) => {
    return (
        <div className='container'>
            <div className="row">
                <i className="fas fa-arrow-left"></i>
                <button onClick={props.closeMovieInfo} style={{marginLeft: 10}}>Go Back</button>
            </div>
            <div className="row">
                <div className="col s12 m4">
                    {
                        props.currentMovie.poster_path == null
                        ?
                        <img 
                            src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
                            alt="default"
                            style={{ width: "50%", height: 600, display: "block", marginLeft: "auto", marginRight: "auto" }}
                        />
                        :
                        <img 
                            src={`http://image.tmdb.org/t/p/original${props.currentMovie.poster_path}`}
                            alt="default"
                            style={{ width: "50%", height: 600, display: "block", marginLeft: "auto", marginRight: "auto" }}
                        />
                    }
                </div>
            </div>
            <div className="col s12 m8">
                <div className="info-container">
                    <p>Title: {props.currentMovie.title}</p>
                    <p>Genres: {props.currentMovie.genres.map(element => element.name).join(`, `)}</p>
                    <p>Release Date: {props.currentMovie.release_date.substring(5).split("-").concat(props.currentMovie.release_date.substring(0, 4)).join("/")}</p>
                    <p>Runtime: {props.currentMovie.runtime} minutes</p>
                    <p>Rated R: {props.currentMovie.adult ? `Yes` : `No`}</p>
                    <p>Overview: {props.currentMovie.overview !== "" ? props.currentMovie.overview : `No overview available`}</p>
                </div>
                <div>
                    <button onClick={props.isHome ? props.addMovie : props.removeMovie}>{props.isHome ? `Add` : `Remove`}</button>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;