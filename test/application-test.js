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
      app.editPackageJSON(function(pkg) {
        pkg['devDependencies']['ember-cli-fastboot'] = '1.0.0-beta.13';
        pkg['devDependencies']['fastboot'] = '1.0.0-rc.1';
      });
      return app.run('npm', 'install');
    });
  });

  after(function() {
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
      additionalArguments: ['--serve-assets', '-prod'],
      port: '49742'
    }).then(function() {
      return request('http://localhost:49742');
    }).then(function(response) {
      expect(response.body).to.contain('Error: Could not find module `ember-macro-test-helpers/compute`');
    });
  });
});
