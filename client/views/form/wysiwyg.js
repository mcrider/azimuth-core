Template.wysiwyg.rendered = function() {
  if (this.data.uniqueId) {
    var uniqueId = this.data.uniqueId;
    Meteor.setTimeout(function() { $('#' + uniqueId + '_html').cleditor(); }, 500);
  } else {
    console.log('uniqueId must be supplied to all wysiwyg fields.')
  }
}
