Package.describe({
  name: 'ghobbs:dispatch',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'A unified interface for calling APIs\
  based on the services linked to a user\'s account.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/gwhobbs/dispatch',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'underscore': '1.8.3',
  'underscore.string': '3.3.4',
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.1');
  api.use('ecmascript');
  api.mainModule('dispatch.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ghobbs:dispatch');
  api.mainModule('dispatch-tests.js', 'server');
});
