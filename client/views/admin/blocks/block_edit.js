//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/blocks/block_edit.js
//
// Helpers and event handlers for creating and editing blocks.
//

Template.block_edit.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.block_edit.events = {
  'change .block-template-selector': function (e) {
    var template = $(e.currentTarget).val();
    // Get template's fields from block registry
    Session.set('blockFields', Azimuth.registry.blockTemplates[template].fields);
    Session.set('addBlock', false);
    Azimuth.adminPanel.blockEdit.settings.template = template;
  },
  'change .block-tag-selector': function (e) {
    // Load block form in from registry
    var tag = $(e.currentTarget).val(), page = Azimuth.utils.getCurrentPage();
    if (Azimuth.adminPanel.blockEdit.settings.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {
          page: page._id,
          block_tag: tag,
          seq: Azimuth.adminPanel.blockEdit.settings.insertAfter + 1,
          zone: Azimuth.adminPanel.blockEdit.settings.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {
          page: page._id,
          block_tag: tag,
          seq: 1,
          zone: Azimuth.adminPanel.blockEdit.settings.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    Azimuth.adminPanel.hide();
  },
  'change .block-type-selector': function (e) {
    // Load block form in from registry
    var type = $(e.currentTarget).val(), page = Azimuth.utils.getCurrentPage();
    if (Azimuth.adminPanel.blockEdit.settings.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {
          page: page._id,
          block_type: type,
          seq: Azimuth.adminPanel.blockEdit.settings.insertAfter + 1,
          zone: Azimuth.adminPanel.blockEdit.settings.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.settings.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {
          page: page._id,
          block_type: type,
          seq: 1,
          zone: Azimuth.adminPanel.blockEdit.settings.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    Azimuth.adminPanel.hide();
  },
  'click .delete-block': function (e) {
    e.preventDefault();
    Azimuth.utils.openModal('#deleteBlockModal');
  },
  'click .delete-block-confirm': function (e) {
    e.preventDefault();
    var pageBlockId = Azimuth.adminPanel.blockEdit.settings.pageBlockId;
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);
    // If the pageBlock is just a block instance, first delete the block
    if (pageBlock.block) {
      Azimuth.collections.Blocks.remove(Azimuth.adminPanel.blockEdit.settings.blockId);
    }
    // Remove the pageblock from the page
    Azimuth.collections.PageBlocks.remove(pageBlockId);
    Azimuth.utils.closeModal('#deleteBlockModal');
    Azimuth.adminPanel.hide();
  },
  'click .cancel-block': function () {
    Azimuth.adminPanel.hide();
  },
  'click .submit': function () {
    // Save a new block -- create the block and insert into the PageBlock collection
    if (Azimuth.adminPanel.blockEdit.settings.newBlock) {
      var blockData = Azimuth.utils.getFormValues('.block-edit-form');
      blockData.created = Date.now();
      blockData.template = Azimuth.adminPanel.blockEdit.settings.template;
      var blockId = Azimuth.collections.Blocks.insert(blockData);
      var block = Azimuth.collections.Blocks.findOne({ _id: blockId });
      var page = Azimuth.utils.getCurrentPage();
      if (Azimuth.adminPanel.blockEdit.settings.insertAfter) {
        // Insert after a specific block
        var pageBlockData = {
            page: page._id,
            block: block,
            seq: Azimuth.adminPanel.blockEdit.settings.insertAfter + 1,
            zone: Azimuth.adminPanel.blockEdit.settings.zone,
            added: Date.now()
          };
        Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.settings.insertAfter);
      } else {
        // Insert into the beginning of the block zone
        var pageBlockData = {
            page: page._id,
            block: block,
            seq: 1,
            zone: Azimuth.adminPanel.blockEdit.settings.zone,
            added: Date.now()
          };
        Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
      }
    }  // Save changes to an existing block
    else {
      var block = Azimuth.collections.Blocks.findOne({ _id: Azimuth.adminPanel.blockEdit.settings.blockId });
      if (block) {
        var blockData = Azimuth.utils.getFormValues('.block-edit-form');
        blockData.tag = blockData.tag ? blockData.tag.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/) : '';
        Azimuth.collections.Blocks.update({ _id: block._id }, { $set: blockData });
        noty({
          text: 'Block Saved.',
          type: 'success'
        });
      } else {
        noty({
          text: 'Error: Could not save block.',
          type: 'error'
        });
      }
    }
    Azimuth.adminPanel.hide();
  }
};
Template.block_edit.templates = function () {
  return $.map(Azimuth.registry.blockTemplates, function (value, index) {
    return [value];
  });
};
Template.block_edit.allTags = function () {
  return Azimuth.utils.getDistinctBlockTags();
};
Template.block_edit.blockId = function () {
  return Azimuth.adminPanel.blockEdit.settings.blockId;
};
Template.block_edit.addBlock = function (options) {
  return Session.get('addBlock');
};
Template.block_edit.blockFields = function () {
  return Session.get('blockFields') ? Session.get('blockFields') : false;
};
Template.block_edit.renderField = function (field) {
  return field.name;
};
Template.block_edit.currentBlockTags = function () {
  var block = Azimuth.collections.Blocks.findOne(Azimuth.adminPanel.blockEdit.settings.blockId);
  if (block && block.tag)
    return block.tag;
  else
    return '';
};
