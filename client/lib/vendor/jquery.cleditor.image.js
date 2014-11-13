(function ($) {
  // Define the hello button
  $.cleditor.buttons.image = {
    name: 'image',
    image: '../packages/mcrider_azimuth-core/img/image.gif',
    title: 'Insert Image',
    command: 'inserthtml',
    // popupName: 'image',
    // popupClass: 'cleditorPrompt',
    // popupContent: '<div id="image_asset_list">No files uploaded.</div>',
    buttonClick: insertImage
  };
  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace('source', 'source image');
  // Handle the hello button click event
  function insertImage(e, data) {
    Azimuth.utils.openModal('#wysiwygImageModal');
    $.cleditor.buttons.image.data = data;
    // Image insertion will be handled by wysiwyg template event helper
  }
}(jQuery));