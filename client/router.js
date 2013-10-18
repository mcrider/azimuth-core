/* router.js
 *
 * Uses Meteor-router to route URLs to the correct page.
 *
 */


Router.configure({
  layout: 'layout',

  notFoundTemplate: '404',

  // loadingTemplate: 'loading',

  renderTemplates: {
    'header': { to: 'header' },
    'footer': { to: 'footer' }
  }
});

Router.map(function() {
  this.route('loginButtonsFullPage', {path: '/login'});

  // Add routes for admin-level pages if user has correct permissions
  this.route('site_settings', {
    controller: AdminController
  });
  this.route('assets', {
    controller: AdminController
  });
  this.route('new_page', {
    controller: AdminController
  });
  this.route('navigation', {
    controller: AdminController
  });
  this.route('admin_users', {
    controller: AdminController,
    path: '/users'
  });

  // Login
  this.route('admin_users', {
    controller: AdminController,
    path: '/users'
  });

  // Route / to the admin-set root page or the first page
  this.route('home', {
    path: '/',
    controller: HomePageController
  })

  // Route pages
  this.route('pageEdit', {
    path: '/:page/edit',
    controller: PageEditController
  })

  // Route pages
  this.route('page', {
    path: '/:page',
    controller: PageController
  })

  this.route('page', {
    path: '*',
    controller: PageController
  })
});
