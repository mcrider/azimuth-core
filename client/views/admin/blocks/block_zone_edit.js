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
  'change .block-count': function (e) {
    e.preventDefault();
    var zone = Azimuth.adminPanel.blockEdit.settings.zone;
    var page = Azimuth.utils.getCurrentPage();
    var limit = {};
    limit['zone_' + zone + '_limit'] = $(e.currentTarget).val();
    Azimuth.collections.Pages.update(page._id, { $set: limit });
  },
  'change .block-sort': function (e) {
    e.preventDefault();
    var zone = Azimuth.adminPanel.blockEdit.settings.zone;
    var page = Azimuth.utils.getCurrentPage();
    var maxSeq = Azimuth.collections.PageBlocks.find({
      page: page._id,
      zone: zone
    }).count();
    switch ($(e.currentTarget).val()) {
      case 'sort-reverse':
        Azimuth.collections.PageBlocks.find({
          page: page._id,
          zone: zone
        }, { sort: { seq: 1 }}).forEach(function (pageBlock) {
          Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { seq: maxSeq } });
          maxSeq--;
        });
        break;
      case 'sort-date-up':
        Azimuth.collections.PageBlocks.find({
          page: page._id,
          zone: zone
        }, { sort: { added: 1 }}).forEach(function (pageBlock) {
          Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { seq: maxSeq } });
          maxSeq--;
        });
        break;
      case 'sort-date-down':
        Azimuth.collections.PageBlocks.find({
          page: page._id,
          zone: zone
        }, { sort: { added: -1 }}).forEach(function (pageBlock) {
          Azimuth.collections.PageBlocks.update(pageBlock._id, { $set: { seq: maxSeq } });
          maxSeq--;
        });
        break;
    }
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
Template.block_zone_edit.selectIfLimitEquals = function () {
  var page = Azimuth.utils.getCurrentPage();
  var zone = Azimuth.adminPanel.blockEdit.settings.zone;
  var limit = page['zone_' + zone + '_limit'];
  if (limit == this.valueOf()) return 'selected';
};
