// Accompanying JS file for the row separator block
Template.row_separator = Template.row_separator || {};
Template.row_separator.label = 'Row Separator';
Template.row_separator.description = 'Creates a new row for a block zone';
var fields = [];
// This important method hooks the template into the CMS
Azimuth.registry.blockTemplate({
  name: 'row_separator',
  label: 'Row Separator',
  fields: fields
});