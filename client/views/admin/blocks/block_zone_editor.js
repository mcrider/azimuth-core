Template.block_zone_editor.rendered = function() {
  // Set up our drag-and-drop handler
  var saveOrder = function(e) {
    var pageId = utils.getCurrentPage()._id;
    var zone = $(this).closest('.block-zone-container').data('zone');
    // Collect all blocks into an array of objects

    var currentPageBlocks = $(this).parent().find('li').map(function() {
      var pageBlock = {
        page_id: pageId,
        added: $(this).data('added'),
        label: $(this).find('.block-label').text(),
        zone: zone
      }

      if ($(this).data('block_type')) {
        pageBlock.block_type = $(this).data('block_type');
      } else if ($(this).data('block_tag')) {
        pageBlock.block_tag = $(this).data('block_tag');
      }  else if ($(this).data('block_id')) {
        pageBlock.block_id = $(this).data('block_id');
      } else {
        console.log("Page block type not specified")
        return false;
      }

      return pageBlock;
    }).get();

    // Delete current blocks for this blockzone
    Azimuth.collections.PageBlocks.find({ page_id : pageId, zone: zone }).forEach(function(pageBlock) {
      Azimuth.collections.PageBlocks.remove(pageBlock._id);
    });

    // Reset page blocks with updated array
    _.each(currentPageBlocks, function(pageBlock) {
      Azimuth.collections.PageBlocks.insert(pageBlock);
    });
  };

  $(this.firstNode).find("ul.block-zone").sortable().bind('sortupdate', saveOrder);
}

Template.block_zone_editor.added = function() {
  if(this.added) return utils.displayHumanReadableTime(this.added);
  else return '';
};

Template.block_zone_editor.timestamp = function() {
  if(this.added) return this.added;
  else return '';
};

Template.block_zone_editor.limit = function() {
  var zone = this.zone;
  var page = utils.getCurrentPage();
  var limit = page["zone_"+zone+"_limit"];

  return limit && limit > 0 ? page["zone_"+zone+"_limit"] : false;
}

Template.block_zone_editor.pageCount = function() {
  return _.range(1, 51)
};

Template.block_zone_editor.events = {
  'click .new-block': function (e) {
    e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone')
    var template = this.name;
    Session.set('block-template', template);
    Session.set('block-zone', zone);

    var blockData = {};
    blockData.created = Date.now();
    blockData.template = template;

    var block_id = Azimuth.collections.Blocks.insert(blockData);
    var block = Azimuth.collections.Blocks.findOne({_id: block_id});
    Session.set('new-block-id', block_id);

    var fragment = Meteor.render(function () {
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });
    var $editBlockModal = $('#editBlockModal').first();
    $editBlockModal.find('.modal-body').html(fragment);
    Session.set('block-edit-id', block_id);
    utils.openModal("#" + $editBlockModal.attr('id'));
  },
  'click .existing-block': function(e) {
  	e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    Session.set('block-zone', zone);
    utils.openModal('#existingBlockModal');
  },
  'click .block-by-tag': function(e) {
  	e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    Session.set('block-zone', zone);
    utils.openModal('#blockTagModal')
  },
  'click .block-by-type': function(e) {
  	e.preventDefault();
    var template = this.name;
    var page = utils.getCurrentPage();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    var label = Template[template].label || 'Single Block';

    // Attach the block to the page
    if (!page.notFound) {
      Azimuth.collections.PageBlocks.insert({page_id: page._id, block_type: this.name, label: label, zone: zone, added: Date.now()});
    }

		noty({text: label + ' blocks added to page.', type: 'success'});
  },
  'click .page-count': function(e) {
    e.preventDefault();

    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    var page = utils.getCurrentPage();

    var limit = {};
    limit["zone_"+zone+"_limit"] = this.valueOf();

    Azimuth.collections.Pages.update(page._id, {$set: limit});
  },
  'click .delete-block-button': function(e) {
  	e.preventDefault();

    var data = $(e.currentTarget).closest('.edit-block').data();
    var id, type;

    if (data.block_type) {
      id = data.block_type;
      type = 'block_type';
    } else if (data.block_tag) {
      id = data.block_tag;
      type = 'block_tag';
    } else if (data.block_id) {
      id = data.block_id;
      type = 'block_id';
    }
    Session.set('block-edit-id', id);
    Session.set('block-edit-type', type);

    if(type == 'block_id') {
      $("#deleteBlockModal .delete-all-blocks-confirm").show();
    } else {
      $("#deleteBlockModal .delete-all-blocks-confirm").hide();
    }
    utils.openModal('#deleteBlockModal');
  },
  'click .edit-block-button': function(e) {
  	e.preventDefault();
    var block = Azimuth.collections.Blocks.findOne({_id: this.block_id});
    var fragment = Meteor.render(function () {
      Template[ block.template + "_edit" ].block = block;
      return Template[ block.template + "_edit" ](block); // this calls the template and returns the HTML.
    });

    $('#editBlockModal').first().find('.modal-body').html(fragment);
    Session.set('block-edit-id', block._id);
    utils.openModal('#editBlockModal');
  }
};

Template.block_zone_editor.pageBlocks = function() {
  // Get blocks with the correct zone (specified by this.zone)
  if(!this.zone) {
    console.log("You must specify a block zone for this helper");
    return false;
  }

  var page = utils.getCurrentPage();
  return Azimuth.collections.PageBlocks.find({page_id: page._id, zone: this.zone});
}

Template.block_zone_editor.templates = function() {
  return registry.blockTemplates;
}