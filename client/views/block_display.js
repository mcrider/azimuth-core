// Handles the block templates for the admin

Template.block_display.rendered = function() {
  // Display block-specific admin buttons when hovered over
  // FIXME: Need to make this available to touch events
  if (Roles.userIsInRole({_id: Meteor.user()._id}, ['author', 'admin'])) {
    $('.contents-container').on({
      mouseenter: function() {
        if(!$(this).find('.azimuth-block-edit-panel').length) {
          $blockElement = $(this).children(":first");
          $blockElement.append($('.azimuth-block-edit-panel')[0].outerHTML);

          var $editPanel = $(this).find('.azimuth-block-edit-panel')
          $editPanel.show();
        }
      },
      mouseleave: function() {
        $(this).find('.azimuth-block-edit-panel').remove();
      }
    }, '.azimuth-block');
  }
}

Template.block_display.currentBlockPage = function(zone) {
  return Session.equals("zone_"+zone+"_skip", this.valueOf() - 1) ? "active" : "";
}

Template.block_display.zoneLabel = function(zone) {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
}

Template.block_display.classifyTags = function() {
  var block = Azimuth.collections.Blocks.findOne(this.block_id);
  if(block && block.tag) {
    return _.map(block.tag, function(tag) { return 'azimuth-tag-' + tag; }).join(' ');
  } else return '';
}

Template.block_display.events = {
  // --- Actions for block zone panel --
  // Add a new block to the beginning of block zone
  'click .block-zone-add': function(e) {
    e.stopPropagation();
    zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');

    if(!zone) return false;

    adminPanel.blockEdit.newBlock = true;
    Session.set('blockFields', false);
    adminPanel.blockEdit.zone = zone;
    adminPanel.blockEdit.insertAfter = false;
    adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  // Edit block settings such as pagination
  'click .block-zone-edit': function(e) {
    e.stopPropagation();
    adminPanel.blockEdit.zone = zone;
    adminPanel.loadTemplate('block_zone_edit', 'menu-medium');
  },

  // --- Actions for block panels ---
  // Edit the selected block or block tag/type
  'click .block-edit': function(e) {
    e.stopPropagation();

    adminPanel.blockEdit.newBlock = false;

    var pageBlockId = $(e.currentTarget).closest('.azimuth-block').data('page-block-id');
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);

    if (pageBlock.block_tag) {
      // Display a form to edit the tag

    } else if (pageBlock.block_type) {
      // Display a form to edit which block type (== template) to display

    } else if (pageBlock.block_id) {
      var block = Azimuth.collections.Blocks.findOne(pageBlock.block_id);
      if (block && block.template) {
        adminPanel.blockEdit.blockId = pageBlock.block_id;

        // Get template's fields from block registry, and inject values for each field
        var registryFields = registry.blockTemplates[block.template].fields;
        _.each(registryFields, function(registryField) {
          var fieldName = registryField.name;
          registryField.value = block[fieldName];
        })

        Session.set('blockFields', registryFields);
        adminPanel.loadTemplate('block_edit', 'menu-medium');
      } else {
        console.log('Block not found (or has no template specified)' );
      }
    } else {
      console.log('Could not edit block.' );
      return false;
    }
  },
  // Delete the selected block or block tag/type
  'click .block-delete': function(e) {
    // FIXME: This needs a confirmation dialogish-type-thing
    e.stopPropagation();
    e.preventDefault();

    var pageBlockId = $(e.currentTarget).closest('.azimuth-block').data('page-block-id');
    var pageBlock = Azimuth.collections.PageBlocks.findOne(pageBlockId);
    var page = utils.getCurrentPage();

    // If the pageBlock is just a block instance, first delete the block
    if (pageBlock.block_id) {
      Azimuth.collections.Blocks.remove(pageBlock.block_id);
    }

    // Remove the pageblock from the page
    Azimuth.collections.PageBlocks.remove(pageBlockId);

  },
  // Add a new block after the current block
  'click .block-add': function(e) {
    e.preventDefault();
    e.stopPropagation();

    var zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');

    if(!zone) return false;

    adminPanel.blockEdit.newBlock = true;
    Session.set('blockFields', false);
    adminPanel.blockEdit.zone = zone;
    adminPanel.blockEdit.insertAfter = this.seq;
    adminPanel.loadTemplate('block_edit', 'menu-medium');

  },
  // Move block left
  'click .block-move-left': function(e) {
    e.stopPropagation();

    // Ensure we can even move the block backwards
    if(this.seq == 1) {
      noty({text: 'Could not move block.', type: 'error'});
      return false;
    }

    // Get previous pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({page_id: this.page_id, zone: this.zone, seq: this.seq-1});

    // Decrement current pageBlock seq
    Azimuth.collections.PageBlocks.update({_id: this._id}, {$set: {seq: this.seq-1}});

    // Increment target pageBlock seq
    Azimuth.collections.PageBlocks.update({_id: targetPageBlock._id}, {$set: {seq: this.seq}});
  },
  // Move block right
  'click .block-move-right': function(e) {
    e.stopPropagation();

    // Ensure we can even move the block forwards
    var lastPageBlock = Azimuth.collections.PageBlocks.findOne({},{sort:{seq:-1}});
    if(!lastPageBlock || lastPageBlock.seq <= this.seq) {
      noty({text: 'Could not move block.', type: 'error'});
      return false;
    }

    // Get next pageBlock
    var targetPageBlock = Azimuth.collections.PageBlocks.findOne({page_id: this.page_id, zone: this.zone, seq: this.seq+1});

    // Increment current pageBlock seq
    Azimuth.collections.PageBlocks.update({_id: this._id}, {$set: {seq: this.seq+1}});

    // Decrement target pageBlock seq
    Azimuth.collections.PageBlocks.update({_id: targetPageBlock._id}, {$set: {seq: this.seq}});
  }
}