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
        pkg.devDependencies['ember-cli-fastboot'] = process.env.npm_package_devDependencies_ember_cli_fastboot;
        pkg.devDependencies['fastboot'] = '1.0.0-rc.1';
      });
      return app.run('npm', 'install');
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
