# Dispatch
__A way to call one of several APIs for a given action based on what services
a Meteor user has linked to his account__

## Getting started

To add the package, run:

```
meteor add ghobbs:dispatch
```

## Why?

Say you want to add the ability for a user to set calendar events in their chosen
platform using your app, and you want to support both Google and Microsoft Outlook.
Dispatch lets you register a unified api for calling `actions` (like adding
calendar events) that will dispatch one of several equivalent `implementations`
on different platforms depending on what specific `services` a user has linked to her
account (see [meteor-link-accounts](https://github.com/yubozhao/meteor-link-accounts/)).

## Usage

Let's say I want to add calendar events to users' calendars with either Outlook
or Google Calendar depending on the user's available linked accounts. I have an
Outlook-specific implementation (`addEventOutlook(args)`) and a Google-specific
implementation (`addEventGoogle(args)`). I would add them both to an Action:

```javascript
const addEvent = new Action('addEvent');
addEvent.registerImplementation('microsoft', addEventOutlook);
addEvent.registerImplementation('google', addEventGoogle);
```

Then register the action with Disaptch:

```javascript
Dispatch.registerAction(addEvent);
```

Now I can call this action with:

```javascript
Dispatch.addEvent(Meteor.user(), args);
```

And it will be mapped onto any available service that can handle this action
to which the user has registered. You can check if a user has linked one
of the appropriate services with:

```javascript
Dispatch.canAddEvent(Meteor.user());
```

## More info

Dispatch has three main components:
* **Service:** an of the external APIs you want to call
* **Implementation:** a service-specific implementation for an action
* **Action:** a general thing you want to do that could be accomplished on one of several APIs.
* **Dispatch:** a container object that give you a nice interface to check what actions are available for a user and to do those actions

## Todo

* A predictable/controllable way to handle cases where a users is linked with two services that can perform the same action
* A way to also take into account the scopes available to a user, and whether or not she has a refresh token.
