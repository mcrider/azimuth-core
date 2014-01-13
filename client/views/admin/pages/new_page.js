Template.new_page.events = {
  'click .submit': function (e) {
    e.preventDefault();
    var raw_title = $('.new-page-title').val();
    var raw_slug = $('.new-page-slug').val();

    // Validate input
    if (raw_title == '' || raw_slug == '') {
    	noty({text: 'Please enter values for all fields.', type: 'error'});
      return false;
    }

    var pageId = Azimuth.collections.Pages.insert({
      slug: raw_slug,
      template: "page_default"
    });

    // Add to title metadata attribute
    Azimuth.collections.Pages.update({_id: pageId}, {$push : {  "metadata" : { key: 'title', value: raw_title }}});

    // Add to navigation
    var updatePageNav = function(location, visible) {
      var currentPages = Azimuth.collections.Navigation.findOne({location: location}).pages;
      currentPages.push({title: raw_title, url: '/'+raw_slug, visible: visible});
      Azimuth.collections.Navigation.update(Azimuth.collections.Navigation.findOne({location: location})._id, {$set: {pages: currentPages}});
    };

    updatePageNav('header', utils.getSetting('addNewPagesToHeader'));
    updatePageNav('footer', utils.getSetting('addNewPagesToFooter'));

    Router.go('/' + raw_slug);
    adminPanel.hide();
  },
  'keyup .new-page-title': function () {
    var raw_title = $('.new-page-title').val();
    raw_title = raw_title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    $('.new-page-slug').val(raw_title);
  }
};
