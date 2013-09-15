// Common event handlers

events = {
  savePage: function (e) {
    var pageData = utils.getFormValues("#pageEditForm");
    e.preventDefault();
    Pages.update({_id: this._id}, {$set: pageData});
		noty({text: 'Your page changes were saved.', type: 'success'});
  },
  showDeletePageModal: function (e) {
  	e.preventDefault();
    utils.openModal('#deletePageModal');
  },
  deletePage: function () {
    var page = utils.getCurrentPage();
    var title = page.title;
    utils.hideModal('#deletePageModal');

    // Delete from navs
    Navigation.find().forEach(function(nav) {
      if(nav._id) Navigation.update({ _id: nav._id }, {$pull : {  "pages" : { slug: page.slug }}});
    });

    Meteor.Router.to('/');
    Pages.remove(page._id);

		noty({text: '"' + title + '" was successfully deleted.', type: 'success'});
  }
};