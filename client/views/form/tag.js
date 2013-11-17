Template.tag.rendered = function() {
  $("#tag").selectize({
    delimiter: ',',
    persist: false,
    maxItems: null,
    create: true,
    options: utils.getDistinctBlockTags(),
    searchField: 'tag',
    valueField: 'tag',
    labelField: 'tag'
  });
}

Template.tag.implodeTags = function() {
  if(this.value) return this.value.join()
  else return '';
}