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

  //FIXME: Add 'AdminController' to these routes and deny if not logged in as admin
  this.route('site_settings', {
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

  // Route pages
  this.route('page', {
    path: '/:page',
    controller: PageController
  })


  // this.route('showPost', {
  //   path: '/posts/:_id',
  //   data: function() { return Posts.findOne(this.params._id); },
  //   waitOn: postsSub,
  //   loadingTemplate: 'loading',
  //   notFoundTemplate: 'notFound'
  // });


  // this.route('showPost', {
  //   path: '/posts/:_id',
  //   data: function() { return Posts.findOne(this.params._id); }
  // });
});
/*
Meteor.Router.add({

  "/login": function() {
    return 'loginButtonsFullPage';
  },

  "
  "/": function() {
    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      var page_slug = utils.getSetting('indexPage');
      var page = Pages.findOne({slug: page_slug});
      if(!page) {
        page = Pages.findOne();
        if (!page) return '404';
        else page_slug = page.slug;
      }

      Session.set("page-slug", page_slug);
      return page.template;
    }
  },
  "* / edit": function (page_slug) {
    if (!Roles.userIsInRole(Meteor.user(), ['author','admin'])) {
      return false;
    }

    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);

      var page = Pages.findOne({slug: page_slug});
      if(!page) return '404';

      // Add common edit page events
      Template[page.template + '_edit'].events = {
        'submit #pageEditForm': events.savePage,
        'click #deletePage': events.showDeletePageModal,
        'click .delete-page': events.deletePage
      }

      Session.set("page-slug", page_slug);
      return page.template + '_edit';
    }
  },
  "*": function (page_slug) {
    // Don't render until we have our data
    if (!pagesSubscription.ready() || !settingsSubscription.ready()) {
      return '';
    } else {
      if (page_slug.charAt(0) == '/') page_slug = page_slug.substr(1);

      var page = Pages.findOne({slug: page_slug});
      if(!page) return '404';

      Session.set("page-slug", page_slug);
      return page.template;
    }
  }
});
*/
