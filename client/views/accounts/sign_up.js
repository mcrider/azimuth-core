//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/accounts/sign_up.js
//
// Helpers and event handlers for the signup form.
//

UI.body.capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
UI.body.otherLoginServices = function () {
  return Accounts.oauth && Accounts.oauth.serviceNames().length > 0;
}
UI.body.loginServices = function () {
  return Accounts.oauth.serviceNames();
}
Template.signUp.events({
  'submit #signUp': function (e, t) {
    e.preventDefault();
    // var username = t.find('input[name="username"]') ? t.find('input[name="username"]').value : false;
    var signupCode = t.find('input[name="signupCode"]') ? t.find('input[name="signupCode"]').value : false;
    var email = t.find('input[type="email"]').value;
    var password = t.find('input[type="password"]').value;
    var fields = Accounts.ui._options.passwordSignupFields;
    var trimInput = function (val) {
      return val.replace(/^\s*|\s*$/g, '');
    };
    var passwordErrors = function (password) {
        var errMsg = [];
        var msg = false;
        if (password.length < 4) {
          errMsg.push('4 character minimum password.');
        }
        // if (password.search(/[a-z]/i) < 0) {
        //   errMsg.push("Password requires 1 letter.");
        // }
        // if (password.search(/[0-9]/) < 0) {
        //   errMsg.push("Password must have at least one digit.");
        // }
        if (errMsg.length > 0) {
          msg = '';
          errMsg.forEach(function (e) {
            return msg = msg.concat('' + e + '\r\n');
          });
          Session.set('error', msg);
          return true;
        }
        return false;
      }(password);
    if (passwordErrors) {
      return;
    }
    email = trimInput(email);
    // emailRequired = _.contains(['USERNAME_AND_EMAIL', 'EMAIL_ONLY'], fields);
    // usernameRequired = _.contains(['USERNAME_AND_EMAIL', 'USERNAME_ONLY'], fields);
    // if (usernameRequired && email.length === 0) {
    //   Session.set('error', 'Username is required');
    //   return;
    // }
    var emailRequired = true;
    if (emailRequired && email.length === 0) {
      Session.set('error', 'Email is required');
      return;
    }
    // Everything okay so far, lets create the account
    return Meteor.call('accountsCreateUser', email, email, password, function (err, data) {
      if (err) {
        Session.set('error', err.reason);
        return;
      }
      Meteor.loginWithPassword(email, password);
      noty({
        text: 'Your account has been created!',
        type: 'success'
      });
      return Router.go('/');
    });
  }
});