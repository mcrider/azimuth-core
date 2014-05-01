//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/lib/helpers.js
//
// Helpers (additional public functions) for templates
//

// Renders a form element using a template in views/form/
UI.registerHelper('formHelper', function () {
  if (this.type == 'wysiwyg')
    this.uniqueId = this.fieldName + '_' + Math.random().toString(36).substring(7);
  // FIXME: Return error if type not valid template
  // return Template[this.type].withData(this);
  return Template[this.type];
});
// Get a human readable time from a timestamp
UI.registerHelper('humanReadableTime', function (timestamp) {
  return Azimuth.utils.displayHumanReadableTime(timestamp);
});
// Get a setting value
UI.registerHelper('getSetting', function (settingName) {
  return Azimuth.utils.getSetting(settingName);
});
// Get a setting value as a boolean
UI.registerHelper('getSetting', function (settingName) {
  return Azimuth.utils.getSetting(settingName);
});
// Return the current page object
UI.registerHelper('page', function () {
  return Azimuth.utils.getCurrentPage();
});
// Custom helper to meteor-roles package to test if user is an admin
UI.registerHelper('isAdmin', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, ['admin']);
});
// Custom helper to meteor-roles package to test if user is an autho
UI.registerHelper('isAuthor', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, ['author']);
});
// Custom helper to meteor-roles package to test if user is an admin or an author
UI.registerHelper('isAuthorOrAdmin', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, [
    'author',
    'admin'
  ]);
});
// Check if registration is open to the public
UI.registerHelper('openRegistration', function () {
  return Azimuth.utils.getSetting('openRegistration') || !Session.get('usersExist');
});

// Get an appropriate handle for the user or false if not signed in
UI.registerHelper('signedInAs', function () {
  if (Meteor.user() && Meteor.user().username) {
    return Meteor.user().username;
  } else if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
    return Meteor.user().profile.name;
  } else if (Meteor.user() && Meteor.user().emails && Meteor.user().emails[0]) {
    return Meteor.user().emails[0].address;
  } else {
    return false;
  }
});
