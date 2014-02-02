// Base controller to define features common to all other controllers
BaseController = RouteController.extend({
  loadingTemplate: 'loading',
  after: function () {
    $('.hide-until-rendered').removeClass('hide-until-rendered');
  }
});
// Controller for displaying pages that have been created in the CMS
PageController = BaseController.extend({
  before: function () {
    var page_slug = this.params.page;
    var page = Azimuth.collections.Pages.findOne({ slug: page_slug });
    if (page) {
      this.template = page.template;
    }
    this.render();
  },
  waitOn: function () {
    return [
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation'),
      Meteor.subscribe('pages'),
      Meteor.subscribe('blocks'),
      Meteor.subscribe('pageBlocks'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('assets')
    ];
  }
});
// Controller for the home page
HomePageController = BaseController.extend({
  before: function () {
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
    this.render();
  },
  waitOn: function () {
    return [
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation'),
      Meteor.subscribe('pages'),
      Meteor.subscribe('blocks'),
      Meteor.subscribe('pageBlocks'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('assets')
    ];
  }
});
// Controller for admin templates
AdminController = BaseController.extend({
  before: function () {
    if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), [
        'admin',
        'author'
      ])) {
      this.render('not_authorized');
      this.stop();
      return;
    }
  },
  waitOn: function () {
    return [
      Meteor.subscribe('pages'),
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation'),
      Meteor.subscribe('userData')
    ];
  }
});
// Controller for account related pages
LoginController = BaseController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation')
    ];
  }
});