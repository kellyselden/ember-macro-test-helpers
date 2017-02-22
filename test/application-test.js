var expect = require('chai').expect;
var RSVP = require('rsvp');
var request = RSVP.denodeify(require('request'));
var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance | Application', function() {
  this.timeout(300000);

  var app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy', {
      fixturesPath: 'tests'
    }).then(function() {
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
    }).then(function() {
      return request('http://localhost:49741');
    }).then(function(response) {
      expect(response.body).to.contain('The app is working!');
    });
  });

  it('is disabled in production environment', function() {
    return app.startServer({
      command: 'fastboot',
      additionalArguments: ['--serve-assets', '-prod']
    }).then(function() {
      return request('http://localhost:49741');
    }).then(function(response) {
      expect(response.body).to.contain('Error: Could not find module `ember-macro-test-helpers/compute`');
    });
  });
});
