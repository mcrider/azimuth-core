//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/pages/sidebar_right/sidebar_right.js
//
// Helpers and event handlers for right sidebar page template.
// The HTML for this template can be found in the respective directory in the view package.
//

Template.sidebar_right = Template.sidebar_right || {};
Template.sidebar_right.label = 'Sidebar on right';
Template.sidebar_right.description = 'Basic two column layout with right-hand sidebar';
// This important method hooks the template into the CMS
Azimuth.registry.pageTemplate({
  name: 'sidebar_right',
  label: 'Sidebar on Right'
});