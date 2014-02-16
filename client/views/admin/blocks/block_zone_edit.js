//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/blocks/block_zone_edit.js
//
// Helpers and event handlers for the block zone editor admin panel.
//

Template.block_zone_edit.events = {
  'click .page-count': function (e) {
    e.preventDefault();
    var zone = $(e.currentTarget).closest('.block-zone-container').data('zone');
    var page = Azimuth.utils.getCurrentPage();
    var limit = {};
    limit['zone_' + zone + '_limit'] = this.valueOf();
    Azimuth.collections.Pages.update(page._id, { $set: limit });
  }
};
Template.block_zone_edit.blockCount = function () {
  return _.range(1, 51);
};
Template.block_zone_edit.limit = function () {
  var zone = Azimuth.adminPanel.blockEdit.settings.zone;
  var page = Azimuth.utils.getCurrentPage();
  var limit = page['zone_' + zone + '_limit'];
  return limit && limit > 0 ? page['zone_' + zone + '_limit'] : false;
};
Template.site_settings.selectIfLimitEquals = function (value) {
  var page = Azimuth.utils.getCurrentPage();
  var limit = page['zone_' + zone + '_limit'];
  return limit == value;
  if (limit == value) return 'selected';
};
