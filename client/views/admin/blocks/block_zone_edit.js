Template.block_zone_edit.blockCount = function () {
  return _.range(1, 51);
};
Template.block_zone_edit.limit = function () {
  var zone = adminPanel.blockEdit.zone;
  var page = Azimuth.utils.getCurrentPage();
  var limit = page['zone_' + zone + '_limit'];
  return limit && limit > 0 ? page['zone_' + zone + '_limit'] : false;
};
Template.block_zone_edit.limitEquals = function (value) {
  var page = Azimuth.utils.getCurrentPage();
  var limit = page['zone_' + zone + '_limit'];
  return limit == value;
};
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