//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/pages/home_page/home_page.js
//
// Metadata and settings definition for the home page template.
// The HTML for this template can be found in the respective directory in the view package.
//

Template.home_page = Template.home_page || {};
Template.home_page.label = 'Default Template';
Template.home_page.description = 'Basic one column layout';
// This important method hooks the template into the CMS
Azimuth.registry.pageTemplate({
  name: 'home_page',
  label: 'Home Page'
});