/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-macro-test-helpers',

  included(app) {
    this.app = app;

    return this._super.included.apply(this, arguments);
  },

  treeFor() {
    if (this.app.env === 'production') {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  }
};
