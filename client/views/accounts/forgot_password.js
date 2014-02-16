//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/accounts/forgot_password.js
//
// Helpers and event handlers for the 'forgot password' form.
//

Template.forgot_password.helpers({
  error: function () {
    return Session.get('error');
  }
});
Template.forgot_password.events({
  'submit #forgotPassword': function (event) {
    event.preventDefault();
    Session.set('email', $('input[type="email"]').val());
    if (Session.get('email').length === 0) {
      Session.set('error', 'Email is required');
      return;
    }
    return Accounts.forgotPassword({ email: Session.get('email') }, function (error) {
      if (error) {
        return Session.set('error', error.reason);
      } else {
        return Router.go('/');
      }
    });
  }
});