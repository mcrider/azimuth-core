//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/router.js
//
// Iron-Router route configuration -- Direct the user to different parts of
// the app based on the URL they enter.
//

// Global configuration
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  yieldTemplates: {
    'header': { to: 'header' },
    'footer': { to: 'footer' },
    'admin_panel': { to: 'admin_panel' }
  }
});
Router.onAfterAction(function() {
  // Set page metadata
  var page = Azimuth.utils.getCurrentPage();
  if (page && page.meta) {
    $('head').find('.azimuth-tag').remove();
    page.meta.forEach(function (tag) {
      var metadata = _.findWhere(Azimuth.metadata_fields, { meta_key: tag.key });
      $('head').append(metadata.template.replace('%s', tag.value));
    });
  }
});
// Set up our routes
Router.map(function () {
  // Account routes
  this.route('login', {
    path: '/login',
    waitOn: function () {
      return [
        Meteor.subscribe('settings'),
        Meteor.subscribe('navigation')
      ];
    },
    onBeforeAction: function () {
      Session.set('error', false);
      Session.set('buttonText', 'in');
    }
  });
  this.route('sign_up', {
    path: '/sign-up',
    waitOn: function () {
      return [
        Meteor.subscribe('settings'),
        Meteor.subscribe('navigation')
      ];
    },
    onBeforeAction: function () {
      Session.set('error', false);
      Session.set('buttonText', 'up');
    }
  });
  this.route('forgot_password', {
    path: '/forgot-password',
    waitOn: function () {
      return [
        Meteor.subscribe('settings'),
        Meteor.subscribe('navigation')
      ];
    },
    beforeonBeforeAction: function () {
      Session.set('error', false);
    }
  });
  // Route / to the admin-set root page or the first page
  this.route('home', {
    path: '/',
    waitOn: function() {
      return [
        this.subscribe('settings'),
        this.subscribe('navigation'),
        this.subscribe('pages'),
        this.subscribe('blocks'),
        this.subscribe('pageBlocks'),
        this.subscribe('userData'),
        this.subscribe('assets')
      ];
    },
    action: function() {
      if (this.ready()) {
        var page_slug = Azimuth.utils.getSetting('indexPage');
        var page = Azimuth.collections.Pages.findOne({ slug: page_slug });
        if (!page) {
          page = Azimuth.collections.Pages.findOne();
          if (!page)
            return '404';
          else
            page_slug = page.slug;
        }
        this.template = page.template;
        this.render(page.template);
      }
    }
  });
  // Route pages
  this.route('page', {
    path: '/:page',
    waitOn: function() {
      return [
         Meteor.subscribe('settings'),
      Meteor.subscribe('navigation'),
      Meteor.subscribe('pages'),
      Meteor.subscribe('blocks'),
      Meteor.subscribe('pageBlocks'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('assets')
      ];
    },
    action: function() {
      if (this.ready()) {
        var page_slug = this.params.page;
        var page = Azimuth.collections.Pages.findOne({ slug: page_slug });
        if (!page) {
          page = Azimuth.collections.Pages.findOne();
          if (!page)
            return '404';
          else
            page_slug = page.slug;
        }
        this.template = page.template;
        this.render(page.template);
      }
    }
  });
});