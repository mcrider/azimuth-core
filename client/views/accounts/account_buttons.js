//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/accounts/account_buttons.js
//
// Helpers and event handlers for the login account buttons.
//

Handlebars.registerHelper('account_buttons', function () {
  return new Handlebars.SafeString(Template.account_buttons());
});
Template.account_buttons.helpers({
  profileUrl: function () {
    if (!Meteor.call('entryProfileRoute')) {
      return false;
    }
    return Router.path(Meteor.call('entryProfileRoute'));
  },
  wrapLinks: function () {
    return Meteor.call('entryWrapLinks');
  }
});