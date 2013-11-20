Template.metadata.events = {
  'click .add-meta-tag': function (e) {
    e.preventDefault();

    var meta_key = $(e.currentTarget).closest('.meta-row').find('.meta-key').val();
    var meta_value = $(e.currentTarget).closest('.meta-row').find('.meta-value').val();

    var page = utils.getCurrentPage();
    var currentMetadata = Azimuth.collections.Pages.findOne(page._id, {reactive: false}).metadata;
    if(!meta_key || !meta_value || _.findWhere(currentMetadata, {key: meta_key})) {
      noty({text: 'Error: Could not add metadata field.', type: 'error'});
      return false;
    }
    Azimuth.collections.Pages.update({_id: page._id}, {$push : {  "metadata" : { key: meta_key, value: meta_value }}});
  },
  'click .remove-meta-tag': function (e) {
    e.preventDefault();

    var meta_key = $(e.currentTarget).closest('tr').find('.meta-key-existing').text()
    var page = utils.getCurrentPage();
    Azimuth.collections.Pages.update({ _id: page._id }, {$pull : {  "metadata" : { key: meta_key }}});
  }
};

Template.metadata.getMetadataFields = function() {
  return Azimuth.metadata_fields;
}