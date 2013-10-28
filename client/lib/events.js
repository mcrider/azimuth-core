// Common event handlers

window.events = {
  savePage: function (e) {
    var pageData = utils.getFormValues("#pageEditForm");
    e.preventDefault();
    Azimuth.collections.Pages.update({_id: this._id}, {$set: pageData});
		noty({text: 'Your page changes were saved.', type: 'success'});
  },
  showDeletePageModal: function (e) {
  	e.preventDefault();
    utils.openModal('#deletePageModal');
  },
  deletePage: function () {
    var page = utils.getCurrentPage();
    var title = page.title;
    utils.closeModal('#deletePageModal');

    // Delete from navs
    Azimuth.collections.Navigation.find().forEach(function(nav) {
      if(nav._id) Azimuth.collections.Navigation.update({ _id: nav._id }, {$pull : {  "pages" : { slug: page.slug }}});
    });

    Router.go('/');
    Azimuth.collections.Pages.remove(page._id);

		noty({text: '"' + title + '" was successfully deleted.', type: 'success'});
  }
};