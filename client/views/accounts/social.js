var capitalize;

Template.social.helpers({
  buttonText: function() {
    return Session.get('buttonText');
  },
  google: function() {
    if (this[0] === 'g' && this[1] === 'o') {
      return true;
    }
  }
});

Template.social.events({
  'click .btn': function(event) {
    var callback, loginWithService, options, serviceName;
    serviceName = $(event.target).attr('id').split('-')[1];
    var loginButtonsSession = Accounts._loginButtonsSession;
    callback = function(err) {
      if (!err) {
        return Router.go('/');
      } else if (err instanceof Accounts.LoginCancelledError) {

      } else if (err instanceof ServiceConfiguration.ConfigError) {
        return loginButtonsSession.configureService(serviceName);
      } else {
        return loginButtonsSession.errorMessage(err.reason || "Unknown error");
      }
    };
    loginWithService = Meteor["loginWith" + capitalize(serviceName)];
    options = {};
    if (Accounts.ui._options.requestPermissions[serviceName]) {
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    }
    if (Accounts.ui._options.requestOfflineToken[serviceName]) {
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    }
    loginWithService(options, callback);
    return Router.go('/');
  }
});

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
