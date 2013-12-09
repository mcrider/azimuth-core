Template.edit_block.rendered = function() {
  Session.set('block-saved', false);
}

Template.edit_block.events = {
  'click .edit-block-confirm': function(e) {
    e.preventDefault();
    var block = Azimuth.collections.Blocks.findOne({_id: Session.get('block-edit-id')});
    if(block) {
      var blockData = utils.getFormValues(".edit-block-modal:visible form");
      blockData.tag = blockData.tag.split(',');
      Azimuth.collections.Blocks.update({_id: block._id}, {$set: blockData});
      noty({text: 'Block Saved.', type: 'success'});
    } else {
    	noty({text: 'Error: Could not save block.', type: 'error'});
    }

    // Add block to page
    if(Session.get('new-block-id')) {
      Session.set('new-block-id', false);
      var page = utils.getCurrentPage();

      if (block && !page.notFound) {
        var template = block.template;
        var label = Template[template].label || 'Single Block';
        Azimuth.collections.PageBlocks.insert({page_id: page._id, block_id: block._id, label: label, zone: Session.get('block-zone'), added: Date.now()});
      }
    }

    // Set this so we don't have to run the 'hidden' event handler when we close the modal
    Session.set('block-saved', true);

    utils.closeModal('#editBlockModal');

  },
  'click .close-modal': function(e) {
    // Handle deletion of a newly created block: To avoid issues with meteor not
    //  displaying the modal after a new block is created (due to re-rendering issues),
    //  the block must be created first then added after the modal is closed
    var newBlockId = Session.get('new-block-id');
    if(!Session.get('block-saved') && newBlockId) {
      Azimuth.collections.Blocks.remove(newBlockId);
    }
    utils.closeModal("#editBlockModal");
  }
};
