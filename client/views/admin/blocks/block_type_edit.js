//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/blocks/block_type_edit.js
//
// Helpers and event handlers for editing type blocks.
//

Template.block_type_edit.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.block_type_edit.events = {
  'change .block-type-selector': function (e) {
    var newType = $(e.currentTarget).val(), pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { block_type: newType } });
    Azimuth.adminPanel.hide();
  }
};
Template.block_type_edit.templates = function () {
  return $.map(Azimuth.registry.blockTemplates, function (value, index) {
    return [value];
  });
};
Template.block_type_edit.selectIfCurrentType = function (type) {
  var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock()
  if (pageBlock.block_type && pageBlock.block_type == type) return 'selected';
};


