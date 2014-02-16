//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/accounts/login.js
//
// Helpers and event handlers for the login form.
//

Template.login.helpers({
  emailPlaceholder: function () {
    var fields;
    fields = Accounts.ui._options.passwordSignupFields;
    if (_.contains([
        'USERNAME_AND_EMAIL',
        'USERNAME_AND_OPTIONAL_EMAIL'
      ], fields)) {
      return 'Username or email';
    }
    return 'Email';
  }
});
Template.login.events({
  'submit #signIn': function (e) {
    e.preventDefault();
    Session.set('email', $('input[name="email"]').val());
    Session.set('password', $('input[name="password"]').val());
    return Meteor.loginWithPassword(Session.get('email'), Session.get('password'), function (error) {
      if (error) {
        return Session.set('error', error.reason);
      } else {
        return Router.go('/');
      }
    });
  },
  'click #logout': function (e) {
    Meteor.logout();
    $('.azimuth-container').removeClass('menu-open');
    Router.go('/');
  }
});