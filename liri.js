let keys = require("./keys.js");
let twitter = new Twitter ({
  consumer_key: ,
  consumer_secret: ,
  access_token_key: ,
  access_token_secret: ,
});

let command = process.argv[2];
let input = process.argv;
let search = "";

for (let i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    search = search + "+" + input[i];
  } else {
    search += input[i];
  }
}

// switch statement
switch(command) {
  case "my tweets":
    tweets();
    break;
  case "spotify-this-song":
    spotify(search);
    break;
  case "movie-this":
    movie(search);
    break;
  case "do-what-it-says":
    doWhatItSays(search);
    break;
  default:
    break;
}

// twitter function
function tweets() {
  console.log("tweets");
  console.log("search", search);
  twitter.get("statuses/user_timeline", params, function(err, tweets, response) {
    if (err) {
      console.log("You messed up...", err);
    }
    console.log(tweets);
  })
}

// spotify function
function spotify(search) {
  console.log("spotify");
  console.log("search", search);
}

// movie function
function movie(search) {
  console.log("movie");
  console.log("search", search);
}

// do what it says function
function doWhatItSays(search) {
  console.log("doing what it says");
  console.log("search", search);
}
