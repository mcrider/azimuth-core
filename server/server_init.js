// Server-side startup code (set up collections, add default data if needed)

// Initialize asset collection outside of startup
Assets = new CollectionFS("assets")
var handler = {
  "default": function (options) {
    return {
      blob: options.blob,
      fileRecord: options.fileRecord
    };
  }
}
Assets.fileHandlers(handler);

Meteor.startup(function () {
  // Helper functions for authorization
  authorize = {
    authorsAndAdmins: function() {
      return Meteor.user() && Roles.userIsInRole(Meteor.user(), ['author','admin']);
    },
    admins: function() {
      return Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin']);
    }
  }

  AccountsEntry = {
    settings: {
      homeRoute: '/',
      defaultProfile: {}
    },
    config: function(appConfig) {
      return this.settings = _.extend(this.settings, appConfig);
    }
  };
  Meteor.methods({
    entrySettings: function() {
      return {
        profileRoute: AccountsEntry.settings.profileRoute,
        homeRoute: AccountsEntry.settings.homeRoute
      };
    },
    accountsCreateUser: function(username, email, password) {
      if (username) {
        var userId = Accounts.createUser({
          username: username,
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
      } else {
        var userId = Accounts.createUser({
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
      }

      // This is our first user.  Make them an admin!
      if(Meteor.users.find().count() == 1 && userId && !Roles.userIsInRole(userId, ['admin'])) {
        // Add first user to admin role
        Roles.addUsersToRoles(userId, ['admin']);
      }
    },
    usersExist: function() {
      return Meteor.users.find().count() > 0;
    }
  });

  // Pages
  Pages = new Meteor.Collection("pages");
  Meteor.publish('pages', function () {
    return Pages.find();
  });
  Pages.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  if (!Pages.find().count()) {
    // First run -- Bootstrap the app with some base data

    // Insert a default page
    var pageId = Pages.insert({
      slug: "home",
      template: "page_default",
      metadata: [{
        key: "title",
        value: "Home"
      }]
    });
  }

  // Blocks
  Meteor.publish('blocks', function () {
    return Blocks.find();
  });
  Blocks = new Meteor.Collection("blocks");
  Blocks.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  if (!Blocks.find().count()) {
    // Insert a default block
    Blocks.insert({
      template: 'twelve_column',
      contents: '<div class="centered"><h3>Welcome to Azimuth!</h3>' +
        '<p>Please <a href="/login">login</a> to start crafting your site.</p></div>',
      created: Date.now(),
    });
  }

  // PageBlocks -- Links block instances and the pages that contain them
  Meteor.publish('pageBlocks', function () {
    return PageBlocks.find();
  });
  PageBlocks = new Meteor.Collection("pageBlocks");
  PageBlocks.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  if (!PageBlocks.find().count()) {
    // Insert a default block
    var pageId = Pages.findOne()._id;
    var blockId = Blocks.findOne()._id;
    PageBlocks.insert({
      page_id: pageId,
      block_id: blockId,
      seq: 1,
      zone: "body",
      added: Date.now()
    });
  }

  // Users
  Meteor.publish('users', function () {
  	if(authorize.admins) return Meteor.users.find();

  	this.stop();
	  return;
  });
  Meteor.users.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });

  // Roles
  Meteor.publish('roles', function () {
    return Meteor.roles.find();
  });
  Meteor.roles.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });

  // Site settings
  Settings = new Meteor.Collection("settings");
  Meteor.publish('settings', function () {
    return Settings.find();
  });
  Settings.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });
  if (Settings.find().count() === 0) {
    Settings.insert({
      siteName: "Azimuth CMS",
      indexPage: "home",
      showLoginInHeader: true,
      addNewPagesToHeader: true,
      openRegistration: false,
      theme: 'flatBlue'
    });
  }

  // Header and footer navigation
  Navigation = new Meteor.Collection("navigation");
  Meteor.publish('navigation', function () {
    return Navigation.find();
  });
  Navigation.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });
  if (!Navigation.findOne({location: "header"})) {
  	var nav = [];
    Pages.find().forEach(function(page) {
      nav.push({id: page._id, title: page.title, url: '/' + page.slug, visible: true });
    });
    Navigation.insert({location: "header", pages: nav});
    Navigation.insert({location: "footer", pages: nav});
  }

  // Asset Library (uses CollectionFS package)
  Meteor.publish('assets', function() {
    return Assets.find();
  });
  Assets.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  var handler = {
    "default": function (options) {
      return {
        blob: options.blob,
        fileRecord: options.fileRecord
      };
    }
  }
  Assets.fileHandlers(handler);
});