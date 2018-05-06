'use strict';

module.exports = {
  name: 'ember-macro-test-helpers',

  included(app) {
    this.app = app;

    return this._super.included.apply(this, arguments);
  },

  treeForAddon() {
    if (this.app.env === 'production') {
      return;
    }

    return this._super.treeForAddon.apply(this, arguments);
  }
};
