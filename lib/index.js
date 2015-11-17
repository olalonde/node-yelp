'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _oauth = require('oauth');

var _oauth2 = _interopRequireDefault(_oauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuth = _oauth2.default.OAuth;

var baseUrl = 'http://api.yelp.com/v2/';

var Yelp = (function () {
  function Yelp(opts) {
    _classCallCheck(this, Yelp);

    this.oauthToken = opts.token;
    this.oauthTokenSecret = opts.token_secret;
    this.oauth = new OAuth(null, null, opts.consumer_key, opts.consumer_secret, opts.version || '1.0', null, 'HMAC-SHA1');
  }

  _createClass(Yelp, [{
    key: 'get',
    value: function get(resource, params, cb) {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        var debug = params.debug;
        delete params.debug;

        _this.oauth.get(baseUrl + resource + '?' + _querystring2.default.stringify(params), _this.oauthToken, _this.oauthTokenSecret, function (err, _data, response) {
          if (err) return reject(err);
          var data = JSON.parse(_data);
          if (debug) return resolve([data, response]);
          resolve(data);
        });
      });
      if (typeof cb === 'function') {
        promise.then(function (res) {
          return cb(null, res);
        }).catch(cb);
        return null;
      }
      return promise;
    }
  }, {
    key: 'search',
    value: function search(params, callback) {
      return this.get('search', params, callback);
    }
  }, {
    key: 'business',
    value: function business(id, callback) {
      return this.get('business/' + id, null, callback);
    }

    /**
     * Exampe:
     * yelp.phone_search({phone: "+12223334444"}, function(error, data) {});
     */

  }, {
    key: 'phoneSearch',
    value: function phoneSearch(params, callback) {
      return this.get('phone_search', params, callback);
    }
  }]);

  return Yelp;
})();

exports.default = Yelp;