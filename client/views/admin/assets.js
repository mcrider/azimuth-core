Template.assets.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
    Assets.storeFiles(files);
  },
  'click .delete-file': function(e) {
    Assets.remove(this._id);
  }
});

Template.assets.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  return Assets.find();
};

Template.image_list.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  return Assets.find({ contentType: { $in: [ "image/gif", "image/jpeg", "image/png", "image/tiff" ] } });
};

Template.file_list.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  return Assets.find();
};
