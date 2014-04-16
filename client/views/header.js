//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/header.js
//
// Helpers for the header template.
//

Template.header.rendered = function () {
  // Remove mobile/desktop loginButtons (having two {loginButtons} loaded causes errors with accounts-ui-bootstrap-dropdown)
  if ($('.mobile-login').is(':visible')) {
    $('.desktop-login').remove();
  } else {
    $('.mobile-login').remove();
  }
  if (Azimuth.utils.postHeaderRendered != 'undefined')
    Azimuth.utils.postHeaderRendered();
};
Template.header.displayName = function () {
  var user = Meteor.user();
  return user.profile && user.profile.name || user.username || user.emails && user.emails[0] && user.emails[0].address;
};

Template.header.headerNav = function () {
  return Azimuth.collections.Navigation.find({ location: 'header', root: true });
};
Template.header.pages = function () {
  return Azimuth.collections.Pages.find();
};
Template.header_nav_child.rendered = function() {
  if (Azimuth.utils.postNavRendered != 'undefined')
    Azimuth.utils.postNavRendered();
}
Template.header_nav_child.child = function() {
  var navId = this.toString();
  return Azimuth.collections.Navigation.findOne(navId);
}


