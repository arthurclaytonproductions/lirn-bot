
//packages and twitter keys

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
var fs = require('fs');
var uInput = process.argv[2];
var uSelection = process.argv[3];


var queryUrl = 'http://www.omdbapi.com/?apikey=c7ea6710&t=' + uSelection + '&y=&plot=short&tomatoes=true&r=json';

//twitter function data
function twitdata(){
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'Arthur Clayton',
    count: 5,
};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        for(var i = 1; i <= 4; i++){
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
    if(process.argv.length >= 4 || typeof uSelection === 'string'){
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
        // Parse the body of the site 
            var jpBody = JSON.parse(body);
            ombdInfo(jpBody);
        }
        else{
            console.log('error:', error);
        }
      });
    }
      else if(process.argv.length < 4){
        request('http://www.omdbapi.com/?apikey=c7ea6710&t=Mr.+Nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
        
            // If the request is successful
            if (!error && response.statusCode === 200) {
            // Parse the body of the site 
                var jpBody = JSON.parse(body);
                ombdInfo(jpBody);
                  
    }
            else{
            console.log('error:', error);
            }
        });
    }};

function ombdInfo(body){
          console.log("Title: " + body.Title);
          console.log("Year: " + body.Year);
          console.log("IMBD Rating: " + body.imbdRating);
          console.log("Country: " + body.Country);
          console.log("Lanuage: " + body.Language);
          console.log("Plot: " + body.Plot);
          console.log("Actors: " + body.Actors);
          console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
          console.log("Rotten Tomatoes Url: " + body.tomatoURL);
};

function randomText(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (!err) {
           var dataArr = data.split(",");
           uInput = dataArr[0];
           uSelection = dataArr[1];
           
           switch(uInput){
               case 'spotify-this-song':
               spotifyData();
               break;
           }
           
              
        }
        else{
            return console.log('Error occurred: ' + err);
        }
      });
}

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

case 'do-what-it-says':
randomText();
break;
}

