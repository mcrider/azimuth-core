//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/lib/admin_panel.js
//
// Defaults and utility functions for the admin panel.
//

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
    $('.azimuth-block-edit-toggle, .azimuth-block-edit-panel').removeClass('active');
    $azimuthContainer.attr('class', 'azimuth-container menu-open');
    $azimuthContainer.addClass(template);
    $azimuthContainer.addClass(size);
    $('.contents-container').on('click', function (e) {
      e.stopPropagation();
      Azimuth.adminPanel.hide();
    });
    $('.admin-view').html('');
    UI.DomRange.insert(UI.render(Template[template]).dom, document.getElementsByClassName('admin-view')[0]);
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
  },
  initEditToggle: function() {
    // Display block-specific admin buttons when hovered over
    if (Meteor.user() && Roles.userIsInRole({ _id: Meteor.user()._id }, [
        'author',
        'admin'
      ])) {
      // Setup block edit panel interactions
      $(this.firstNode).append('<a href="#" class="azimuth-block-edit-toggle"><span class="pip"></span><span class="pip"></span><span class="pip"></span></a>');
      $('.azimuth-block').undelegate('click').delegate('.azimuth-block-edit-toggle', 'click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        // Store some state about what we're currently editing
        Azimuth.adminPanel.blockEdit.settings.pageBlockId = $(e.currentTarget).closest('.azimuth-block').data('page-block-id');
        Azimuth.adminPanel.blockEdit.settings.zone = $(e.currentTarget).closest('.azimuth-block-zone').data('zone');
        $('.azimuth-block-edit-toggle').removeClass('active');
        $(this).addClass('active');
        // Toggle the row break active state
        if (Azimuth.adminPanel.blockEdit.getPageBlock().break) {
          $('.azimuth-block-edit-panel .block-break-after').addClass('highlight');
        } else{
          $('.azimuth-block-edit-panel .block-break-after').removeClass('highlight');
        }
        // Get the position of the toggle button so we can center the edit panel under it
        var offset = $(this).offset();
        var toggleWidth = $(this).width();
        var offsetTop = offset.top + 5;
        var offsetLeft = offset.left - ($('.azimuth-block-edit-panel').width() / 2) + (toggleWidth / 2) + 3;
        $('.azimuth-block-edit-panel').css('top', offsetTop).css('left', offsetLeft).toggleClass('active');
      })
      $('html').click(function() {
        $('.azimuth-block-edit-toggle').removeClass('active');
        if($('.azimuth-block-edit-panel').hasClass('active')) $('.azimuth-block-edit-panel').removeClass('active');
      })
    }
  }
};
Azimuth.adminPanel.blockEdit = {
  settings: {
    newBlock: false,
    zone: null,
    template: null,
    pageBlockId: null,
    blockId: null,
    insertBefore: 1,
    insertAfter: false
  },
  reset: function(settings) {
    var defaultSettings = {
      newBlock: false,
      zone: null,
      template: null,
      pageBlockId: null,
      blockId: null,
      insertBefore: 1,
      insertAfter: false
    };
    this.settings = _.extend(defaultSettings, settings);
  },
  // Insert a pageBlock into beginning of block zone
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
  },
  // Convenience methods
  getPageBlock: function() {
    return Azimuth.collections.PageBlocks.findOne(this.settings.pageBlockId);
  },
  getBlock: function() {
    return Azimuth.collections.Blocks.findOne(this.settings.blockId);
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