Template.page_settings.rendered = function () {
  $('select').selectize({ sortField: 'text' });
};
Template.page_settings.events = {
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
    // Delete from navs
    Azimuth.collections.Navigation.find().forEach(function (nav) {
      if (nav._id)
        Azimuth.collections.Navigation.update({ _id: nav._id }, { $pull: { 'pages': { url: '/' + page.slug } } });
    });
    Router.go('/');
    Azimuth.collections.Pages.remove(page._id);
    noty({
      text: 'Page successfully deleted.',
      type: 'success'
    });
  }
};
