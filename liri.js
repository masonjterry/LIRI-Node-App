let keys = require("./keys.js");

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

function tweets(search) {
  console.log("tweets");
  console.log("search", search);
}

function spotify(search) {
  console.log("spotify");
  console.log("search", search);
}

function movie(search) {
  console.log("movie");
  console.log("search", search);
}

function doWhatItSays(search) {
  console.log("doing what it says");
  console.log("search", search);
}
