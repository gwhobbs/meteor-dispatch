// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by dispatch.js.
import { Dispatch, Action } from "meteor/ghobbs:dispatch";

const microsoftUser = {
  services: {
    microsoft: true,
  },
};

const googleUser = {
  services: {
    google: true,
  },
};

const bothUser = {
  services: {
    microsoft: true,
    google: true,
  },
};

const neitherUser = {
  services: {},
};

const microsoftGetMailImplementation = user => 'Outlook';
const googleGetMailImplementation = user => 'Gmail';

const action = new Action('getMail');
action.registerImplementation('microsoft', microsoftGetMailImplementation);
action.registerImplementation('google', googleGetMailImplementation);
Dispatch.registerAction(action);

// Write your tests here!
// Here is an example.
Tinytest.add('dispatch - Microsoft user gets mail using Outlook.', (test) => {
  test.equal(Dispatch.getMail(microsoftUser), 'Outlook');
});

Tinytest.add('dispatch - Google user gets mail using Gmail.', (test) => {
  test.equal(Dispatch.getMail(googleUser), 'Gmail');
});

Tinytest.add('dispatch - User of both gets mail using Outlook or Gmail.', (test) => {
  test.include(['Gmail', 'Outlook'], Dispatch.getMail(bothUser));
});

Tinytest.add('dispatch - canGetMail returns true for user of both', (test) => {
  test.isTrue(Dispatch.canGetMail(bothUser));
});

Tinytest.add('dispatch - canGetMail returns true for user of one', (test) => {
  test.isTrue(Dispatch.canGetMail(bothUser));
});

Tinytest.add('dispatch - canGetMail returns false for user of neither', (test) => {
  test.isFalse(Dispatch.canGetMail(neitherUser));
});

Tinytest.add('dispatch - User of neither gets no-implementation error.', (test) => {
  let foundError = false;
  try {
    Dispatch.actions.getMail.do(neitherUser);
  } catch (error) {
    foundError = true;
  }
  test.isTrue(foundError);
});
