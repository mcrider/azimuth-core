Template.tag.rendered = function () {
  $('#tag').selectize({
    delimiter: ',',
    persist: false,
    maxItems: null,
    create: true,
    options: utils.getDistinctBlockTags(),
    searchField: 'tag',
    valueField: 'tag',
    labelField: 'tag'
  });
};