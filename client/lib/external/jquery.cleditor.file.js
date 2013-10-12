(function($) {

  // Define the hello button
  $.cleditor.buttons.file = {
    name: "file",
    image: "../packages/azimuth-core/img/file.gif",
    title: "Insert File",
    command: "inserthtml",
    popupName: "file",
    popupClass: "cleditorPrompt",
    popupContent: "Insert file using...<br><input type='button' value='filepicker.io' />",
    buttonClick: insertFile
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
    .replace("source", "source file");

  // Handle the hello button click event
  function insertFile(e, data) {
    // Wire up the submit button click event
    $(data.popup).children(":button")
      .unbind("click")
      .bind("click", function(e) {
        filepicker.setKey(Settings.findOne().filepickerKey);
        var editor = data.editor;
        filepicker.pick(
          function(FPFile){
            editor.execCommand(data.command, '<a href="'+FPFile.url+'">'+FPFile.filename+'</a>', null, data.button);
            console.log(FPFile.url);
          }
        );

        editor.hidePopups();
        editor.focus();
      });

  }

})(jQuery);