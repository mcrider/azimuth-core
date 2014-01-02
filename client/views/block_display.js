// Handles the block templates for the admin

Template.block_display.rendered = function() {
  $('.azimuth-block').hover(function() {
    if(!$(this).find('.azimuth-block-edit-panel').length) {
      $blockElement = $(this).children(":first");
      $blockElement.append($('.azimuth-block-edit-panel')[0].outerHTML);

      var $editPanel = $(this).find('.azimuth-block-edit-panel')
      $editPanel.show();
      $editPanel.css('left', (($blockElement.width() / 2) - ($editPanel.width() / 2)) + 'px');
    }
  }, function() {
    $(this).find('.azimuth-block-edit-panel').remove();
  })
}

Template.block_display.currentBlockPage = function(zone) {
  return Session.equals("zone_"+zone+"_skip", this.valueOf() - 1) ? "active" : "";
}

Template.block_display.zoneLabel = function(zone) {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
}

Template.block_display.events = {
  // --- Actions for block zone panel --
  // Add a new block to the beginning of block zone
  'click .block-zone-add': function(e) {
    e.preventDefault();
    zone = $(e.currentTarget).data('zone');

    if(!zone) return false;

    adminPanel.blockEdit.newBlock = true;
    Session.set('block_fields', false);
    adminPanel.blockEdit.zone = zone;
    adminPanel.loadTemplate('block_edit', 'menu-medium');

    // FIXME: Should add to beginning of block zone.  specific block add buttons add after
  },
  // Edit block settings such as pagination
  'click .block-zone-edit': function(e) {
    adminPanel.blockEdit.zone = zone;
    adminPanel.loadTemplate('block_zone_edit', 'menu-medium');
  },

  // --- Actions for block panels ---
  // Edit the selected block or block tag/type
  'click .block-edit': function(e) {
    e.preventDefault();

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

        Session.set('block_fields', registryFields);
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

  },
  // Move block left
  'click .block-move-left': function(e) {
    e.preventDefault();
    debugger;

  },
  // Move block right
  'click .block-move-right': function(e) {
    e.preventDefault();

  }
}