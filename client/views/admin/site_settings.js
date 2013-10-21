Template.site_settings.rendered = function() {
  // Initialize the list of themes
  return Meteor.call('listThemes', function(error, result) {
    Session.set('themeList', result)
  });
}

Template.site_settings.settings = function() {
  return Settings.findOne();
}

Template.site_settings.pages = function () {
  return Pages.find();
};

Template.site_settings.themes = function () {
  return Session.get('themeList')
};

Template.site_settings.isCurrentTheme = function(theme) {
  if (theme == Settings.findOne().theme) return true;
  return false;
}


Template.site_settings.events = {
  'submit #siteSettingsForm': function(e) {
    e.preventDefault();
  	var settings = utils.getFormValues("#siteSettingsForm");
    Settings.update({_id: this._id}, {$set: settings});

		noty({text: 'Site settings saved.', type: 'success'});
  }
};

Template.site_settings.indexPageEquals = function (slug) {
  return utils.getSetting('indexPage') === slug;
};