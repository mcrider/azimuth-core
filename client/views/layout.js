
Template.layout.rendered = function(){
    // Render page metadata
    var page = utils.getCurrentPage();
    if(page && page.metadata) {
      $('head').find('.azimuth-tag').remove();
      page.metadata.forEach(function(tag) {
        var metadata = _.findWhere(Azimuth.metadata_fields, {meta_key: tag.key});
        $("head").append(metadata.template.replace('%s', tag.value));
      })
    }
}
