Meteor.call('entrySettings', function(err, data) {
  if (err) {
    console.log(err);
  }
  return Session.set('entrySettings', data);
});

Handlebars.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper('otherLoginServices', function() {
  return Accounts.oauth && Accounts.oauth.serviceNames().length > 0;
});

Handlebars.registerHelper('loginServices', function() {
  return Accounts.oauth.serviceNames();
});

Template.sign_up.events({
  'submit #signUp': function(event, t) {
    var email, emailRequired, fields, password, passwordErrors, signupCode, trimInput, username, usernameRequired;
    event.preventDefault();
    username = t.find('input[name="username"]') ? t.find('input[name="username"]').value : void 0;
    signupCode = t.find('input[name="signupCode"]') ? t.find('input[name="signupCode"]').value : void 0;
    email = t.find('input[type="email"]').value;
    password = t.find('input[type="password"]').value;
    fields = Accounts.ui._options.passwordSignupFields;
    trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };
    passwordErrors = (function(password) {
      var errMsg, msg;
      errMsg = [];
      msg = false;
      if (password.length < 7) {
        errMsg.push("7 character minimum password.");
      }
      if (password.search(/[a-z]/i) < 0) {
        errMsg.push("Password requires 1 letter.");
      }
      if (password.search(/[0-9]/) < 0) {
        errMsg.push("Password must have at least one digit.");
      }
      if (errMsg.length > 0) {
        msg = "";
        errMsg.forEach(function(e) {
          return msg = msg.concat("" + e + "\r\n");
        });
        Session.set('error', msg);
        return true;
      }
      return false;
    })(password);
    if (passwordErrors) {
      return;
    }
    email = trimInput(email);
    emailRequired = _.contains(['USERNAME_AND_EMAIL', 'EMAIL_ONLY'], fields);
    usernameRequired = _.contains(['USERNAME_AND_EMAIL', 'USERNAME_ONLY'], fields);
    if (usernameRequired && email.length === 0) {
      Session.set('error', 'Username is required');
      return;
    }
    if (emailRequired && email.length === 0) {
      Session.set('error', 'Email is required');
      return;
    }
  }
});
