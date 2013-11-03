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
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
        return true;
      }
      return false;
    },
    admins: function() {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin'])) {
        return true;
      }
      return false;
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
        return Accounts.createUser({
          username: username,
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
      } else {
        return Accounts.createUser({
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
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
  if (Pages.find().count() === 0) {
    // Insert default data
    Pages.insert({
      title: "Home",
      slug: "home",
      contents: "<p>Welcome to Azimuth.</p><p>You can add pages from the <i class='icon-cogs'></i>  menu above.</p>",
      template: "page_default"
    });
    Pages.insert({
      title: "About",
      slug: "about",
      contents: "<p>Replace this with some text about your site.</p>",
      template: "page_default"
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
    if(Meteor.users.find().count() == 1 && this.userId && !Roles.userIsInRole(this.userId, ['admin'])) {
      // Add first user to admin role
      Roles.addUsersToRoles(Meteor.user()._id, ['admin']);
    }
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
  if (!Navigation.findOne({location: "header_active"})) {
  	var nav = [];
    Pages.find().forEach(function(page) {
      nav.push({id: page._id, title: page.title, slug: page.slug});
    });
    Navigation.insert({location: "header_active", pages: nav});
    Navigation.insert({location: "header_disabled", pages: []});
    Navigation.insert({location: "footer_active", pages: nav});
    Navigation.insert({location: "footer_disabled", pages: []});
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