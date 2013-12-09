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
  'click .azimuth-admin-panel-toggle': function() {
    $(".azimuth-container").toggleClass('menu-open')

    // Set up blocks to edit
  },
  'click .action': function() {
    $azimuthContainer = $(".azimuth-container");

    if($azimuthContainer.hasClass(this.template)) {
      $azimuthContainer.removeClass('menu-small menu-medium menu-large ' + this.template);
      return;
    }

    $azimuthContainer.addClass(this.template);

    var size = this.size;
    $azimuthContainer.removeClass('menu-small menu-medium menu-large').addClass(size)

    var template = this.template;
    $('.admin-view').html(Template[template]());
  }
}

Template.admin_panel.actions  = function() {
  return AdminPanel.actions;
}