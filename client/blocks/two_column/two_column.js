//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/blocks/two_column/two_column.js
//
// Metadata and settings definition for the two column block template.
// The HTML for this template can be found in the respective directory in the view package.
//

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