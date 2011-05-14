Node.js module for interfacing with [Yelp](http://www.yelp.com)'s API v2.0

# Install #

    npm install yelp

# Usage #

    // Request API access: http://www.yelp.com/developers/getting_started/api_access
    
    var yelp = require("yelp").createClient({
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
