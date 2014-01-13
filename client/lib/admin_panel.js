// Admin panel class and helpers

window.adminPanel = {
  loadTemplate: function(template, size) {
    $azimuthContainer = $('.azimuth-container');

    // Hide the panel if clicking on the same action
    if($azimuthContainer.hasClass(template)) {
      $azimuthContainer.removeClass('menu-small menu-medium menu-large ' + template);
      return;
    }

    $azimuthContainer.addClass(template);
    $azimuthContainer.removeClass('menu-small menu-medium menu-large').addClass(size);
    $('.contents-container').on('click', function(e) {
      e.stopPropagation();
      adminPanel.hide();
    });

    $('.admin-view').html('');
    UI.insert(UI.render(Template[template]), document.getElementsByClassName("admin-view")[0]);
  },
  show: function() {
    $('.azimuth-container').addClass('menu-open');
    $('.contents-container').on('click', function(e) {
      e.stopPropagation();
      adminPanel.hide();
    });
  },
  hide: function() {
    $('.contents-container').unbind('click');
    $('.action-links li').removeClass('active');
    $('.azimuth-container').attr('class', "azimuth-container menu-open");
  },
  toggle: function() {
    $('.azimuth-container').toggleClass('menu-open')
  },
  isOpen: function() {
    var $azimuthContainer = $('.azimuth-container');
    return $azimuthContainer.hasClass('menu-small') || $azimuthContainer.hasClass('menu-medium') || $azimuthContainer.hasClass('menu-large');
  }
}

adminPanel.blockEdit = {
  newBlock: false,
  zone: null,
  template: null,
  blockId: null,
  insertBefore: 1
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
    template: 'navigation',
    size: 'menu-medium'
  },
  {
    label: 'New Page',
    icon: 'icon-plus',
    description: 'Edit page meta tags',
    template: 'new_page',
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
