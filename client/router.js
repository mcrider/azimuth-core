/* router.js
 *
 * Uses Meteor-router to route URLs to the correct page.
 *
 */
// Global configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  yieldTemplates: {
    'header': { to: 'header' },
    'footer': { to: 'footer' },
    'admin_panel': { to: 'admin_panel' }
  }
});
// Set up our routes
Router.map(function () {
  // Account routes
  this.route('login', {
    path: '/login',
    controller: LoginController,
    before: function () {
      Session.set('error', false);
      Session.set('buttonText', 'in');
    }
  });
  this.route('sign_up', {
    path: '/sign-up',
    controller: LoginController,
    before: function () {
      Session.set('error', false);
      Session.set('buttonText', 'up');
    }
  });
  this.route('forgot_password', {
    path: '/forgot-password',
    controller: LoginController,
    before: function () {
      Session.set('error', false);
    }
  });
  // Add routes for admin-level pages if user has correct permissions
  this.route('site_settings', {
    controller: AdminController,
    waitOn: function () {
      return [
        Meteor.subscribe('pages'),
        Meteor.subscribe('settings')
      ];
    }
  });
  this.route('assets', {
    controller: AdminController,
    waitOn: function () {
      return Meteor.subscribe('assets');
    }
  });
  this.route('new_page', { controller: AdminController });
  this.route('navigation', {
    controller: AdminController,
    waitOn: function () {
      return Meteor.subscribe('roles');
    }
  });
  this.route('admin_users', {
    controller: AdminController,
    path: '/users',
    waitOn: function () {
      return [
        Meteor.subscribe('users'),
        Meteor.subscribe('roles')
      ];
    }
  });
  // Route / to the admin-set root page or the first page
  this.route('home', {
    path: '/',
    controller: HomePageController
  });
  // Route edit views
  this.route('pageEdit', {
    path: '/:page/edit',
    controller: PageEditController
  });
  // Route pages
  this.route('page', {
    path: '/:page',
    controller: PageController
  });
});