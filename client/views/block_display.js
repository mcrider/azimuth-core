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

Template.block_display.helpers({
  blockData: function (zone) {
    var blockData = {},
        zone = this.zone;
    if (!zone) {
      console.log('Block zone not specified');
      return false;
    }
    // Get zone settings for paging and sorting
    var page = Azimuth.utils.getCurrentPage();
    var limit = page['zone_' + zone + '_limit'] ? parseInt(page['zone_' + zone + '_limit'], 10) : 0;
    // The number of blocks to show per 'page' of blocks
    var skip = Session.get(page.slug + '_' + zone + '_skip') ? Session.get(page.slug + '_' + zone + '_skip') * limit : 0;
    // The current 'page' of blocks
    if (limit > 0) {
      blockData.pageBlocks = Azimuth.collections.PageBlocks.find({
        page: page._id,
        zone: zone
      }, {
        skip: skip,
        limit: limit,
        sort: { seq: 1 }
      });
    } else {
      blockData.pageBlocks = Azimuth.collections.PageBlocks.find({
        page: page._id,
        zone: zone
      }, { sort: { seq: 1 } });
    }
    var numSets = limit > 0 ? Math.ceil(Azimuth.collections.PageBlocks.find({
        page: page._id,
        zone: zone
      }).count() / limit) : false;
    blockData.numSets = numSets > 1 ? _.range(1, numSets + 1) : false;
    blockData.zone = zone;
    return blockData;
  },
  currentBlockPage: function (data) {
    var zone = data.hash.zone,
        activeClass = data.hash.activeClass || 'active',
        page = Azimuth.utils.getCurrentPage();
    if(!Session.get(page.slug + '_' + zone + '_skip')) {
      Session.set(page.slug + '_' + zone + '_skip', 0);
    }
    return Session.equals(page.slug + '_' + zone + '_skip', this.valueOf() - 1) ? activeClass : '';
  },
  zoneLabel: function (zone) {
    return zone.charAt(0).toUpperCase() + zone.slice(1);
  },
  classifyTags: function () {
    // Create classes for all block tags and append to the block
    var block = Azimuth.collections.Blocks.findOne(this.block);
    if (block && block.tag) {
      return _.map(block.tag, function (tag) {
        return 'azimuth-tag-' + tag;
      }).join(' ');
    } else
      return '';
  }
});
Template.block_display.events = {
  // Add a block to the beginning of the block zone
  'click .block-zone-add': function (e) {
    e.stopPropagation();
    var zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
    if (!zone)
      return false;
    Session.set('blockFields', false);
    Session.set('addBlock', true);
    Azimuth.adminPanel.blockEdit.reset({newBlock: true, zone: zone});
    Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  // Edit a block zone's settings
  'click .block-zone-edit': function (e) {
    debugger;
    e.stopPropagation();
    var zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
    Azimuth.adminPanel.blockEdit.reset({zone: zone});
    Azimuth.adminPanel.loadTemplate('block_zone_edit', 'menu-medium');
  },
  'click .page': function (e) {
    var page = Azimuth.utils.getCurrentPage();
    var zone = $(e.currentTarget).closest('.pagination').data('zone');
    Session.set(page.slug + '_' + zone + '_skip', this.valueOf() - 1);
  }
};

Template.renderPageBlock.helpers({
  block_template: function () {
    var pageBlock = this.data;
    if (pageBlock.block_tag) {
      // Fetch blocks with a given tag and add to fragments
      var blocks = Azimuth.collections.Blocks.find({ tag: pageBlock.block_tag });
      return Template.block_set.extend({blocks: blocks});
    } else if (pageBlock.block_type) {
      // Fetch each block with the given template (== type) and add to fragments
      var blocks = Azimuth.collections.Blocks.find({ template: pageBlock.block_type });
      return Template.block_set.extend({blocks: blocks});
    } else {
      var block = Azimuth.collections.Blocks.findOne(pageBlock.block);
      return Azimuth.utils.renderBlock(block);
    }
  }
});