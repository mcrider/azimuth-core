//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/views/form/wysiwyg.js
//
// Helpers and event handlers for wysiwyg editor (CLEditor).
//

Template.wysiwyg.rendered = function () {
  if (this.data.uniqueId) {
    var uniqueId = this.data.uniqueId;
    $('#' + uniqueId).cleditor();
  } else {
    console.log('uniqueId must be supplied to all wysiwyg fields.');
  }
};
Template.wysiwyg.events = {
  'click .insert-image': function(e) {
    e.preventDefault();
    var data = $.cleditor.buttons.image.data;
    var editor = data.editor;
    editor.execCommand(data.command, '<img src="' + this.url({store: 'default'}) + '" />', null, data.button);
    Azimuth.utils.closeModal('#wysiwygImageModal');
    editor.hidePopups();
    editor.focus();
  },
  'click .insert-file': function(e) {
    e.preventDefault();
    var data = $.cleditor.buttons.file.data;
    var editor = data.editor;
    editor.execCommand(data.command, '<a href="' + this.url({store: 'default'}) + '">' + this.name + '</a>', null, data.button);
    Azimuth.utils.closeModal('#wysiwygFileModal');
    editor.hidePopups();
    editor.focus();
  }
}
Template.wysiwyg.imageList = function () {
  //show all files that have been published to the client, with most recently uploaded first
  return Azimuth.collections.Assets.find({
    type: {
      $in: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/tiff'
      ]
    }
  });
};
Template.wysiwyg.fileList = function () {
  //show all files that have been published to the client, with most recently uploaded first
  return Azimuth.collections.Assets.find();
};
Template.assets.formattedTime = function() {
  return this.uploadedAt ? this.uploadedAt.toLocaleString() : '';
}
Template.assets.formattedSize = function() {
  function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)),10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
  return bytesToSize(this.size);
}