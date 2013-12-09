// Admin panel class and helpers

window.AdminPanel = {
  show: function() {
    // Don't use jquery
  },
  hide: function() {

  },
  toggle: function() {

  }
}

AdminPanel.actions = [
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
