'use strict';

const expect = require('chai').expect;
const denodeify = require('denodeify');
const request = denodeify(require('request'));
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance | Application', function() {
  this.timeout(300000);

  let app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy', {
      fixturesPath: 'tests',
      skipInstall: true
    }).then(() => {
      app.editPackageJSON(pkg => {
        pkg.devDependencies['ember-cli-fastboot'] = process.env.npm_package_devDependencies_ember_cli_fastboot;
      });

      return app.run('npm', 'install');
    });
  });

  afterEach(function() {
    return app.stopServer();
  });

  it('is enabled in development environment', function() {
    return app.startServer().then(() => {
      return request({
        url: 'http://localhost:49741',
        headers: { 'Accept': 'text/html' }
      });
    }).then(response => {
      expect(response.body).to.contain('The app is working!');
    });
  });

  it('is disabled in production environment', function() {
    return app.startServer({
      additionalArguments: ['-prod']
    }).then(() => {
      return request({
        url: 'http://localhost:49741',
        headers: { 'Accept': 'text/html' }
      });
    }).then(response => {
      expect(response.body).to.contain('Error: Could not find module `ember-macro-test-helpers/compute`');
    });
  });
});
