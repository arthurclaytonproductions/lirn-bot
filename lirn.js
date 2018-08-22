
//packages and twitter keys

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');

var uInput = process.argv[2];
var uSelection = process.argv[3];

//var queryUrl = 'http://www.omdbapi.com/?apikey=c7ea6710&t=' + uSelection + '&y=&plot=short&r=json'
var queryUrl = "http://www.omdbapi.com/?t=" + uSelection + "&y=&plot=short&r=json";
//twitter function data
function twitdata(){
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'Arthur Clayton',
    count: 21,
};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        for(var i = 1; i <= 20; i++){
        console.log('Tweet', [i]);
        console.log(tweets[i]['text']);
        console.log('----------------------------------------------------------------');
        }
      }
      else{
          console.log(error);
      }
    });   
};
//spotify functions
function spotifyData(){
    if(process.argv.length >=4 || typeof uSelection === 'string'){
    var spotify = new Spotify(keys.spotifyKeys);
spotify.search({ type: 'track', query: uSelection }, function(err, data) {
    if (!err) {
        spotifyInfo(data);
    }
    else {
        return console.log('Error ' + err);
        
      }
     
  });
  
}
    else if(process.argv.length < 4){
    var spotify = new Spotify(keys.spotifyKeys);
    spotify.search({ type: 'track', query: 'The Sign Ace of Base' }, function(err, data) {
        if (!err) {
        spotifyInfo(data);;
        }
     else{
        return console.log('Error occurred: ' + err);
     }  
        
      });   
  }
};

function spotifyInfo(data){
    var artist = data.tracks.items[0].artists[0].name;
    var album = data.tracks.items[0].album.name;
    var song = data.tracks.items[0].name;
    var songLink = data.tracks.items[0].external_urls.spotify;
    console.log('Artist ' + artist);
    console.log('Album ' + album);
    console.log('Track ' + song);
    console.log('Link to song ' + songLink);
    
};

// ombd functions

function ombdData(){
if(process.argv.length >=4 || typeof uSelection === 'string'){
request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Year: " + JSON.parse(body).year);
    }
    else{
        console.log('error:', error);
    }
  });
}};



switch(uInput){
case 'my-tweets':
twitdata();
break;

case 'spotify-this-song':
spotifyData();
break;

case 'movie-this':
ombdData();
break;
}

