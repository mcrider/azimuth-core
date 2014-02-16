//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/admin_panel.js
//
// Helpers and event handlers for the main admin panel template.
//

Template.admin_panel.rendered = function () {
  // Display the admin panel if the user is authorized
  if (Meteor.user() && Roles.userIsInRole(Meteor.user(), [
      'admin',
      'author'
    ])) {
    $('.azimuth-container').delay(500).queue(function (next) {
      $(this).addClass('menu-open');
      next();
    });
  }
};
Template.admin_panel.events = {
  'click .action': function (e) {
    $('.action-links li').removeClass('active');
    if ($('.azimuth-container').hasClass(this.template)) {
      $(e.currentTarget).parent('li').removeClass('active');
    } else
      $(e.currentTarget).parent('li').addClass('active');
    var template = this.template;
    var size = this.size;
    Azimuth.adminPanel.loadTemplate(template, size);
  },
  // Edit a block's content and tags
  'click .block-edit': function (e) {
    e.stopPropagation();
    var pageBlockId = Azimuth.adminPanel.blockEdit.settings.pageBlockId;
    Azimuth.adminPanel.blockEdit.reset({newBlock: false, pageBlockId: pageBlockId});
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);
    if (pageBlock && pageBlock.block_tag) {
    } else if (pageBlock && pageBlock.block_type) {
    } else if (pageBlock && pageBlock.block) {
      var block = Azimuth.collections.Blocks.findOne(pageBlock.block);
      if (block && block.template) {
        Azimuth.adminPanel.blockEdit.settings.pageBlockId = pageBlock._id;
        Azimuth.adminPanel.blockEdit.settings.blockId = block._id;
        // Get template's fields from block registry, and inject values for each field
        var registryFields = Azimuth.registry.blockTemplates[block.template].fields;
        _.each(registryFields, function (registryField) {
          var fieldName = registryField.name;
          registryField.value = block[fieldName];
        });
        Session.set('blockFields', registryFields);
        Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
      } else {
        console.log('Block not found (or has no template specified)');
      }
    } else {
      console.log('Could not edit block.');
      return false;
    }
  },
  'click .block-add': function (e) {
    e.preventDefault();
    e.stopPropagation();
    var zone = Azimuth.adminPanel.blockEdit.settings.zone;
    if (!zone)
      return false;
    Session.set('blockFields', false);
    Azimuth.adminPanel.blockEdit.reset({newBlock: true, zone: zone, insertAfter: this.seq});
    Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  'click .block-move-left': function (e) {
    e.stopPropagation();
    // Ensure we can even move the block backwards
    if (this.seq == 1) {
      noty({
        text: 'Could not move block.',
        type: 'error'
      });
      return false;
    }
    // Get previous pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({
        page: this.page,
        zone: this.zone,
        seq: this.seq - 1
      });
    // Decrement current pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: this._id }, { $set: { seq: this.seq - 1 } });
    // Increment target pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: targetPageBlock._id }, { $set: { seq: this.seq } });
  },
  'click .block-move-right': function (e) {
    e.stopPropagation();
    // Ensure we can even move the block forwards
    var lastPageBlock = Azimuth.collections.PageBlocks.findOne({}, { sort: { seq: -1 } });
    if (!lastPageBlock || lastPageBlock.seq <= this.seq) {
      noty({
        text: 'Could not move block.',
        type: 'error'
      });
      return false;
    }
    // Get next pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({
        page: this.page,
        zone: this.zone,
        seq: this.seq + 1
      });
    // Increment current pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: this._id }, { $set: { seq: this.seq + 1 } });
    // Decrement target pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: targetPageBlock._id }, { $set: { seq: this.seq } });
  }
};
Template.admin_panel.actions = function () {
  return Azimuth.adminPanel.actions;
};