import test from 'blue-tape';
import Yelp from '../src/';

const opts = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
};

const yelp = new Yelp(opts);

test('yelp search', (t) => {
  return yelp.search({
    term: 'food',
    location: 'Montreal',
  }).then((data) => {
    t.equal(typeof data.region, 'object');
    t.equal(typeof data.total, 'number');
    t.ok(Array.isArray(data.businesses), 'businesses is array');
  })
  .catch((err) => {
    t.error(err);
  });
});

test('yelp business', (t) => {
  return yelp.business('yelp-san-francisco').then((data) => {
    t.equal(data.is_claimed, true);
    t.equal(typeof data.rating, 'number');
    t.equal(typeof data.mobile_url, 'string');
    t.ok(Array.isArray(data.categories), 'categories is array');
    t.ok(Array.isArray(data.reviews), 'reviews is array');
  })
  .catch((err) => {
    t.error(err);
  });
});

test('yelp phoneSearch', (t) => {
  return yelp.phoneSearch({ phone: '+15555555555' }).then((data) => {
    t.equal(typeof data.total, 'number');
    t.ok(Array.isArray(data.businesses), 'businesses is array');
  })
  .catch((err) => {
    t.error(err);
  });
});

test('yelp - callback', (t) => {
  t.plan(4);
  yelp.search({
    term: 'food',
    location: 'Montreal',
  }, (err, data) => {
    t.error(err);
    t.equal(typeof data.region, 'object');
    t.equal(typeof data.total, 'number');
    t.ok(Array.isArray(data.businesses), 'businesses is array');
  });
});
