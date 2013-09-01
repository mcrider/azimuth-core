Package.describe({
    summary: "Azimuth CMS core code"
});

Package.on_use(function (api) {
  api.use(['preserve-inputs', 'accounts-base', 'accounts-password', 'backbone', 'underscore', 'jquery', 'pnotify', 'less', 'roles', 'router', 'filepicker', 'bootstrap-wysiwyg', 'font-awesome', 'analyticsjs', 'spiderable', 'standard-app-packages', 'HTML5-History-API', 'ncp', 'page-js-ie-support'], 'client');

  // Add weak dependencies to our front-end packages
  api.use(['azimuth-views-bootstrap', 'azimuth-views-foundation'], 'client', {weak: true});

  api.add_files([
    'server/server_init.js'
  ], 'server');

  api.add_files([
    'client/collections.js',
    'client/lib/events.js',
    'client/lib/events.js',
    'client/lib/events.js',
    'client/lib/external/jquery.dragsort-0.5.1.min.js',
    'client/lib/external/jquery.nestable.js',
    'client/lib/helpers.js',
    'client/lib/registry.js',
    'client/lib/utils.js',
    'client/router.js',
    'client/css/external/nestable.css',
    'client/css/main.less',
    'client/blocks/basic_content/basic_content.js',
    'client/blocks/basic_content/basic_content_edit.js',
    'client/blocks/blog_post/blog_post.js',
    'client/blocks/blog_post/blog_post_edit.js',
    'client/blocks/four_column/four_column.js',
    'client/blocks/four_column/four_column_edit.js',
    'client/blocks/six_column/six_column.js',
    'client/blocks/six_column/six_column_edit.js',
    'client/blocks/three_column/three_column.js',
    'client/blocks/three_column/three_column_edit.js',
    'client/blocks/twelve_column/twelve_column.js',
    'client/blocks/twelve_column/twelve_column_edit.js',
    'client/blocks/two_column/two_column.js',
    'client/blocks/two_column/two_column_edit.js',
    'client/pages/home_page/home_page.js',
    'client/pages/home_page/home_page_edit.js',
    'client/pages/page_default/page_default.js',
    'client/pages/page_default/page_default_edit.js',
    'client/pages/sidebar_left/sidebar_left.js',
    'client/pages/sidebar_left/sidebar_left_edit.js',
    'client/pages/sidebar_left_scrollspy/sidebar_left_scrollspy.js',
    'client/pages/sidebar_left_scrollspy/sidebar_left_scrollspy_edit.js',
    'client/pages/sidebar_right/sidebar_right.js',
    'client/pages/sidebar_right/sidebar_right_edit.js',
    'client/views/accounts/accounts_ui.js',
    'client/views/accounts/login_buttons.js',
    'client/views/accounts/login_buttons_dialogs.js',
    'client/views/accounts/login_buttons_dropdown.js',
    'client/views/accounts/login_buttons_fullpage.js',
    'client/views/accounts/login_buttons_single.js',
    'client/views/admin/admin_users.js',
    'client/views/admin/navigation.js',
    'client/views/admin/site_settings.js',
    'client/views/blocks/block_display.js',
    'client/views/blocks/block_zone_editor.js',
    'client/views/blocks/modals/delete_block.js',
    'client/views/blocks/modals/edit_block.js',
    'client/views/blocks/modals/existing_block.js',
    'client/views/blocks/modals/tag_block.js',
    'client/views/footer.js',
    'client/views/form/wysiwyg.js',
    'client/views/header.js',
    'client/views/pages/new_page.js',
    'client/views/pages/page_template_selector.js',
    'client/index.html',
    'img/buttons.gif',
    'img/toolbar.gif',
    'img/file.gif',
    'img/image.gif',
    'client/css/external/jquery.cleditor.css',
    'client/lib/external/jquery.cleditor.js',
    'client/lib/external/jquery.cleditor.image.js',
    'client/lib/external/jquery.cleditor.file.js',
    'img/loading.gif'
  ], 'client');
});

