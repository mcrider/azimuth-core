//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/blocks/row_separator/row_separator.js
//
// Metadata and settings definition for the row separator block template.
// The HTML for this template can be found in the respective directory in the view package.
//

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