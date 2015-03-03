//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/site_settings.js
//
// Helpers and event handlers for the site settings template.
//

Template.site_settings.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.site_settings.events ({
  'click .save-site-settings': function (e) {
    e.preventDefault();
    var settings = Azimuth.utils.getFormValues('#siteSettingsForm');
    Azimuth.collections.Settings.update({ _id: this._id }, { $set: settings });
    noty({
      text: 'Site settings saved.',
      type: 'success'
    });
  }
});
Template.site_settings.helpers ({
    settings: function () {
        return Azimuth.collections.Settings.findOne();
    },
    pages: function () {
    return Azimuth.collections.Pages.find();
    },
    allPages: function() {
    return Azimuth.collections.Pages.find();
    },
    checkSetting: function(settingName) {
    if (Azimuth.utils.getSetting(settingName)) return 'checked';
    },
    selectIfIndexEquals: function (slug) {
    if (Azimuth.utils.getSetting('indexPage') === slug) return 'selected';
    }

});