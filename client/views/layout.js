Template.layout.rendered = function () {
  // Render page metadata
  var page = Azimuth.utils.getCurrentPage();
  if (page && page.meta) {
    $('head').find('.azimuth-tag').remove();
    page.meta.forEach(function (tag) {
      var metadata = _.findWhere(Azimuth.metadata_fields, { meta_key: tag.key });
      $('head').append(metadata.template.replace('%s', tag.value));
    });
  }
};