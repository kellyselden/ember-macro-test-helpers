'use strict';

module.exports = {
  name: 'ember-macro-test-helpers',

  treeForAddonTestSupport(tree) {
    const Funnel = require('broccoli-funnel');

    let namespacedTree = new Funnel(tree, {
      destDir: this.moduleName(),
      annotation: `Addon#treeForTestSupport (${this.name})`
    });

    return this.preprocessJs(namespacedTree, '/', this.name, {
      registry: this.registry
    });
  }
};
