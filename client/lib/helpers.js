// Helpers (additional public functions) for Handlebars templates
if (typeof Handlebars !== 'undefined') {
  // Display all blocks for a page in a given block zone
  Handlebars.registerHelper('renderBlocks', function (options) {
    var zone = options.hash.zone;
    if (!zone) {
      console.log('Block zone not specified');
      return false;
    }
    // Get zone settings for paging and sorting
    var page = Azimuth.utils.getCurrentPage();
    var limit = page['zone_' + zone + '_limit'] ? page['zone_' + zone + '_limit'] : 0;
    // The number of blocks to show per 'page' of blocks
    var skip = Session.get('zone_' + zone + '_skip') ? Session.get('zone_' + zone + '_skip') * limit : 0;
    // The current 'page' of blocks
    if (limit > 0) {
      Template.block_display.pageBlocks = Azimuth.collections.PageBlocks.find({
        page_id: page._id,
        zone: zone
      }, {
        skip: skip,
        limit: limit,
        sort: { seq: 1 }
      });
    } else {
      Template.block_display.pageBlocks = Azimuth.collections.PageBlocks.find({
        page_id: page._id,
        zone: zone
      }, { sort: { seq: 1 } });
    }
    var numSets = limit > 0 ? Math.ceil(Azimuth.collections.PageBlocks.find({
        page_id: page._id,
        zone: zone
      }).count() / limit) : false;
    Template.block_display.numSets = numSets > 1 ? _.range(1, numSets + 1) : false;
    Template.block_display.zone = zone;
    return Template.block_display;
  });
  Handlebars.registerHelper('renderBlock', function (block) {
    if (block && block.template) {
      Template[block.template].block = block;
      return Template[block.template];  // this calls the template and returns the HTML.
    } else {
      console.log('Block not found (or has no template specified)');
    }
  });
  // Display a block/blocks from a pageBlock
  Handlebars.registerHelper('renderPageBlock', function (pageBlock) {
    if (pageBlock.block_tag) {
      // Fetch blocks with a given tag and add to fragments
      var blocks = Azimuth.collections.Blocks.find({ tag: pageBlock.block_tag });
      Template.block_set.blocks = blocks;
      return Template.block_set;
    } else if (pageBlock.block_type) {
      // Fetch each block with the given template (== type) and add to fragments
      var blocks = Azimuth.collections.Blocks.find({ template: pageBlock.block_type });
      Template.block_set.blocks = blocks;
      return Template.block_set;
    } else {
      var block = Azimuth.collections.Blocks.findOne(pageBlock.block_id);
      return Handlebars._globalHelpers.renderBlock(block);
    }
  });
  // Renders a form element using a template in views/form/
  Handlebars.registerHelper('formHelper', function (options) {
    if (options.hash.type == 'wysiwyg')
      options.hash.uniqueId = options.hash.fieldName + '_' + Math.random().toString(36).substring(7);
    // FIXME: Return error if type not valid template
    return Template[options.hash.type].withData(options.hash);
  });
  // Displays a region to manage blocks in the page edit template
  Handlebars.registerHelper('blockZoneEditor', function (options) {
    // FIXME: Return error if type not valid template
    return Template.block_zone_editor.withData(options.hash);
  });
  // Get a human readable time from a timestamp
  Handlebars.registerHelper('humanReadableTime', function (timestamp) {
    return Azimuth.utils.displayHumanReadableTime(timestamp);
  });
  // Get a setting value
  Handlebars.registerHelper('getSetting', function (settingName) {
    return Azimuth.utils.getSetting(settingName);
  });
  // Return the current page object
  Handlebars.registerHelper('page', function () {
    return Azimuth.utils.getCurrentPage();
  });
  // Return true if a page slug is the current page's page slug
  Handlebars.registerHelper('isCurrentPage', function (slug) {
    return Azimuth.utils.getCurrentPage().template == slug;
  });
  // Custom helper to meteor-roles package to test if user is an admin
  Handlebars.registerHelper('isAdmin', function () {
    if (!Meteor.user())
      return false;
    var userId = Meteor.user()._id;
    return Roles.userIsInRole({ _id: userId }, ['admin']);
  });
  // Custom helper to meteor-roles package to test if user is an autho
  Handlebars.registerHelper('isAuthor', function () {
    if (!Meteor.user())
      return false;
    var userId = Meteor.user()._id;
    return Roles.userIsInRole({ _id: userId }, ['author']);
  });
  // Custom helper to meteor-roles package to test if user is an admin or an author
  Handlebars.registerHelper('isAuthorOrAdmin', function () {
    if (!Meteor.user())
      return false;
    var userId = Meteor.user()._id;
    return Roles.userIsInRole({ _id: userId }, [
      'author',
      'admin'
    ]);
  });
  // Check if registration is open to the public
  Handlebars.registerHelper('openRegistration', function (options) {
    return Azimuth.utils.getSetting('openRegistration') || !Session.get('usersExist');
  });
  // Check if file extension is image
  Handlebars.registerHelper('ifImage', function (filename, options) {
    return /\.(gif|jpg|jpeg|tiff|png)$/i.test(filename);
  });
  // Get an appropriate handle for the user or false if not signed in
  Handlebars.registerHelper('signedInAs', function () {
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
}