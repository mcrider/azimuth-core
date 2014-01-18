// Accompanying JS file for the three column block
Template.three_column = Template.three_column || {};
Template.three_column.label = '3 Column Block';
Template.three_column.description = 'A basic content block that takes up 1/4 of a row';
var fields = [{
      name: 'contents',
      type: 'wysiwyg',
      label: 'Contents'
    }];
// This important method hooks the template into the CMS
Azimuth.registry.blockTemplate({
  name: 'three_column',
  label: '3 Column Block',
  fields: fields
});