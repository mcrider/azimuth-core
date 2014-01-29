Template.page_template_selector.templates = function () {
  return $.map(Azimuth.registry.pageTemplates, function (value, index) {
    return [value];
  });
};
Template.page_template_selector.events = {
  'change .page-template-selector': function () {
    var pageData = Azimuth.utils.getFormValues('#pageEditForm');
    Azimuth.collections.Pages.update({ _id: this._id }, { $set: pageData });
    // Redirect to current page
    Router.go(Router.current().path);
  }
};
Template.site_settings.selectIfCurrentTemplate = function (slug) {
  debugger;
  if (Azimuth.utils.getCurrentPage().template == slug) return 'selected';
};
