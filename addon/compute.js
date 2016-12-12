import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import { default as set, setProperties } from 'ember-metal/set';

export default function({
  assert,
  computed,
  properties,
  strictEqual,
  deepEqual,
  assertion,
  assertReadOnly
}) {
  let subject = EmberObject.extend({
    computed
  }).create();

  // compute initial value
  // to test recomputes
  get(subject, 'computed');

  setProperties(subject, properties);

  let result = get(subject, 'computed');

  function doAssertion(result) {
    if (assertion) {
      assert.ok(assertion(result));
    } else if (deepEqual) {
      assert.deepEqual(result, deepEqual);
    } else if (assertReadOnly) {
      let func = () => set(subject, 'computed', 'assert read only');
      assert.throws(func, /Cannot set read-only property/);
    } else if (assert) {
      assert.strictEqual(result, strictEqual);
    }
  }

  let promise;
  if (typeof result === 'object' && typeof result.then === 'function') {
    promise = result.then(doAssertion);
  } else {
    doAssertion(result);
  }

  return {
    subject,
    result,
    promise
  };
}
