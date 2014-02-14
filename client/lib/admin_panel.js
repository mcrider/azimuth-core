// Admin panel class and helpers
window.Azimuth = window.Azimuth || {};
Azimuth.adminPanel = {
  loadTemplate: function (template, size) {
    $azimuthContainer = $('.azimuth-container');
    // Hide the panel if clicking on the same action
    if ($azimuthContainer.hasClass(template)) {
      $azimuthContainer.removeClass('menu-small menu-medium menu-large ' + template);
      return;
    }

    $azimuthContainer.attr('class', 'azimuth-container menu-open');
    $azimuthContainer.addClass(template);
    $azimuthContainer.addClass(size);
    $('.contents-container').on('click', function (e) {
      e.stopPropagation();
      Azimuth.adminPanel.hide();
    });
    $('.admin-view').html('');
    UI.insert(UI.render(Template[template]), document.getElementsByClassName('admin-view')[0]);
  },
  show: function () {
    $('.azimuth-container').addClass('menu-open');
    $('.contents-container').on('click', function (e) {
      e.stopPropagation();
      Azimuth.adminPanel.hide();
    });
  },
  hide: function () {
    $('.contents-container').unbind('click');
    $('.action-links li').removeClass('active');
    $('.azimuth-container').attr('class', 'azimuth-container menu-open');
  },
  toggle: function () {
    $('.azimuth-container').toggleClass('menu-open');
  },
  isOpen: function () {
    var $azimuthContainer = $('.azimuth-container');
    return $azimuthContainer.hasClass('menu-small') || $azimuthContainer.hasClass('menu-medium') || $azimuthContainer.hasClass('menu-large');
  }
};
Azimuth.adminPanel.blockEdit = {
  settings: {
    newBlock: false,
    zone: null,
    template: null,
    pageBlockId: null,
    blockId: null,
    insertBefore: 1
  },
  reset: function(settings) {
    var defaultSettings = {
      newBlock: false,
      zone: null,
      template: null,
      pageBlockId: null,
      blockId: null,
      insertBefore: 1
    };
    this.settings = _.extend(defaultSettings, settings);
  },
  // Insert a pageBlock into front of block zone
  insertInFront: function (pageBlockData) {
    Azimuth.collections.PageBlocks.find({
      page: pageBlockData.page,
      zone: pageBlockData.zone
    }).forEach(function (pageBlock) {
      Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { seq: pageBlock.seq + 1 } });
    });
    Azimuth.collections.PageBlocks.insert(pageBlockData);
  },
  // Insert a pageBlock after a specified pageBlock
  insertAfter: function (pageBlockData, skip) {
    Azimuth.collections.PageBlocks.find({
      page: pageBlockData.page,
      zone: pageBlockData.zone
    }, {
      skip: skip,
      sort: { seq: 1 }
    }).forEach(function (pageBlock) {
      Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { seq: pageBlock.seq + 1 } });
    });
    Azimuth.collections.PageBlocks.insert(pageBlockData);
  }
};
// Specify actions and labels for the admin sidebar
Azimuth.adminPanel.actions = [
  {
    label: 'Page Settings',
    icon: 'icon-document-edit',
    description: 'Edit page meta tags',
    template: 'page_settings',
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
    label: 'Navigation',
    icon: 'icon-menu',
    description: 'Edit page meta tags',
    template: 'navigation',
    size: 'menu-medium'
  },
  {
    label: 'Assets',
    icon: 'icon-camera',
    description: 'Edit page meta tags',
    template: 'assets',
    size: 'menu-large'
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
];


// Set the default Noty settings
$.noty.defaults = {
  layout: 'bottomRight',
  theme: 'defaultTheme',
  type: 'alert',
  text: '',
  dismissQueue: true,
  template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
  animation: {
    open: { height: 'toggle' },
    close: { height: 'toggle' },
    easing: 'swing',
    speed: 500
  },
  timeout: 2000,
  force: false,
  modal: false,
  maxVisible: 5,
  closeWith: ['click'],
  callback: {
    onShow: function () {
    },
    afterShow: function () {
    },
    onClose: function () {
    },
    afterClose: function () {
    }
  },
  buttons: false
};