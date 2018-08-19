
//packages and twitter keys

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys');

var uInput = process.argv[2];


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
        console.log(tweets[i] ['text']);
        }
      }
      else{
          console.log(error);
      }
    });   
  


}
twitdata();