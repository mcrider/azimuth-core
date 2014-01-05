Template.admin_panel.rendered = function() {
  // Display the admin panel if the user is authorized
  if(Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin', 'author'])) {
    $('.azimuth-container').delay(500).queue(function(next){
      $(this).addClass('menu-open');
      next();
    });
  }
}

Template.admin_panel.events = {
  'click .action': function(e) {
    $(e.currentTarget).parent('li').toggleClass('active');
    var template = this.template;
    var size = this.size;
    adminPanel.loadTemplate(template, size);
  }
}

Template.admin_panel.actions  = function() {
  return adminPanel.actions;
}