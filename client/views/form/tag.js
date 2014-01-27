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