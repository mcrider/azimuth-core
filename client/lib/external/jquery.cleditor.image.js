(function($) {

  // Define the hello button
  $.cleditor.buttons.image = {
    name: "image",
    image: "../../../../img/image.gif",
    title: "Insert Image",
    command: "inserthtml",
    popupName: "image",
    popupClass: "cleditorPrompt",
    popupContent: "Insert image using...<br><input type='button' value='filepicker.io' />",
    buttonClick: insertImage
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
    .replace("source", "source image");

  // Handle the hello button click event
  function insertImage(e, data) {
    // Wire up the submit button click event
    $(data.popup).children(":button")
      .unbind("click")
      .bind("click", function(e) {
        filepicker.setKey(Settings.findOne().filepickerKey);
        var editor = data.editor;
        filepicker.pick({
            mimetypes: ['image/*']
          },
          function(FPFile){
            editor.execCommand(data.command, '<img src="'+FPFile.url+'" />', null, data.button);
            console.log(FPFile.url);
          }
        );

        editor.hidePopups();
        editor.focus();
      });

  }

})(jQuery);