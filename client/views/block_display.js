//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/block_display.js
//
// Handles the display and entry point of editing functions for blocks.
//

Template.block_display.currentBlockPage = function (zone) {
  return Session.equals('zone_' + zone + '_skip', this.valueOf() - 1) ? 'active' : '';
};
Template.block_display.zoneLabel = function (zone) {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
};
// Create classes for all block tags and append to the block
Template.block_display.classifyTags = function () {
  var block = Azimuth.collections.Blocks.findOne(this.block);
  if (block && block.tag) {
    return _.map(block.tag, function (tag) {
      return 'azimuth-tag-' + tag;
    }).join(' ');
  } else
    return '';
};
Template.block_display.events = {
  // Add a block to the beginning of the block zone
  'click .block-zone-add': function (e) {
    e.stopPropagation();
    zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
    if (!zone)
      return false;
    Session.set('blockFields', false);
    Session.set('addBlock', true);
    Azimuth.adminPanel.blockEdit.reset({newBlock: true, zone: zone});
    Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  // Edit a block zone's settings
  'click .block-zone-edit': function (e) {
    e.stopPropagation();
    Azimuth.adminPanel.blockEdit.reset({zone: zone});
    Azimuth.adminPanel.loadTemplate('block_zone_edit', 'menu-medium');
  }
};