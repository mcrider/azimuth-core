// Accompanying JS file for the default page template.
// Describes the page's metadata and actions.
Template.twelve_column = Template.twelve_column || {};
Template.twelve_column.label = '12 Column Block';
Template.twelve_column.description = 'A basic content block that takes up a full row';
var fields = [{
      name: 'contents',
      type: 'wysiwyg',
      label: 'Contents'
    }];
// This important method hooks the template into the CMS
registry.blockTemplate({
  name: 'twelve_column',
  label: '12 Column Block',
  fields: fields
});