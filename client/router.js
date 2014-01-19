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
  // Route / to the admin-set root page or the first page
  this.route('home', {
    path: '/',
    controller: HomePageController
  });
  // Route pages
  this.route('page', {
    path: '/:page',
    controller: PageController
  });
});