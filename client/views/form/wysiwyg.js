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
    editor.execCommand(data.command, '<img src="' + this.fileHandler.default.url + '" />', null, data.button);
    Azimuth.utils.closeModal('#wysiwygImageModal');
    editor.hidePopups();
    editor.focus();
  },
  'click .insert-file': function(e) {
    e.preventDefault();
    var data = $.cleditor.buttons.file.data;
    var editor = data.editor;
    editor.execCommand(data.command, '<a href="' + this.fileHandler.default.url + '">' + this.filename + '</a>', null, data.button);
    Azimuth.utils.closeModal('#wysiwygFileModal');
    editor.hidePopups();
    editor.focus();
  }
}
Template.wysiwyg.imageList = function () {
  //show all files that have been published to the client, with most recently uploaded first
  return Azimuth.collections.Assets.find({
    contentType: {
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