//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/blocks/block_tag_edit.js
//
// Helpers and event handlers for edit tag blocks.
//

Template.block_tag_edit.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.block_tag_edit.events = {
  'change .block-tag-selector': function (e) {
    var newTag = $(e.currentTarget).val(), pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { block_tag: newTag } });
    Azimuth.adminPanel.hide();
  }
};

Template.block_tag_edit.allTags = function () {
  return Azimuth.utils.getDistinctBlockTags();
};
Template.block_tag_edit.blockId = function () {
  return Azimuth.adminPanel.blockEdit.settings.blockId;
};
Template.block_tag_edit.currentBlockTags = function () {
  var block = Azimuth.adminPanel.blockEdit.getBlock();
  if (block && block.tag)
    return block.tag;
  else
    return '';
};
Template.block_tag_edit.selectIfCurrentTag = function (tag) {
  var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock()
  if (pageBlock.block_tag && pageBlock.block_tag == tag) return 'selected';
};