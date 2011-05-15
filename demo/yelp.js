var yelp = require("../index").createClient({
  consumer_key: "consumer-key", 
  consumer_secret: "consumer-secret",
  token: "token",
  token_secret: "token-secret"
});


yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  console.log(error);
  console.log(data);
});

yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});

