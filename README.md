# ember-macro-test-helpers

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-macro-test-helpers.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-macro-test-helpers.svg)](https://badge.fury.io/js/ember-macro-test-helpers)
[![Build Status](https://travis-ci.org/kellyselden/ember-macro-test-helpers.svg?branch=master)](https://travis-ci.org/kellyselden/ember-macro-test-helpers)

This comes with a `compute` helper. Here is a sample usage:

```js
import myMacro from 'my-app/macros/my-macro';
import compute from 'ember-macro-test-helpers/compute';

// ...

test('it works', function(assert) {
  compute({
    assert,
    computed: myMacro('key1', 'key2'),
    properties: {
      key1: 1,
      key2: 2
    },
    strictEqual: 3
  });
});
```

View all the possible ways to use [here](https://github.com/kellyselden/ember-macro-test-helpers/blob/master/tests/integration/compute-test.js).
