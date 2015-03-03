//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/pages/page_settings.js
//
// Helpers and event handlers for the page settings template.
//

Template.page_settings.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.page_settings.events ({
  'click .delete-page': function(e) {
    e.preventDefault();
    Azimuth.utils.openModal('#deletePageModal');
  },
  'click .delete-page-confirm': function(e) {
    var page = Azimuth.utils.getCurrentPage();
    Azimuth.utils.closeModal('#deletePageModal');
    if (Azimuth.collections.Pages.find().count() == 1) {
      noty({
        text: 'Sorry, you can\'t delete the only page.',
        type: 'error'
      });
      return false;
    }
    Router.go('/');
    if(Azimuth.collections.Navigation.findOne({url: '/' + page.slug})) {
      var navId = Azimuth.collections.Navigation.findOne({url: '/' + page.slug})._id;
      Azimuth.collections.Navigation.remove(navId);
    }
    Azimuth.collections.Pages.remove(page._id);
    noty({
      text: 'Page successfully deleted.',
      type: 'success'
    });
  }
});
