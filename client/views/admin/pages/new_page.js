Template.new_page.events = {
  'click .submit': function (e) {
    e.preventDefault();
    var rawTitle = $('.new-page-title').val();
    var rawSlug = $('.new-page-slug').val();
    // Validate input
    if (rawTitle == '' || rawSlug == '') {
      noty({
        text: 'Please enter values for all fields.',
        type: 'error'
      });
      return false;
    }
    var pageId = Azimuth.collections.Pages.insert({
      slug: rawSlug,
      label: rawTitle,
      template: 'page_default',
      meta: [{
        key: 'title',
        value: rawTitle
      }]
    });
    // Add to navigation
    var updatePageNav = function (location, title, slug) {
      var navData = {
        location: location,
        title: title,
        url: '/' + slug,
        root: true
      };
      Azimuth.collections.Navigation.insert(navData)
    };
    if (Azimuth.utils.getSetting('addNewPagesToHeader'))
      updatePageNav('header', rawTitle, rawSlug);
    if (Azimuth.utils.getSetting('addNewPagesToFooter'))
      updatePageNav('footer', rawTitle, rawSlug);
    Router.go('/' + rawSlug);
    adminPanel.hide();
  },
  'keyup .new-page-title': function () {
    var rawTitle = $('.new-page-title').val();
    rawTitle = rawTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    $('.new-page-slug').val(rawTitle);
  }
};