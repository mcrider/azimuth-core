// Server-side startup code (set up collections, add default data if needed)
// Initialize asset collection outside of startup
Assets = new CollectionFS('assets');
var handler = {
    'default': function (options) {
      return {
        blob: options.blob,
        fileRecord: options.fileRecord
      };
    }
  };
Assets.fileHandlers(handler);
Meteor.startup(function () {
  // Helper functions for authorization
  authorize = {
    authorsAndAdmins: function () {
      return Meteor.user() && Roles.userIsInRole(Meteor.user(), [
        'author',
        'admin'
      ]);
    },
    admins: function () {
      return Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin']);
    }
  };
  AccountsEntry = {
    settings: {
      homeRoute: '/',
      defaultProfile: {}
    },
    config: function (appConfig) {
      return this.settings = _.extend(this.settings, appConfig);
    }
  };
  Meteor.methods({
    entrySettings: function () {
      return {
        profileRoute: AccountsEntry.settings.profileRoute,
        homeRoute: AccountsEntry.settings.homeRoute
      };
    },
    accountsCreateUser: function (username, email, password) {
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
      if (Meteor.users.find().count() == 1 && userId && !Roles.userIsInRole(userId, ['admin'])) {
        // Add first user to admin role
        Roles.addUsersToRoles(userId, ['admin']);
      }
    },
    usersExist: function () {
      return Meteor.users.find().count() > 0;
    }
  });
  // Pages
  Pages = new Meteor.Collection('pages');
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
        slug: 'home',
        label: 'Home',
        template: 'page_default',
        meta: [{
            key: 'title',
            value: 'Home'
          }]
      });
  }
  // Blocks
  Meteor.publish('blocks', function () {
    return Blocks.find();
  });
  Blocks = new Meteor.Collection('blocks');
  Blocks.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  if (!Blocks.find().count()) {
    // Insert a default block
    Blocks.insert({
      template: 'twelve_column',
      tag: ['intro-block'],
      contents: '<div class="centered"><img src="/packages/azimuth-core/img/azimuth-logo.png">' +
                  '<p style="font-size: 1.6em;">' +
                  '<span class="hi-there" style="font-weight: 500;">Hi There!</span>  ' +
                  '<span class="get-started" style="font-weight: 100;">Let\'s get started.</span></p>' +
                  '<p>If you need some help with Azimuth, please check out <a href="">the docs</a>.  ' +
                  'When you’re ready, <a>login</a> and you can start crafting your site.  I ' +
                  'recommend starting by editing this block (just hover over it and click the edit icon).</p></div>',
      created: Date.now()
    });
  }
  // PageBlocks -- Links block instances and the pages that contain them
  Meteor.publish('pageBlocks', function () {
    return PageBlocks.find();
  });
  PageBlocks = new Meteor.Collection('pageBlocks');
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
      page: pageId,
      block: blockId,
      seq: 1,
      zone: 'body',
      added: Date.now()
    });
  }
  // Users
  Meteor.publish('users', function () {
    if (authorize.admins)
      return Meteor.users.find();
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
  Settings = new Meteor.Collection('settings');
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
      siteName: 'Azimuth CMS',
      indexPage: 'home',
      showLoginInHeader: true,
      addNewPagesToHeader: true,
      addNewPagesToFooter: true,
      openRegistration: false,
      theme: 'flatBlue'
    });
  }
  // Header and footer navigation
  Navigation = new Meteor.Collection('navigation');
  Meteor.publish('navigation', function () {
    return Navigation.find();
  });
  Navigation.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });
  if (!Navigation.findOne({ location: 'header' })) {
    Pages.find().forEach(function (page) {
      Navigation.insert({
        location: 'header',
        title: page.label,
        url: '/' + page.slug,
        root: true
      });
      Navigation.insert({
        location: 'footer',
        title: page.label,
        url: '/' + page.slug,
        root: true
      });
    });
  }
  // Asset Library (uses CollectionFS package)
  Meteor.publish('assets', function () {
    return Assets.find();
  });
  Assets.allow({
    insert: authorize.authorsAndAdmins,
    update: authorize.authorsAndAdmins,
    remove: authorize.authorsAndAdmins
  });
  var handler = {
      'default': function (options) {
        return {
          blob: options.blob,
          fileRecord: options.fileRecord
        };
      }
    };
  Assets.fileHandlers(handler);
});