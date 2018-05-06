ember-macro-test-helpers
==============================================================================

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

Installation
------------------------------------------------------------------------------

```
ember install ember-macro-test-helpers
```


Usage
------------------------------------------------------------------------------

View all the possible ways to use [here](https://github.com/kellyselden/ember-macro-test-helpers/blob/master/tests/integration/compute-test.js).


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-macro-test-helpers`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
