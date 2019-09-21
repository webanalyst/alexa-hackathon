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
const movieDetailsSuccess = res => {
    return res
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

const init = movie => {
    // console.log(movie);
    const genero = movie.genres.map(item => item.name);
    const titulo = movie.title;
    const resumen = movie.overview;
    const paisesDeProduccion = movie.production_countries.map(item => item.name);
    const subtitulo = movie.tagline;
    const year = {
        // Devolver Objeto Año mes y dia
        // retunr movie.release_date
    };
    return {
        genero,
        titulo,
        subtitulo,
        resumen,
        paisesDeProduccion,
        year
    }
};


// execute
movieID
    .then(res => movieDetails(res))
    .then(response => {
        // console.log(response);
        console.log(init(response));
    });







