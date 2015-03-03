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
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);
    Azimuth.adminPanel.blockEdit.reset({newBlock: false, pageBlockId: pageBlockId});
    if (pageBlock && pageBlock.block_tag) {
      // Display block tag edit form
      Azimuth.adminPanel.loadTemplate('block_tag_edit', 'menu-large');
    } else if (pageBlock && pageBlock.block_type) {
      // Display block type edit form
      Azimuth.adminPanel.loadTemplate('block_type_edit', 'menu-large');
    } else if (pageBlock && pageBlock.block) {
      // Display block edit form
      var block = Azimuth.collections.Blocks.findOne(pageBlock.block);
      if (block && block.template) {
        Azimuth.adminPanel.blockEdit.settings.blockId = block._id;
        // Get template's fields from block registry, and inject values for each field
        var registryFields = Azimuth.registry.blockTemplates[block.template].fields;
        _.each(registryFields, function (registryField) {
          var fieldName = registryField.name;
          registryField.value = block[fieldName];
        });
        Session.set('blockFields', registryFields);
        Session.set('addBlock', false);
        Azimuth.adminPanel.loadTemplate('block_edit', 'menu-large');
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
    Session.set('addBlock', true);
    var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    Azimuth.adminPanel.blockEdit.reset({newBlock: true, zone: zone, insertBefore: false, insertAfter: pageBlock.seq});
    Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  'click .block-break-after': function (e) {
    e.preventDefault();
    $('.azimuth-block-edit-toggle, .azimuth-block-edit-panel').removeClass('active');
    var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    Azimuth.collections.PageBlocks.update({ _id: pageBlock._id }, { $set: { break: !pageBlock.break } });
  },
  'click .block-move-left': function (e) {
    e.preventDefault();
    $('.azimuth-block-edit-toggle, .azimuth-block-edit-panel').removeClass('active');
    var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    // Ensure we can even move the block backwards
    if (pageBlock.seq == 1) {
      noty({
        text: 'Could not move block.',
        type: 'error'
      });
      return false;
    }
    // Get previous pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({
        page: pageBlock.page,
        zone: pageBlock.zone,
        seq: pageBlock.seq - 1
      });
    // Decrement current pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: pageBlock._id }, { $set: { seq: pageBlock.seq - 1 } });
    // Increment target pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: targetPageBlock._id }, { $set: { seq: pageBlock.seq } });
  },
  'click .block-move-right': function (e) {
    e.preventDefault();
    $('.azimuth-block-edit-toggle, .azimuth-block-edit-panel').removeClass('active');
    var pageBlock = Azimuth.adminPanel.blockEdit.getPageBlock();
    // Ensure we can even move the block forwards
    var lastPageBlock = Azimuth.collections.PageBlocks.findOne({}, { sort: { seq: -1 } });
    if (!lastPageBlock || lastPageBlock.seq <= pageBlock.seq) {
      noty({
        text: 'Could not move block.',
        type: 'error'
      });
      return false;
    }
    // Get next pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({
        page: pageBlock.page,
        zone: pageBlock.zone,
        seq: pageBlock.seq + 1
      });
    // Increment current pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: pageBlock._id }, { $set: { seq: pageBlock.seq + 1 } });
    // Decrement target pageBlock seq
    Azimuth.collections.PageBlocks.update({ _id: targetPageBlock._id }, { $set: { seq: pageBlock.seq } });
  },
  'click .cancel': function() {
    Azimuth.adminPanel.hide();
  }
};
Template.admin_panel.helpers({
    actions: function () {
        var isAdmin = Roles.userIsInRole({_id: Meteor.user()._id}, ['admin']);
        if (isAdmin) return Azimuth.adminPanel.actions;
        else return _.reject(Azimuth.adminPanel.actions, function (action) {
            return action.adminOnly;
        });
    }
});
