'use strict';

const expect = require('chai').expect;
const RSVP = require('rsvp');
const request = RSVP.denodeify(require('request'));
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance | Application', function() {
  this.timeout(300000);

  let app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy', {
      fixturesPath: 'tests'
    }).then(() => {
      return app.runEmberCommand('install', 'ember-cli-fastboot');
    });
  });

  afterEach(function() {
    return app.stopServer();
  });

  it('is enabled in development environment', function() {
    return app.startServer({
      command: 'fastboot',
      additionalArguments: ['--serve-assets']
    }).then(() => {
      return request('http://localhost:49741');
    }).then(response => {
      expect(response.body).to.contain('The app is working!');
    });
  });

  it('is disabled in production environment', function() {
    return app.startServer({
      command: 'fastboot',
      additionalArguments: ['--serve-assets', '-prod', '--port', '49742']
    }).then(() => {
      return request('http://localhost:49742');
    }).then(response => {
      expect(response.body).to.contain('Error: Could not find module `ember-macro-test-helpers/compute`');
    });
  });
});
