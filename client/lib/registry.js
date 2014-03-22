//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/lib/registry.js
//
// Registry definition for blocks and pages (both in core and in userland)
//  to register themselves with the system.
//

window.Azimuth = window.Azimuth || {};
Azimuth.registry = {
  pageTemplates: {},
  pageTemplate: function (pageTemplate) {
    var name = pageTemplate.name;
    this.pageTemplates[name] = pageTemplate;
  },
  blockTemplates: {},
  blockTemplate: function (blockTemplate) {
    var name = blockTemplate.name;
    this.blockTemplates[name] = blockTemplate;
  }
};