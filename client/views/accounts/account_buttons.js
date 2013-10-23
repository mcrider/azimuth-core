
Handlebars.registerHelper("account_buttons", function() {
  return new Handlebars.SafeString(Template.account_buttons());
});

Template.account_buttons.helpers({
  profileUrl: function() {
    if (!Meteor.call('entryProfileRoute')) {
      return false;
    }
    return Router.path(Meteor.call('entryProfileRoute'));
  },
  wrapLinks: function() {
    return Meteor.call('entryWrapLinks');
  }
});
