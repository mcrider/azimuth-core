Template.delete_block.events = {
  // Delete only a pageBlock (the actual blocks are kept)
  'click .delete-block-confirm': function(e) {
    e.preventDefault();
    utils.closeModal('#deleteBlockModal');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');
    page = utils.getCurrentPage();

    var pageBlocks = null;
    if (type == 'block_type') pageBlocks = Azimuth.collections.PageBlocks.find({ page_id : page._id, block_type: id });
    else if (type == 'block_tag') pageBlocks = Azimuth.collections.PageBlocks.find({ page_id : page._id, block_tag: id });
    else pageBlocks = Azimuth.collections.PageBlocks.find({ page_id : page._id, block_id: id });

    pageBlocks.forEach(function(pageBlock) {
      Azimuth.collections.PageBlocks.remove(pageBlock._id);
    });

		noty({text: 'Block removed from page', type: 'success'});
  },
  // Delete a pageBlock and the corresponding block
  'click .delete-all-blocks-confirm': function(e) {
    e.preventDefault();
    utils.closeModal('#deleteBlockModal');

    var type = Session.get('block-edit-type');
    var id = Session.get('block-edit-id');

    if (type == 'id') {
      Azimuth.collections.PageBlocks.find({block_id: id}).forEach(function(pageBlock) {
        Azimuth.collections.PageBlocks.remove(pageBlock._id);
      });
      Azimuth.collections.Blocks.remove(id);
      noty({text: 'Block deleted.', type: 'success'});
    } else {
			noty({text: 'There was an error trying to delete this block.', type: 'error'});
    }
  }
};
