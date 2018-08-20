
//packages and twitter keys

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');

var uInput = process.argv[2];
var uSelection = process.argv[3];


//twitter function data
function twitdata(){
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'Arthur Clayton',
    count: 21,
}
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
}

function spotifyData(){
    var spotify = new Spotify(keys.spotifyKeys);
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(JSON.stringify(data, null, 2));
  });
}
spotifyData();

switch(uInput){
case `my-tweets`:
twitdata();
break;
}

// Do something with 'data'
