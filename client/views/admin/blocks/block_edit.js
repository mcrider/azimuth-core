Template.block_edit.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.block_edit.templates = function () {
  return $.map(Azimuth.registry.blockTemplates, function (value, index) {
    return [value];
  });
};
Template.block_edit.allTags = function () {
  return Azimuth.utils.getDistinctBlockTags();
};
Template.block_edit.newBlock = function (options) {
  return Azimuth.adminPanel.blockEdit.newBlock;
};
Template.block_edit.blockFields = function () {
  return Session.get('blockFields') ? Session.get('blockFields') : false;
};
Template.block_edit.renderField = function (field) {
  return field.name;
};
Template.block_edit.currentBlockTags = function () {
  var block = Azimuth.collections.Blocks.findOne(Azimuth.adminPanel.blockEdit.blockId);
  if (block && block.tag)
    return block.tag;
  else
    return '';
};
Template.block_edit.events = {
  'change .block-template-selector': function (e) {
    // Load block form in from registry
    var template = $(e.currentTarget).val();
    // Get template's fields from block registry
    Session.set('blockFields', Azimuth.registry.blockTemplates[template].fields);
    Azimuth.adminPanel.blockEdit.template = template;
  },
  'change .block-tag-selector': function (e) {
    // Load block form in from registry
    var tag = $(e.currentTarget).val(), page = Azimuth.utils.getCurrentPage();
    if (Azimuth.adminPanel.blockEdit.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {
          page: page._id,
          block_tag: tag,
          seq: Azimuth.adminPanel.blockEdit.insertAfter + 1,
          zone: Azimuth.adminPanel.blockEdit.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {
          page: page._id,
          block_tag: tag,
          seq: 1,
          zone: Azimuth.adminPanel.blockEdit.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    Azimuth.adminPanel.hide();
  },
  'change .block-type-selector': function (e) {
    // Load block form in from registry
    var type = $(e.currentTarget).val(), page = Azimuth.utils.getCurrentPage();
    if (Azimuth.adminPanel.blockEdit.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {
          page: page._id,
          block_type: type,
          seq: Azimuth.adminPanel.blockEdit.insertAfter + 1,
          zone: Azimuth.adminPanel.blockEdit.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {
          page: page._id,
          block_type: type,
          seq: 1,
          zone: Azimuth.adminPanel.blockEdit.zone,
          added: Date.now()
        };
      Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    Azimuth.adminPanel.hide();
  },
  'click .block-delete': function (e) {
    // FIXME: This needs a confirmation dialogish-type-thing
    e.stopPropagation();
    e.preventDefault();
    var pageBlockId = $(e.currentTarget).closest('.azimuth-block').data('page-block-id');
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);
    var page = Azimuth.utils.getCurrentPage();
    // If the pageBlock is just a block instance, first delete the block
    if (pageBlock.block) {
      Azimuth.collections.Blocks.remove(pageBlock.block);
    }
    // Remove the pageblock from the page
    Azimuth.collections.PageBlocks.remove(pageBlockId);
  },
  'click .cancel': function () {
    Azimuth.adminPanel.hide();
  },
  'click .submit': function () {
    // Save a new block -- create the block and insert into the PageBlock collection
    if (Azimuth.adminPanel.blockEdit.newBlock) {
      var blockData = Azimuth.utils.getFormValues('.block-edit-form');
      blockData.created = Date.now();
      blockData.template = Azimuth.adminPanel.blockEdit.template;
      var blockId = Azimuth.collections.Blocks.insert(blockData);
      var block = Azimuth.collections.Blocks.findOne({ _id: blockId });
      var page = Azimuth.utils.getCurrentPage();
      if (Azimuth.adminPanel.blockEdit.insertAfter) {
        // Insert after a specific block
        var pageBlockData = {
            page: page._id,
            block: block,
            seq: Azimuth.adminPanel.blockEdit.insertAfter + 1,
            zone: Azimuth.adminPanel.blockEdit.zone,
            added: Date.now()
          };
        Azimuth.adminPanel.blockEdit.insertAfter(pageBlockData, Azimuth.adminPanel.blockEdit.insertAfter);
      } else {
        // Insert into the beginning of the block zone
        var pageBlockData = {
            page: page._id,
            block: block,
            seq: 1,
            zone: Azimuth.adminPanel.blockEdit.zone,
            added: Date.now()
          };
        Azimuth.adminPanel.blockEdit.insertInFront(pageBlockData);
      }
    }  // Save changes to an existing block
    else {
      var block = Azimuth.collections.Blocks.findOne({ _id: Azimuth.adminPanel.blockEdit.blockId });
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