
PageController = RouteController.extend({
  run: function() {
    var page_slug = this.params.page;
    var page = Pages.findOne({slug: page_slug});
    if(!page) return false;

    Session.set("page-slug", page_slug);
    this.template = page.template;

    this.render();

    this.render({
      header: {to: 'header'},
      footer: {to: 'footer'}
    })
  },
  data: function() {
    return Pages.findOne({slug: this.params.page});
  },
  template: 'sidebar_left'
});

AdminController = RouteController.extend({
  run: function() {
    if(Roles.userIsInRole(Meteor.user(), ['admin'])) {
      this.render();
    }
    this.render({
      header: {to: 'header'},
      footer: {to: 'footer'}
    })
  }
});
