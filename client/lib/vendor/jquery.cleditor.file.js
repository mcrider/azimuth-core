(function ($) {
  // Define the hello button
  $.cleditor.buttons.file = {
    name: 'file',
    image: '../packages/azimuth-core/img/file.gif',
    title: 'Insert File',
    command: 'inserthtml',
    popupName: 'file',
    popupClass: 'cleditorPrompt',
    popupContent: '<div id="file_asset_list">No files uploaded.</div>',
    buttonClick: insertFile
  };
  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace('source', 'source file');
  // Handle the hello button click event
  function insertFile(e, data) {
    $('#file_asset_list').html(Template.file_list());
    $(data.popup).css('margin-left', '-348px');
    // Wire up the submit button click event
    $(data.popup).find('.file-row').click(function (e) {
      e.preventDefault();
      var editor = data.editor;
      editor.execCommand(data.command, '<a href="' + $(this).data('link') + '">' + $(this).data('name') + '</a>', null, data.button);
      editor.hidePopups();
      editor.focus();
    });
  }
}(jQuery));