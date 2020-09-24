import React from 'react';


const Movie = (props) => {
    return (
        <div>
            { 
                props.image == null 
                ? 
                <div style={{ cursor: "pointer" }} onClick={() => props.viewMovieInfo(props.movieId)}>
                    <img 
                        src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
                        alt="default"
                        style={{ width: "25%", height: 360, float: "left" }}
                    />
                </div>
                :
                <div style={{ cursor: "pointer" }} onClick={() => props.viewMovieInfo(props.movieId)}>
                    <img 
                        src={`http://image.tmdb.org/t/p/original${props.image}`}
                        alt="movie"
                        style={{ width: "25%", height: 360, float: "left" }} 
                    />
                </div>
            }
        </div>  
    );
}

export default Movie;