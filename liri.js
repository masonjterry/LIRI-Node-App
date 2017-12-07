let Twitter = require("twitter");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let request = require("request");
let fs = require("fs");

let spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

let twitter = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

let command = process.argv[2];
let input = process.argv;
let userSearch = "";

for (let i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    userSearch = userSearch + "+" + input[i];
  } else {
    userSearch += input[i];
  }
}

let userInput = command + ": " + userSearch + ", ";

fs.appendFile("log.txt", userInput, function(err){
  if (err) {
    console.log("Error occurred: " + err);
  }
  console.log("Content added!");
});

// switch statement
switch(command) {
  case "my-tweets":
    tweets();
    break;
  case "spotify-this-song":
    spotifyThisSong(userSearch);
    break;
  case "movie-this":
    movie(userSearch);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    break;
}

// twitter function
function tweets() {
  let params = {screen_name: "masonjterry"};
  twitter.get("statuses/user_timeline", params, function(err, tweets, response) {
    if (err) {
      console.log("Error occurred: ", err);
    }
  console.log("-------------------------------------------")
    for (let i = 0; i < 20; i++) {
    console.log("Tweet " + [i + 1] + ": " + tweets[i].text);
    }
  console.log("-------------------------------------------")
  })
}

// spotify function
function spotifyThisSong(userSearch) {
  if (userSearch === "") {
    userSearch = "the+sign+ace+of+base";
  }
  spotify.search({ type: "track", query: userSearch, limit: 1 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
  console.log("-------------------------------------------")
  // artist
  console.log("Artist: " + data.tracks.items[0].artists[0].name);
  // song name
  console.log("Song Name: " + data.tracks.items[0].name);
  // preview link of the song
  console.log("Song Preview: " + data.tracks.items[0].preview_url);
  // album the song is on
  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("-------------------------------------------")
  });

}

// movie function
function movie(userSearch) {
  if (userSearch === "") {
    userSearch = "mr+nobody";
  }
  let url = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=c5dea011";

  request(url, function(err, response, body) {
    if (err) {
      console.log("Error occurred: ", err);
    } else {
      console.log("-------------------------------------------")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Rated: " + JSON.parse(body).Rated);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("-------------------------------------------")
    }
  });
}

// do what it says function
function doWhatItSays(userSearch) {
  fs.readFile("random.txt", "utf8", function(err, data) {

    spotifyThisSong("i+want+it+that+way");
  });
}
