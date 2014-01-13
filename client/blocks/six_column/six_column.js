// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.
Template.six_column = Template.six_column || {};

Template.six_column.label = '6 Column Block';
Template.six_column.description = 'A basic content block that takes up half a row';

var fields = [
  {name: 'contents', type: 'wysiwyg', label: 'Contents'}
];

// This important method hooks the template into the CMS
registry.blockTemplate({name: 'six_column', label: '6 Column Block', fields: fields})