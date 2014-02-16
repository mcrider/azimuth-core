// Handles the display and entry point of editing functions for blocks
Template.block_display.rendered = function () {
  // Display block-specific admin buttons when hovered over
  // FIXME: Need to make this available to touch events
  if (Meteor.user() && Roles.userIsInRole({ _id: Meteor.user()._id }, [
      'author',
      'admin'
    ])) {
    // Setup block edit panel interactions
    $(this.findAll('.azimuth-block > *')).append('<a href="#" class="azimuth-block-edit-toggle"><span class="pip"></span><span class="pip"></span><span class="pip"></span></a>');
    $('.azimuth-block').undelegate('click').delegate('.azimuth-block-edit-toggle', 'click', function(e) {
      e.stopPropagation();
      // Store some state about what we're currently editing
      Azimuth.adminPanel.blockEdit.settings.pageBlockId = $(e.currentTarget).closest('.azimuth-block').data('page-block-id');
      Azimuth.adminPanel.blockEdit.settings.zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
      $('.azimuth-block-edit-toggle').removeClass('active');
      $(this).addClass('active');
      // Get the position of the toggle button so we can center the edit panel under it
      var offset = $(this).offset();
      var toggleWidth = $(this).width();
      var offsetTop = offset.top + 5;
      var offsetLeft = offset.left - ($('.azimuth-block-edit-panel').width() / 2) + (toggleWidth / 2) + 3;
      $('.azimuth-block-edit-panel').css('top', offsetTop).css('left', offsetLeft).toggleClass('active');
    })
    $('html').click(function() {
      $('.azimuth-block-edit-toggle').removeClass('active');
      if($('.azimuth-block-edit-panel').hasClass('active')) $('.azimuth-block-edit-panel').removeClass('active');
    })
  }
};
Template.block_display.currentBlockPage = function (zone) {
  return Session.equals('zone_' + zone + '_skip', this.valueOf() - 1) ? 'active' : '';
};
Template.block_display.zoneLabel = function (zone) {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
};
// Create classes for all block tags and append to the block
Template.block_display.classifyTags = function () {
  var block = Azimuth.collections.Blocks.findOne(this.block);
  if (block && block.tag) {
    return _.map(block.tag, function (tag) {
      return 'azimuth-tag-' + tag;
    }).join(' ');
  } else
    return '';
};
Template.block_display.events = {
  // Add a block to the beginning of the block zone
  'click .block-zone-add': function (e) {
    e.stopPropagation();
    zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
    if (!zone)
      return false;
    Session.set('blockFields', false);
    Session.set('addBlock', true);
    Azimuth.adminPanel.blockEdit.reset({newBlock: true, zone: zone, insertAfter: false});
    Azimuth.adminPanel.loadTemplate('block_edit', 'menu-medium');
  },
  // Edit a block zone's settings
  'click .block-zone-edit': function (e) {
    debugger;
    e.stopPropagation();
    Azimuth.adminPanel.blockEdit.reset({zone: zone});
    Azimuth.adminPanel.loadTemplate('block_zone_edit', 'menu-medium');
  }
};