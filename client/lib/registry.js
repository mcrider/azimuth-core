// Register pages and blocks

window.registry = {
  pageTemplates: {},
  pageTemplate: function (pageTemplate) {
    var name = pageTemplate.name;
    this.pageTemplates[name] = pageTemplate;
  },

  blockTemplates: {},
  blockTemplate: function (blockTemplate) {
    var name = blockTemplate.name;
    this.blockTemplates[name] = blockTemplate;
  }
};