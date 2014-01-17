Template.wysiwyg.rendered = function () {
  if (this.data.uniqueId) {
    var uniqueId = this.data.uniqueId;
    $('#' + uniqueId).cleditor();
  } else {
    console.log('uniqueId must be supplied to all wysiwyg fields.');
  }
};