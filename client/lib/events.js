// Common event handlers
window.Azimuth.events = {
  savePage: function (e) {
    var pageData = Azimuth.utils.getFormValues('#pageEditForm');
    e.preventDefault();
    Azimuth.collections.Pages.update({ _id: this._id }, { $set: pageData });
    noty({
      text: 'Your page changes were saved.',
      type: 'success'
    });
  },
  showDeletePageModal: function (e) {
    e.preventDefault();
    Azimuth.utils.openModal('#deletePageModal');
  },
  deletePage: function () {
    var page = Azimuth.utils.getCurrentPage();
    var title = page.title;
    Azimuth.utils.closeModal('#deletePageModal');
    // Delete from navs
    Azimuth.collections.Navigation.find().forEach(function (nav) {
      if (nav._id)
        Azimuth.collections.Navigation.update({ _id: nav._id }, { $pull: { 'pages': { id: page._id } } });
    });
    Router.go('/');
    Azimuth.collections.Pages.remove(page._id);
    noty({
      text: '"' + title + '" was successfully deleted.',
      type: 'success'
    });
  }
};