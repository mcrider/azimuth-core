//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/layout.js
//
// Define events and helpers for the main layout template
//


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