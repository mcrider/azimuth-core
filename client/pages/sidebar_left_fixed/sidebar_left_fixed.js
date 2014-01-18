// Accompanying JS file for the page template.
// Describes the page's metadata and actions.
Template.sidebar_left_fixed = Template.sidebar_left_fixed || {};
Template.sidebar_left_fixed.label = 'Sidebar on Left with fixed Nav';
Template.sidebar_left_fixed.description = 'Basic two column layout with left-hand sidebar containing a fixed navigation';
// This important method hooks the template into the CMS
Azimuth.registry.pageTemplate({
  name: 'sidebar_left_fixed',
  label: 'Sidebar on Left with fixed navigation'
});