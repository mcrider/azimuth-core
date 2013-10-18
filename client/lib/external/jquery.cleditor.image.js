(function($) {

  // Define the hello button
  $.cleditor.buttons.image = {
    name: "image",
    image: "../packages/azimuth-core/img/image.gif",
    title: "Insert Image",
    command: "inserthtml",
    popupName: "image",
    popupClass: "cleditorPrompt",
    popupContent: '<div id="image_asset_list">No files uploaded.</div>',
    buttonClick: insertImage
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
    .replace("source", "source image");

  // Handle the hello button click event
  function insertImage(e, data) {

    $("#image_asset_list").html(Template.image_list());
    $(data.popup).css('margin-left', '-348px');

    // Wire up the submit button click event
    $(data.popup).find(".file-row").click(function(e) {
        e.preventDefault();
        var editor = data.editor;
        editor.execCommand(data.command, '<img src="'+$(this).data('link')+'" />', null, data.button);

        editor.hidePopups();
        editor.focus();
      });

  }

})(jQuery);