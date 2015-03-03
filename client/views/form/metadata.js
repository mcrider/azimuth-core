//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/form/metadata.js
//
// Helpers and event handlers for the page metadata form.
//

Template.metadata.rendered = function () {
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.metadata.events ({
  'click .add-meta-tag': function (e) {
    e.preventDefault();
    var meta_key = $(e.currentTarget).closest('tr').find('.meta-key').val();
    var meta_value = $(e.currentTarget).closest('tr').find('.meta-value').val();
    var page = Azimuth.utils.getCurrentPage();
    var currentMetadata = Azimuth.collections.Pages.findOne(page._id, { reactive: false }).meta;
    if (!meta_key || !meta_value || _.findWhere(currentMetadata, { key: meta_key })) {
      noty({
        text: 'Error: Could not add metadata field.',
        type: 'error'
      });
      return false;
    }
    Azimuth.collections.Pages.update({ _id: page._id }, {
      $push: {
        'meta': {
          key: meta_key,
          value: meta_value
        }
      }
    });
  },
  'click .remove-meta-tag': function (e) {
    e.preventDefault();
    var meta_key = $(e.currentTarget).closest('tr').find('.meta-key-existing').text();
    var page = Azimuth.utils.getCurrentPage();
    Azimuth.collections.Pages.update({ _id: page._id }, { $pull: { 'meta': { key: meta_key } } });
  }
});
Template.metadata.helpers({
    current_fields: function () {
        var page = Azimuth.utils.getCurrentPage();
        return Azimuth.collections.Pages.findOne(page._id).meta;
    },
    metadata_field_list: function () {
    return Azimuth.metadata_fields;
    }
})
