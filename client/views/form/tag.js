Template.tag.rendered = function () {
  $('#tag').selectize({
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