const tmdb = require('moviedb')('8632f61ccfee9e1e5ba3731ed741ab36');


const pipe = (...args) => x => args.reduce((acc,cur) => cur(acc), x);
const tap = fn => x => {
   fn(x);
   return x;
}

const discoverParams = {
    "language" : "es-ES",
    "inlcude_adult" : false,
    "primary_release_date.gte" : "1980",
    "vote_count.gte" : "2000",
    "page": Math.round(Math.random()*10) + 1
};



const discoverSuccess = res => {
    console.log("SUCCESS")
    // console.log(res)



    const filterId = res => res.results.map(item => item.id)

    const randomId = arr => arr[Math.floor(Math.random() * arr.length)]

    const result = pipe(
        filterId,
        // tap((x) => console.log(x)),
        randomId
    );

  const movieId = result(res);

  console.log(movieId);



}


const discoverError = err => {
    console.log("error")
    console.log(err)
}

//tmdb.discover.getMovies(discoverParams,discoverSuccess, discoverError);
tmdb.discoverMovie(discoverParams,((err,res) => err ? discoverError(err) : discoverSuccess(res)))






