// admin panel views go here
Template.admin_panel.events = {
  'click .azimuth-admin-panel-toggle': function() {
    $(".azimuth-container").toggleClass('menu-open')
  },
  'click .action': function() {
    var size = this.size;
    $(".azimuth-container").removeClass('menu-small menu-medium menu-large').addClass(size)
  }
}

Template.admin_panel.actions  = function() {
  return AdminPanel.actions;
}