Template.tag_block.rendered = function() {
  $("#tag").selectize({
    maxItems: 1,
    persist: false,
    create: true,
    options: utils.getDistinctBlockTags(),
    searchField: 'tag',
    valueField: 'tag',
    labelField: 'tag'
  });

  // TODO: Load existing tags with autocomplete (find tags non-reactively)
}

Template.tag_block.events = {
  'click .add-block-by-tag': function(e) {
  	e.preventDefault();
    var tag = $('#tag').val()
    utils.closeModal('#blockTagModal');

    if (tag) {
      var page = utils.getCurrentPage();
      var zone = Session.get('block-zone');

      // Attach the block to the page
      if (!page.notFound) {
        Azimuth.collections.PageBlocks.insert({page_id: page._id, block_tag: tag, label: tag, zone: zone, added: Date.now()});
      }

			noty({text: 'Blocks with tag "' + tag + '" added to page.', type: 'success'});
    }
  }
};
