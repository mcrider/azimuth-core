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

    UI.insert(UI.render(Template[template]), document.getElementsByClassName("admin-view")[0]);
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
    icon: 'icon-document-edit',
    description: 'Edit page meta tags',
    template: 'page_settings',
    size: 'menu-medium'
  },
  {
    label: 'Navigation',
    icon: 'icon-menu',
    description: 'Edit page meta tags',
    template: 'metadata',
    size: 'menu-medium'
  },
  {
    label: 'New Page',
    icon: 'icon-plus',
    description: 'Edit page meta tags',
    template: 'metadata',
    size: 'menu-small'
  },
  {
    label: 'Assets',
    icon: 'icon-camera',
    description: 'Edit page meta tags',
    template: 'assets',
    size: 'menu-medium'
  },
  {
    label: 'Site Settings',
    icon: 'icon-gear',
    description: 'Edit page meta tags',
    template: 'site_settings',
    size: 'menu-medium'
  },
  {
    label: 'Users',
    icon: 'icon-user-group',
    description: 'Edit page meta tags',
    template: 'admin_users',
    size: 'menu-large'
  }
]
