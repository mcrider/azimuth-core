//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/pages/page_default/page_default.js
//
// Metadata and settings definition for the default (one column) page template.
// The HTML for this template can be found in the respective directory in the view package.
//

Template.page_default = Template.page_default || {};
Template.page_default.label = 'Default Template';
Template.page_default.description = 'Basic one column layout';
// This important method hooks the template into the CMS
Azimuth.registry.pageTemplate({
  name: 'page_default',
  label: 'Default'
});