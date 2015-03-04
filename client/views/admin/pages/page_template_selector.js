//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/pages/page_template_selector.js
//
// Setup the page template selector dropdown.
//

Template.page_template_selector.helpers({
    templates: function () {
        return $.map(Azimuth.registry.pageTemplates, function (value, index) {
            return [value];
        });
    },
    selectIfCurrentTemplate: function (slug) {
    if (Azimuth.utils.getCurrentPage().template == slug) return 'selected';
    }
});
Template.page_template_selector.events({
  'change .page-template-selector': function (e) {
    var newTemplate = $(e.currentTarget).val();
    var pageId = Azimuth.utils.getCurrentPage()._id;
    Azimuth.collections.Pages.update({ _id: pageId }, { $set: { template: newTemplate } });
  }
});
