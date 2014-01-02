// Admin panel class and helpers

window.adminPanel = {
  loadTemplate: function(template, size) {
    $azimuthContainer = $(".azimuth-container");

    // Hide the panel if clicking on the same action
    if($azimuthContainer.hasClass(template)) {
      $azimuthContainer.removeClass('menu-small menu-medium menu-large ' + template);
      return;
    }

    $azimuthContainer.addClass(template);
    $azimuthContainer.removeClass('menu-small menu-medium menu-large').addClass(size);

    var fragment = Meteor.render( function() {
      return Template[ template ](); // this calls the template and returns the HTML.
    });
    $('.admin-view').html(fragment);
  },
  show: function() {
    $(".azimuth-container").addClass('menu-open')
  },
  hide: function() {
    $(".azimuth-container").removeClass('menu-small menu-medium menu-large')
  },
  toggle: function() {
    $(".azimuth-container").toggleClass('menu-open')
  }
}

adminPanel.blockEdit = {
  newBlock: false,
  zone: null,
  template: null,
  blockId: null
}

adminPanel.actions = [
  {
    label: 'Page Settings',
    icon: 'page-settings',
    description: 'Edit page meta tags',
    template: 'page_settings',
    size: 'menu-medium'
  },
  {
    label: 'All Pages',
    icon: 'all-pages',
    description: 'Edit page meta tags',
    template: 'all_pages',
    size: 'menu-small'
  },
  {
    label: 'Users',
    icon: 'users',
    description: 'Edit page meta tags',
    template: 'admin_users',
    size: 'menu-large'
  },
  {
    label: 'Site Settings',
    icon: 'site-settings',
    description: 'Edit page meta tags',
    template: 'site_settings',
    size: 'menu-medium'
  },
  {
    label: 'Assets',
    icon: 'assets',
    description: 'Edit page meta tags',
    template: 'assets',
    size: 'menu-medium'
  },
  {
    label: 'New Page',
    icon: 'new-page',
    description: 'Edit page meta tags',
    template: 'metadata',
    size: 'menu-small'
  },
  {
    label: 'Navigation',
    icon: 'navigation',
    description: 'Edit page meta tags',
    template: 'metadata',
    size: 'menu-medium'
  }
]
