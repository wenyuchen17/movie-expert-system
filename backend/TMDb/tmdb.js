const fetch = require('node-fetch');
const apiKey = process.env.MOVIE_API;


module.exports = {
    sendMovies: async function (res, user) {
        let movies = await this.getMovies(user);
        
        for (let i = 0; i < movies.length; i++) {
            const details = await this.getMovieDetails(movies[i].id);
            movies[i].runtime = details.runtime;
            movies[i].genres = details.genres;
        }
        const temp = {
            currentUser: user,
            movies: movies
        }
    
        res.json(temp);
    },

    sendTrendingMovies: async function(res, movieType) {
        let movies = await this.getTrendingMovies(movieType);
        
        for (let i = 0; i < movies.length; i++) {
            const details = await this.getMovieDetails(movies[i].id);
            movies[i].runtime = details.runtime;
            movies[i].genres = details.genres;
        }
    
        res.json(movies);
    },

    getMovies: function(currentUser) {
        
        //construct query string for each property
        let url;
        const adult = currentUser.adult;
        const year = currentUser.year;
        const genres = currentUser.genres.map(element => element.id).join(`%2C`);

        if (currentUser.runtime === 100) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adult}&include_video=false&page=1&year=${year}&with_genres=${genres}&with_runtime.lte=100`
            //console.log(url)
        }
        else if (currentUser.runtime === 125) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adult}&include_video=false&page=1&year=${year}&with_genres=${genres}&with_runtime.gte=100&with_runtime.lte=150`
            //console.log(url)
        }
        else {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adult}&include_video=false&page=1&year=${year}&with_genres=${genres}&with_runtime.gte=150`
            //console.log(url)
        }

        return new Promise(function(resolve, reject) {
            fetch(url)
            .then(data => data.json())
            .then(data => resolve(data.results));
        });
    },

    getTrendingMovies: function() {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        
        return new Promise(function(resolve, reject) {
            fetch(url)
            .then(data => data.json())
            .then(data => resolve(data.results));
        });
    },

    getMovieDetails: function(id) {
        return new Promise(function(resolve, reject) {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then(data => data.json())
            .then(data => resolve(data));
        });
    }
};