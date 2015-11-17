import querystring from 'querystring';
import oauth from 'oauth';

const OAuth = oauth.OAuth;

const baseUrl = 'http://api.yelp.com/v2/';

class Yelp {
  constructor(opts) {
    this.oauthToken = opts.token;
    this.oauthTokenSecret = opts.token_secret;
    this.oauth = new OAuth(
      null,
      null,
      opts.consumer_key,
      opts.consumer_secret,
      opts.version || '1.0',
      null,
      'HMAC-SHA1'
    );
  }

  get(resource, params = {}, cb) {
    const promise = new Promise((resolve, reject) => {
      const debug = params.debug;
      delete params.debug;

      this.oauth.get(
        baseUrl + resource + '?' + querystring.stringify(params),
        this.oauthToken,
        this.oauthTokenSecret,
        (err, _data, response) => {
          if (err) return reject(err);
          const data = JSON.parse(_data);
          if (debug) return resolve([ data, response ]);
          resolve(data);
        }
      );
    });
    if (typeof cb === 'function') {
      promise
        .then((res) => cb(null, res))
        .catch(cb);
      return null;
    }
    return promise;
  }

  search(params, callback) {
    return this.get('search', params, callback);
  }

  business(id, callback) {
    return this.get('business/' + id, undefined, callback);
  }

  /**
   * Exampe:
   * yelp.phone_search({phone: "+12223334444"}, function(error, data) {});
   */
  phoneSearch(params, callback) {
    return this.get('phone_search', params, callback);
  }
}

export default Yelp;
