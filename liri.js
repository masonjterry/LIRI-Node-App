let twitter = require("twitter");
let keys = require("./keys.js");
let spotify = require("spotify");
let request = require("request");

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
  case "my-tweets":
    tweets();
    break;
  case "spotify-this-song":
    spotify(search);
    break;
  case "movie-this":
    movie(search);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    break;
}

// // twitter function
// function tweets() {
//   console.log("tweets");
//   let params = {screen_name: "twitterAPI"};
//   keys.get("statuses/user_timeline", params, function(err, tweets, response) {
//     if (err) {
//       console.log("You messed up...", err);
//     }
//     console.log(tweets);
//   })
// }
//
// // spotify function
// function spotify(search) {
//   console.log("spotify");
//   console.log("search", search);
//   spotify.lookup: function({ type: "artist or album or track", id: "Spotify ID Hash"}, hollaback);
//
// }

// movie function
function movie(search) {
  let url = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

  request(url, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Rated: " + JSON.parse(body).Rated);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("--------------------------------------------------------");
    }
  });
}

// do what it says function
function doWhatItSays(search) {
  console.log("doing what it says");
  console.log("search", search);
}
