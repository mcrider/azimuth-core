Template.block_edit.rendered = function() {
  $('select').selectize({
    sortField: 'text'
  });
}

Template.block_edit.templates = function() {
  return $.map(registry.blockTemplates, function(value, index) {
    return [value];
  });
}

Template.block_edit.allTags = function() {
  return utils.getDistinctBlockTags();
}

Template.block_edit.newBlock = function (options) {
  return adminPanel.blockEdit.newBlock;
};

Template.block_edit.blockFields = function() {
  return Session.get('blockFields') ? Session.get('blockFields') : false;
}

Template.block_edit.renderField = function(field) {
  return field.name;
}

Template.block_edit.currentBlockTags = function() {
  var block = Azimuth.collections.Blocks.findOne(adminPanel.blockEdit.blockId);
  if(block && block.tag) return block.tag;
  else return '';
}

Template.block_edit.events = {
  'change .block-template-selector': function(e) {
    // Load block form in from registry
    var template = $(e.currentTarget).val();

    // Get template's fields from block registry
    Session.set('blockFields', registry.blockTemplates[template].fields);

    adminPanel.blockEdit.template = template;
  },
  'change .block-tag-selector': function(e) {
    // Load block form in from registry
    var tag = $(e.currentTarget).val(),
        page = utils.getCurrentPage();

    if(adminPanel.blockEdit.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {page_id: page._id, block_tag: tag, seq: adminPanel.blockEdit.insertAfter + 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
      adminPanel.blockEdit.insertAfter(pageBlockData, adminPanel.blockEdit.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {page_id: page._id, block_tag: tag, seq: 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
      adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    adminPanel.hide();
  },
  'change .block-type-selector': function(e) {
    // Load block form in from registry
    var type = $(e.currentTarget).val(),
        page = utils.getCurrentPage();

    if(adminPanel.blockEdit.insertAfter) {
      // Insert after a specific block
      var pageBlockData = {page_id: page._id, block_type: type, seq: adminPanel.blockEdit.insertAfter + 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
      adminPanel.blockEdit.insertAfter(pageBlockData, adminPanel.blockEdit.insertAfter);
    } else {
      // Insert into the beginning of the block zone
      var pageBlockData = {page_id: page._id, block_type: type, seq: 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
      adminPanel.blockEdit.insertInFront(pageBlockData);
    }
    adminPanel.hide();
  },

  // Events for block edit form
  'click .cancel': function() {
    adminPanel.hide();
  },
  'click .submit': function() {
    // Save a new block -- create the block and insert into the PageBlock collection
    if(adminPanel.blockEdit.newBlock) {
      var blockData = utils.getFormValues(".block-edit-form");
      blockData.created = Date.now();
      blockData.template = adminPanel.blockEdit.template;

      var block_id = Azimuth.collections.Blocks.insert(blockData);
      var block = Azimuth.collections.Blocks.findOne({_id: block_id});

      var page = utils.getCurrentPage();

      if(adminPanel.blockEdit.insertAfter) {
        // Insert after a specific block
        var pageBlockData = {page_id: page._id, block_id: block_id, seq: adminPanel.blockEdit.insertAfter + 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
        adminPanel.blockEdit.insertAfter(pageBlockData, adminPanel.blockEdit.insertAfter);
      } else {
        // Insert into the beginning of the block zone
        var pageBlockData = {page_id: page._id, block_id: block_id, seq: 1, zone: adminPanel.blockEdit.zone, added: Date.now()};
        adminPanel.blockEdit.insertInFront(pageBlockData);
      }
    }
    // Save changes to an existing block
    else {
      var block = Azimuth.collections.Blocks.findOne({_id: adminPanel.blockEdit.blockId});
      if(block) {
        var blockData = utils.getFormValues(".block-edit-form");
        blockData.tag = blockData.tag ? blockData.tag.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/) : '';
        Azimuth.collections.Blocks.update({_id: block._id}, {$set: blockData});
        noty({text: 'Block Saved.', type: 'success'});
      } else {
        noty({text: 'Error: Could not save block.', type: 'error'});
      }
    }

    adminPanel.hide();
  }
}
