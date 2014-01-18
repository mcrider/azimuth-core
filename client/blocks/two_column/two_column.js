// Accompanying JS file for the two column block
Template.two_column = Template.two_column || {};
Template.two_column.label = '2 Column Block';
Template.two_column.description = 'A basic content block that takes up a sixth of a row';
var fields = [{
      name: 'contents',
      type: 'wysiwyg',
      label: 'Contents'
    }];
// This important method hooks the template into the CMS
Azimuth.registry.blockTemplate({
  name: 'two_column',
  label: '2 Column Block',
  fields: fields
});