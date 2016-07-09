// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See dispatch-tests.js for an example of importing.
export const name = 'dispatch';

import { capitalize, camelize } from 'underscore.string';
import { intersection } from 'underscore';

export const Dispatch = {
  actions: {},
  registerAction(action) {
    this.actions[action.name] = action;
    this[action.name] = action.do.bind(action);
    this['can' + capitalize(action.name, false)] = action.canBeDoneByUser.bind(action);
  }
};

export class Action {
  constructor(name) {
    this.name = name;
    this.implementations = {};
  }
  supportedServices() {
    return Object.keys(this.implementations);
  }
  registerImplementation(serviceName, implementation) {
    this.implementations[serviceName] = implementation;
  }
  compatibleImplementationForUser(user) {
    const implementationNames = intersection(
      Object.keys(user.services),
      this.supportedServices()
    );
    if (implementationNames && implementationNames.length) {
      return this.implementations[implementationNames[0]];
    }
  }
  canBeDoneByUser(user) {
    // check whether the user is connected to at least one service that can
    // do this action
    return !!this.compatibleImplementationForUser(user);
  }
  do(user, args) {
    const implementation = this.compatibleImplementationForUser(user);
    if (!implementation) {
      throw new Meteor.Error('dispatch.no-implementation',
        'There is no registered implementation that is available for this user');
    }
    return implementation(args);
  }
}
