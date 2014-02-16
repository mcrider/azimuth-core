//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/pages/sidebar_left/sidebar_left.js
//
// Metadata and settings definition for the left sidebar page template.
// The HTML for this template can be found in the respective directory in the view package.
//

Template.sidebar_left = Template.sidebar_left || {};
Template.sidebar_left.label = 'Sidebar on Left';
Template.sidebar_left.description = 'Basic two column layout with left-hand sidebar';
// This important method hooks the template into the CMS
Azimuth.registry.pageTemplate({
  name: 'sidebar_left',
  label: 'Sidebar on Left'
});