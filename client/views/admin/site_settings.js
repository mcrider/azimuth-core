Template.site_settings.rendered = function () {
  // Initialize the list of themes
  return Meteor.call('listThemes', function (error, result) {
    Session.set('themeList', result);
  });
};
Template.site_settings.settings = function () {
  return Azimuth.collections.Settings.findOne();
};
Template.site_settings.pages = function () {
  return Azimuth.collections.Pages.find();
};
Template.site_settings.events = {
  'submit #siteSettingsForm': function (e) {
    e.preventDefault();
    var settings = utils.getFormValues('#siteSettingsForm');
    Azimuth.collections.Settings.update({ _id: this._id }, { $set: settings });
    noty({
      text: 'Site settings saved.',
      type: 'success'
    });
  }
};
Template.site_settings.indexPageEquals = function (slug) {
  return utils.getSetting('indexPage') === slug;
};