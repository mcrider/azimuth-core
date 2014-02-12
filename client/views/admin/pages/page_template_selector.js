Template.page_template_selector.templates = function () {
  return $.map(Azimuth.registry.pageTemplates, function (value, index) {
    return [value];
  });
};
Template.page_template_selector.events = {
  'change .page-template-selector': function (e) {
    var newTemplate = $(e.currentTarget).val();
    var pageId = Azimuth.utils.getCurrentPage()._id;
    Azimuth.collections.Pages.update({ _id: pageId }, { $set: { template: newTemplate } });
    // Redirect to current page
    // Router.go(Router.current().path);
  }
};
Template.site_settings.selectIfCurrentTemplate = function (slug) {
  debugger;
  if (Azimuth.utils.getCurrentPage().template == slug) return 'selected';
};
