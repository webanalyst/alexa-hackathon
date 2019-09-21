const tmdb = require('moviedb')('8632f61ccfee9e1e5ba3731ed741ab36');

const pipe = (...args) => x => args.reduce((acc,cur) => cur(acc), x);
const tap = fn => x => {
   fn(x);
   return x;
};

const discoverParams = {
    "language" : "es-ES",
    "inlcude_adult" : false,
    "primary_release_date.gte" : "1980",
    "vote_count.gte" : "2000",
    "page": Math.round(Math.random()*10) + 1
};



// This success discover
const discoverSuccess = res => {
    console.log("SUCCESS");
    // console.log(res)
    const filterId = res => res.results.map(item => item.id);
    const randomId = arr => arr[Math.floor(Math.random() * arr.length)];
    const result = pipe(
        filterId,
        // tap((x) => console.log(x)),
        randomId
    );
    return result(res);
};

// This success MovieDetails
const movieDetailsSuccess = movie => {
    // console.log(movie);
    const genero = movie.genres.map(item => item.name);
    const titulo = movie.title;
    const resumen = movie.overview;
    const paisesDeProduccion = movie.production_countries.map(item => item.name);
    const subtitulo = movie.tagline;

    const split = movie.release_date.split('-');

    const year = {
        year: split[0],
        month: split[1],
        day: split[2]
    };

    const id = movie.id;
    return {
        id,
        genero,
        titulo,
        subtitulo,
        resumen,
        paisesDeProduccion,
        year
    }
};


// actores de la película

const movieCreditsSuccess = res => {
    const arr = res.cast;
    const filterArr = arr.filter(item => item.order < 3)
    return filterArr.map(item => ({actor:item.name, personaje:item.character}))
};



// This error response
const discoverError = err => {
    console.log("error");
    console.log(err)
};

// Looking for movie ID
const movieID = new Promise( (resolve, reject) => {
    tmdb.discoverMovie(discoverParams,( (err,res) => err ? reject(discoverError(err)) : resolve(discoverSuccess(res))));
});

const movieDetails = (x) => {
    const paramsMovie = {
        "id": x,
        "language" : "es-ES",
    };
    return new Promise((resolve, reject) => {
        tmdb.movieInfo(paramsMovie, (error, response) => error ? reject(discoverError(err)) : resolve(movieDetailsSuccess(response)))
    });
};

const movieCredits = (movie) => {
    const paramsMovie = {
        "id": movie,
        "language" : "es-ES",
    };
    return new Promise((resolve, reject) => {
        tmdb.movieCredits(paramsMovie, (error, response) => error ? reject(discoverError(err)) : resolve(movieCreditsSuccess(response)))
    });
};


const mergeObj = obj => {
    return {...obj[0], personajes: obj[1] }
};

// execute
movieID
    .then(res => Promise.all([movieDetails(res),movieCredits(res)]))
    .then(response => console.log(mergeObj(response)));
