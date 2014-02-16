//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/form/tag.js
//
// Helpers for tagging blocks.
//

Template.tag.rendered = function () {
  $('.azimuth-admin-panel').find('#tag').selectize({
    delimiter: ',',
    persist: false,
    maxItems: null,
    create: true,
    options: Azimuth.utils.getDistinctBlockTags(),
    searchField: 'tag',
    valueField: 'tag',
    labelField: 'tag'
  });
};