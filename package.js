Package.describe({
    summary: "Azimuth CMS core code"
});

Package.on_use(function (api) {
  // Include some core meteor smart packages
  api.use([ 'service-configuration', 'accounts-ui', 'accounts-base', 'accounts-password', 'underscore', 'jquery',
    'less', 'spiderable', 'standard-app-packages'], 'client');

  // Use the meteorite smart packages specified in smart.json
  api.use(['font-awesome','roles','iron-router','analyticsjs', 'collectionFS'], 'client');

  // And ensure we have the packages we need server-side available to the server
  api.use(['accounts-base', 'accounts-password', 'spiderable', 'roles', 'collectionFS', 'cfs-public-folder'], 'server');

  api.add_files([
    'server/server_init.js'
  ], 'server');

  api.add_files([
    'client/collections.js',
    'client/metadata_fields.js',
    'client/lib/events.js',
    'client/lib/external/jquery.sortable.js',
    'client/lib/external/jquery.nestable.js',
    'client/lib/external/noty/jquery.noty.js',
    'client/lib/external/noty/layouts/inline.js',
    'client/lib/external/noty/layouts/bottomRight.js',
    'client/lib/external/noty/themes/default.js',
    'client/css/external/jquery.cleditor.css',
    'client/lib/external/jquery.cleditor.js',
    'client/lib/external/jquery.cleditor.image.js',
    'client/lib/external/jquery.cleditor.file.js',
    'client/lib/external/jquery.selectize.js',
    'client/css/external/selectize.css',
    'client/css/external/selectize.default.css',
    'client/lib/helpers.js',
    'client/lib/registry.js',
    'client/lib/utils.js',
    'client/lib/admin_panel.js',
    'client/controllers.js',
    'client/router.js',
    'client/css/external/nestable.css',
    'client/css/main.less',
    'client/css/admin_panel.less',
    'client/blocks/four_column/four_column.js',
    'client/blocks/six_column/six_column.js',
    'client/blocks/three_column/three_column.js',
    'client/blocks/twelve_column/twelve_column.js',
    'client/blocks/two_column/two_column.js',
    'client/pages/home_page/home_page.js',
    'client/pages/page_default/page_default.js',
    'client/pages/sidebar_left/sidebar_left.js',
    'client/pages/sidebar_left_fixed/sidebar_left_fixed.js',
    'client/pages/sidebar_right/sidebar_right.js',
    'client/views/accounts/account_buttons.js',
    'client/views/accounts/error.js',
    'client/views/accounts/forgot_password.js',
    'client/views/accounts/login.js',
    'client/views/accounts/sign_up.js',
    'client/views/accounts/social.js',
    'client/views/admin/admin_users.js',
    'client/views/admin/navigation.js',
    'client/views/admin/site_settings.js',
    'client/views/admin/assets.js',
    'client/views/admin/admin_panel.js',
    'client/views/admin/admin_panel.html',
    'client/views/blocks/block_display.js',
    'client/views/blocks/block_zone_editor.js',
    'client/views/blocks/modals/delete_block.js',
    'client/views/blocks/modals/edit_block.js',
    'client/views/blocks/modals/existing_block.js',
    'client/views/blocks/modals/tag_block.js',
    'client/views/footer.js',
    'client/views/form/wysiwyg.js',
    'client/views/form/tag.js',
    'client/views/form/metadata.js',
    'client/views/header.js',
    'client/views/layout.js',
    'client/views/pages/new_page.js',
    'client/views/pages/page_template_selector.js',
    'client/index.html',
    'img/buttons.gif',
    'img/toolbar.gif',
    'img/file.gif',
    'img/image.gif',
    'img/file-large.png',
    'img/loading.gif'
  ], 'client');
});

