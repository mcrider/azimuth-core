// Accompanying JS file for the header template.
// Describes the page's metadata and actions.
Template.header.rendered = function () {
  // Set page title
  document.title = Azimuth.utils.getSetting('siteName');
  // Remove mobile/desktop loginButtons (having two {loginButtons} loaded causes errors with accounts-ui-bootstrap-dropdown)
  if ($('.mobile-login').is(':visible')) {
    $('.desktop-login').remove();
  } else {
    $('.mobile-login').remove();
  }
  if (Azimuth.utils.postHeaderRendered != 'undefined')
    Azimuth.utils.postHeaderRendered();
};
Template.header.helpers({
  displayName: function () {
    var user = Meteor.user();
    return user.profile && user.profile.name || user.username || user.emails && user.emails[0] && user.emails[0].address;
  },
  loading: function () {
    return Session.get('loading');
  }
});
Template.header.headerNav = function () {
  return Azimuth.collections.Navigation.find({ location: 'header', root: true });
};
Template.header.pages = function () {
  return Azimuth.collections.Pages.find();
};
Template.header.child = function() {
  var navId = this.toString();
  return Azimuth.collections.Navigation.findOne(navId);
}