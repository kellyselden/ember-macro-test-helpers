import EmberObject from 'ember-object';
import { readOnly } from 'ember-computed';
import RSVP from 'rsvp';
import compute from 'ember-macro-test-helpers/compute';
import { module, test } from 'qunit';

const { resolve } = RSVP;

module('Integration | compute');

test('it works without properties', function(assert) {
  compute({
    assert,
    computed: readOnly('key'),
    strictEqual: undefined
  });
});

test('it accepts a different base class', function(assert) {
  compute({
    assert,
    baseClass: EmberObject.extend({
      foo: 'bar'
    }),
    computed: readOnly('foo'),
    strictEqual: 'bar'
  });
});

test('it uses properties to calculate value', function(assert) {
  compute({
    assert,
    computed: readOnly('key'),
    properties: {
      key: 'test value'
    },
    strictEqual: 'test value'
  });
});

test('it will strict equal with correct arguments', function(assert) {
  let args;

  compute({
    assert: {
      strictEqual () { args = [...arguments]; }
    },
    computed: readOnly('key'),
    properties: {
      key: 'foo'
    },
    strictEqual: 'bar',
    message: 'baz'
  });

  assert.deepEqual(args, ['foo', 'bar', 'baz']);
});

test('it will deep equal', function(assert) {
  compute({
    assert,
    computed: readOnly('key'),
    properties: {
      key: ['test value']
    },
    deepEqual: ['test value']
  });
});

test('it will deep equal with correct arguments', function(assert) {
  let args

  compute({
    assert: {
      deepEqual () { args = [...arguments] }
    },
    computed: readOnly('key'),
    properties: {
      key: 'foo'
    },
    deepEqual: 'bar',
    message: 'baz'
  });

  assert.deepEqual(args, ['foo', 'bar', 'baz'])
});

test('it will allow you to calculate the assertion', function(assert) {
  compute({
    assert,
    computed: readOnly('key'),
    properties: {
      key: ['test value']
    },
    assertion([value]) {
      return value === 'test value';
    }
  });
});

test('it will do the assertion with correct arguments', function(assert) {
  let args

  compute({
    assert: {
      ok () { args = [...arguments] }
    },
    computed: readOnly('key'),
    properties: {
      key: 'foo'
    },
    assertion(value) {
      assert.equal(value, 'foo', 'argument of assertion')
      return 'bar'
    },
    message: 'baz'
  });

  assert.deepEqual(args, ['bar', 'baz'], 'arguments of assert')
});

test('it can assert readOnly', function(assert) {
  compute({
    assert,
    computed: readOnly('key'),
    assertReadOnly: true
  });
});

test('it can assert readOnly with correct arguments', function(assert) {
  let args;

  compute({
    assert: {
      throws () { args = [...arguments] }
    },
    computed: readOnly('key'),
    assertReadOnly: true,
    message: 'baz'
  });

  assert.equal(args[1].toString(), '/Cannot set read-only property/', 'arg 1')
  assert.equal(args[2], 'baz', 'arg 2')
});

test('it is promise-aware', function(assert) {
  return compute({
    assert,
    computed: readOnly('key'),
    properties: {
      key: resolve('test value')
    },
    strictEqual: 'test value'
  }).promise;
});

test('it returns result', function(assert) {
  let { result } = compute({
    computed: readOnly('key'),
    properties: {
      key: 'test value'
    }
  });

  assert.strictEqual(result, 'test value');
});

test('it returns subject', function(assert) {
  let { subject } = compute({
    computed: readOnly('key'),
    properties: {
      key: 'test value'
    }
  });

  assert.strictEqual(subject.get('computed'), 'test value');
});
