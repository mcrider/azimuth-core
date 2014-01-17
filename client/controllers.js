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
      Meteor.subscribe('assets')
    ];
  }
});
HomePageController = BaseController.extend({
  before: function () {
    var page_slug = utils.getSetting('indexPage');
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
      Meteor.subscribe('assets')
    ];
  }
});
// Controller to handle editing of pages
PageEditController = BaseController.extend({
  before: function () {
    var page_slug = this.params.page;
    var page = Azimuth.collections.Pages.findOne({ slug: page_slug });
    if (!page)
      return false;
    // Add common edit page events
    Template[page.template + '_edit'].events = {
      'submit #pageEditForm': events.savePage,
      'click #deletePage': events.showDeletePageModal,
      'click .delete-page': events.deletePage
    };
    if (Roles.userIsInRole(Meteor.user(), [
        'admin',
        'author'
      ])) {
      this.template = page.template + '_edit';
      this.render();
    } else {
      this.template = 'not_authorized';
      this.render();
    }
  },
  waitOn: function () {
    return [
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation'),
      Meteor.subscribe('pages'),
      Meteor.subscribe('blocks'),
      Meteor.subscribe('pageBlocks'),
      Meteor.subscribe('assets')
    ];
  }
});
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
      Meteor.subscribe('navigation')
    ];
  }
});
LoginController = BaseController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('settings'),
      Meteor.subscribe('navigation')
    ];
  }
});