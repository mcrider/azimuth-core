//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/lib/helpers.js
//
// Helpers (additional public functions) for templates
//

// Display all blocks for a page in a given block zone
UI.registerHelper('renderBlocks', function () {
  var zone = this.zone;
  if (!zone) {
    console.log('Block zone not specified');
    return false;
  }
  // Get zone settings for paging and sorting
  var page = Azimuth.utils.getCurrentPage();
  var limit = page['zone_' + zone + '_limit'] ? parseInt(page['zone_' + zone + '_limit'], 10) : 0;
  // The number of blocks to show per 'page' of blocks
  var skip = Session.get(page.slug + '_' + zone + '_skip') ? Session.get(page.slug + '_' + zone + '_skip') * limit : 0;
  // The current 'page' of blocks
  if (limit > 0) {
    Template.block_display.pageBlocks = Azimuth.collections.PageBlocks.find({
      page: page._id,
      zone: zone
    }, {
      skip: skip,
      limit: limit,
      sort: { seq: 1 }
    });
  } else {
    Template.block_display.pageBlocks = Azimuth.collections.PageBlocks.find({
      page: page._id,
      zone: zone
    }, { sort: { seq: 1 } });
  }
  var numSets = limit > 0 ? Math.ceil(Azimuth.collections.PageBlocks.find({
      page: page._id,
      zone: zone
    }).count() / limit) : false;
  Template.block_display.numSets = numSets > 1 ? _.range(1, numSets + 1) : false;
  Template.block_display.zone = zone;
  return Template.block_display;
});
var renderBlock = function (block) {
  var block = block || this;
  if (block && block.template) {
    Template[block.template].block = block;
    var _rendered = typeof Template[block.template].rendered == "function" ? Template[block.template].rendered : false;
    var _customRendered = function() {
      // Call the existing rendered function from our custom one
      if (_rendered) {
        _rendered.apply(this, arguments);
      }
      Azimuth.adminPanel.initEditToggle.apply(this, arguments)
    }
    if (!Template[block.template].rendered || !_.isEqual(Template[block.template].rendered.toString(), _customRendered.toString())) {
      Template[block.template].rendered = _customRendered;
    }
    return Template[block.template].extend({data: block});
  } else {
    console.log('Block not found (or has no template specified)');
  }
}
UI.registerHelper('renderBlock', renderBlock);
// Display a block/blocks from a pageBlock
UI.registerHelper('renderPageBlock', function (pageBlock) {
  var pageBlock = this;
  if (pageBlock.block_tag) {
    // Fetch blocks with a given tag and add to fragments
    var blocks = Azimuth.collections.Blocks.find({ tag: pageBlock.block_tag });
    return Template.block_set.extend({blocks: blocks});
  } else if (pageBlock.block_type) {
    // Fetch each block with the given template (== type) and add to fragments
    var blocks = Azimuth.collections.Blocks.find({ template: pageBlock.block_type });
    return Template.block_set.extend({blocks: blocks});
  } else {
    var block = Azimuth.collections.Blocks.findOne(pageBlock.block);
    return renderBlock(block);
  }
});
// Renders a form element using a template in views/form/
UI.registerHelper('formHelper', function () {
  if (this.type == 'wysiwyg')
    this.uniqueId = this.fieldName + '_' + Math.random().toString(36).substring(7);
  // FIXME: Return error if type not valid template
  // return Template[this.type].withData(this);
  return Template[this.type];
});
// Get a human readable time from a timestamp
UI.registerHelper('humanReadableTime', function (timestamp) {
  return Azimuth.utils.displayHumanReadableTime(timestamp);
});
// Get a setting value
UI.registerHelper('getSetting', function (settingName) {
  return Azimuth.utils.getSetting(settingName);
});
// Get a setting value as a boolean
UI.registerHelper('getSetting', function (settingName) {
  return Azimuth.utils.getSetting(settingName);
});
// Return the current page object
UI.registerHelper('page', function () {
  return Azimuth.utils.getCurrentPage();
});
// Custom helper to meteor-roles package to test if user is an admin
UI.registerHelper('isAdmin', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, ['admin']);
});
// Custom helper to meteor-roles package to test if user is an autho
UI.registerHelper('isAuthor', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, ['author']);
});
// Custom helper to meteor-roles package to test if user is an admin or an author
UI.registerHelper('isAuthorOrAdmin', function () {
  if (!Meteor.user())
    return false;
  var userId = Meteor.user()._id;
  return Roles.userIsInRole({ _id: userId }, [
    'author',
    'admin'
  ]);
});
// Check if registration is open to the public
UI.registerHelper('openRegistration', function () {
  return Azimuth.utils.getSetting('openRegistration') || !Session.get('usersExist');
});

// Get an appropriate handle for the user or false if not signed in
UI.registerHelper('signedInAs', function () {
  if (Meteor.user() && Meteor.user().username) {
    return Meteor.user().username;
  } else if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
    return Meteor.user().profile.name;
  } else if (Meteor.user() && Meteor.user().emails && Meteor.user().emails[0]) {
    return Meteor.user().emails[0].address;
  } else {
    return false;
  }
});
