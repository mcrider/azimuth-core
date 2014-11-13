//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/server/server_init.js
//
// Server side code to initialize our collections and bootstrap content.
//


// Server-side startup code (set up collections, add default data if needed)
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
    accountsCreateUser: function (username, email, password) {
      if (username) {
        var userId = Accounts.createUser({
            username: username,
            email: email,
            password: password,
            createdAt: Date.now(),
            profile: AccountsEntry.settings.defaultProfile || {}
          });
      } else {
        var userId = Accounts.createUser({
            email: email,
            username: email,
            password: password,
            createdAt: Date.now(),
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
  // Roles
  Meteor.publish('roles', function () {
    return Meteor.roles.find();
  });
  Meteor.roles.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
  });
  // Users
  Meteor.publish('userData', function () {
    if (authorize.admins)
      return Meteor.users.find();
  });
  Meteor.users.allow({
    insert: authorize.admins,
    update: authorize.admins,
    remove: authorize.admins
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
      contents: '<div class="centered"><img src="/packages/mcrider_azimuth-core/img/azimuth-logo.png">' +
                '<p style="font-size: 1.6em;"><span class="hi-there" style="font-weight: 500;">Azimuth</span>' +
                '<br><span class="get-started" style="font-weight: 100;">Simple content management for Meteor.js.</span>' +
                '</p><p style="font-size: .85em;"><a href="/sign-up">Create an account</a> to get started ' +
                'creating your site. &nbsp;And If you need a little help getting started, take&nbsp;<a href="">the docs</a>' +
                '&nbsp;for a spin.</p></div>',
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
  // Initialize asset collection outside of startup
  Assets = new FS.Collection('assets', {
    stores: [new FS.Store.FileSystem("default")]
  });
  Meteor.publish('assets', function () {
    return Assets.find();
  });
  Assets.allow({
    download: function() { return true; },
    insert: function() { return Meteor.userId },
    update: function() { return Meteor.userId; },
    remove: authorize.authorsAndAdmins
  });
});