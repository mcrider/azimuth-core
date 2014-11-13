Package.describe({
  name: 'mcrider:azimuth-core',
  summary: 'Azimuth CMS core code',
  version: '0.3.20',
  git: 'https://github.com/mcrider/azimuth-core/ '
});


Package.on_use(function (api) {
  // Include some core meteor smart packages
  api.use([ 'service-configuration', 'accounts-ui', 'accounts-base', 'accounts-password', 'underscore', 'jquery',
    'less', 'spiderable', 'standard-app-packages'], 'client');

  // Use the meteorite smart packages specified in smart.json
  api.use(['alanning:roles@1.2.13', 'iron:router@1.0.1', 'multiply:iron-router-progress', 'mrt:numeral', 'cfs:standard-packages', 'cfs:filesystem'], 'client');

  // And ensure we have the packages we need server-side available to the server
  api.use(['accounts-base', 'accounts-password', 'spiderable', 'alanning:roles@1.2.13', 'cfs:standard-packages', 'cfs:filesystem'], 'server');

  api.addFiles('server/server_init.js', 'server');


  api.add_files('client/collections.js', 'client');
  api.add_files('client/metadata_fields.js', 'client');
  api.add_files('client/lib/vendor/jquery.nestable.js', 'client');
  api.add_files('client/lib/vendor/noty/jquery.noty.js', 'client');
  api.add_files('client/lib/vendor/noty/layouts/inline.js', 'client');
  api.add_files('client/lib/vendor/noty/layouts/bottomRight.js', 'client');
  api.add_files('client/lib/vendor/noty/themes/default.js', 'client');
  api.add_files('client/css/vendor/jquery.cleditor.css', 'client');
  api.add_files('client/lib/vendor/jquery.cleditor.js', 'client');
  api.add_files('client/lib/vendor/jquery.cleditor.image.js', 'client');
  api.add_files('client/lib/vendor/jquery.cleditor.file.js', 'client');
  api.add_files('client/lib/vendor/jquery.selectize.js', 'client');
  api.add_files('client/css/vendor/selectize.css', 'client');
  api.add_files('client/css/vendor/selectize.default.css', 'client');
  api.add_files('client/lib/helpers.js', 'client');
  api.add_files('client/lib/registry.js', 'client');
  api.add_files('client/lib/utils.js', 'client');
  api.add_files('client/lib/admin_panel.js', 'client');
  api.add_files('client/router.js', 'client');
  api.add_files('client/css/vendor/nestable.css', 'client');
  api.add_files('client/css/main.less', 'client');
  api.add_files('client/css/admin_panel.less', 'client');
  api.add_files('client/css/fonts/dripicons/dripicons.eot', 'client');
  api.add_files('client/css/fonts/dripicons/dripicons.svg', 'client');
  api.add_files('client/css/fonts/dripicons/dripicons.ttf', 'client');
  api.add_files('client/css/fonts/dripicons/dripicons.woff', 'client');
  api.add_files('client/css/dripicons.css', 'client');
  api.add_files('client/css/fonts/raleway/raleway-regular.eot', 'client');
  api.add_files('client/css/fonts/raleway/raleway-regular.svg', 'client');
  api.add_files('client/css/fonts/raleway/raleway-regular.ttf', 'client');
  api.add_files('client/css/fonts/raleway/raleway-regular.woff', 'client');
  api.add_files('client/css/fonts/raleway/raleway-bold.eot', 'client');
  api.add_files('client/css/fonts/raleway/raleway-bold.svg', 'client');
  api.add_files('client/css/fonts/raleway/raleway-bold.ttf', 'client');
  api.add_files('client/css/fonts/raleway/raleway-bold.woff', 'client');
  api.add_files('client/blocks/four_column/four_column.js', 'client');
  api.add_files('client/blocks/six_column/six_column.js', 'client');
  api.add_files('client/blocks/three_column/three_column.js', 'client');
  api.add_files('client/blocks/twelve_column/twelve_column.js', 'client');
  api.add_files('client/blocks/two_column/two_column.js', 'client');
  api.add_files('client/pages/home_page/home_page.js', 'client');
  api.add_files('client/pages/page_default/page_default.js', 'client');
  api.add_files('client/pages/sidebar_left/sidebar_left.js', 'client');
  api.add_files('client/pages/sidebar_right/sidebar_right.js', 'client');
  api.add_files('client/views/accounts/account_buttons.js', 'client');
  api.add_files('client/views/accounts/error.js', 'client');
  api.add_files('client/views/accounts/forgot_password.js', 'client');
  api.add_files('client/views/accounts/login.js', 'client');
  api.add_files('client/views/accounts/sign_up.js', 'client');
  api.add_files('client/views/accounts/social.js', 'client');
  api.add_files('client/views/admin/admin_users.html', 'client');
  api.add_files('client/views/admin/admin_users.js', 'client');
  api.add_files('client/views/admin/navigation.html', 'client');
  api.add_files('client/views/admin/navigation.js', 'client');
  api.add_files('client/views/admin/site_settings.html', 'client');
  api.add_files('client/views/admin/site_settings.js', 'client');
  api.add_files('client/views/admin/pages/page_settings.html', 'client');
  api.add_files('client/views/admin/pages/page_settings.js', 'client');
  api.add_files('client/views/admin/pages/new_page.html', 'client');
  api.add_files('client/views/admin/pages/new_page.js', 'client');
  api.add_files('client/views/admin/pages/page_template_selector.html', 'client');
  api.add_files('client/views/admin/pages/page_template_selector.js', 'client');
  api.add_files('client/views/admin/assets.html', 'client');
  api.add_files('client/views/admin/assets.js', 'client');
  api.add_files('client/views/admin/admin_panel.html', 'client');
  api.add_files('client/views/admin/admin_panel.js', 'client');
  api.add_files('client/views/admin/blocks/block_edit.html', 'client');
  api.add_files('client/views/admin/blocks/block_edit.js', 'client');
  api.add_files('client/views/admin/blocks/block_tag_edit.html', 'client');
  api.add_files('client/views/admin/blocks/block_tag_edit.js', 'client');
  api.add_files('client/views/admin/blocks/block_type_edit.html', 'client');
  api.add_files('client/views/admin/blocks/block_type_edit.js', 'client');
  api.add_files('client/views/admin/blocks/block_zone_edit.html', 'client');
  api.add_files('client/views/admin/blocks/block_zone_edit.js', 'client');
  api.add_files('client/views/block_set.html', 'client');
  api.add_files('client/views/block_set.js', 'client');
  api.add_files('client/views/block_display.js', 'client');
  api.add_files('client/views/footer.js', 'client');
  api.add_files('client/views/form/wysiwyg.html', 'client');
  api.add_files('client/views/form/wysiwyg.js', 'client');
  api.add_files('client/views/form/tag.html', 'client');
  api.add_files('client/views/form/tag.js', 'client');
  api.add_files('client/views/form/metadata.html', 'client');
  api.add_files('client/views/form/metadata.js', 'client');
  api.add_files('client/views/form/text.html', 'client');
  api.add_files('client/views/form/textarea.html', 'client');
  api.add_files('client/views/header.js', 'client');
  api.add_files('client/views/layout.js', 'client');
  api.add_files('client/index.html', 'client');
  api.add_files('img/azimuth-logo.png', 'client');
  api.add_files('img/buttons.png', 'client');
  api.add_files('img/toolbar.gif', 'client');
  api.add_files('img/file.gif', 'client');
  api.add_files('img/image.gif', 'client');
  api.add_files('img/file-large.png', 'client');

});