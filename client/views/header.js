// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

Template.header.rendered = function() {
  // Set page title
  document.title = utils.getSetting('siteName');


  // Remove mobile/desktop loginButtons (having two {loginButtons} loaded causes errors with accounts-ui-bootstrap-dropdown)
  if($('.mobile-login').is(":visible")) {
    $('.desktop-login').remove();
  } else {
    $('.mobile-login').remove();
  }

  if(utils.postHeaderRendered != 'undefined') utils.postHeaderRendered();

}

Template.header.helpers({
  displayName: function(){
    var user = Meteor.user();
    return (user.profile && user.profile.name) || user.username || (user.emails && user.emails[0] && user.emails[0].address);
  },
  loading : function() {
    return Session.get('loading');
  }
});

Template.header.headerNav = function () {
  var nav = Navigation.findOne({location: "header_active"});
  if (nav) return nav.pages;
  return false;
};

Template.header.pages = function () {
  return Pages.find();
};