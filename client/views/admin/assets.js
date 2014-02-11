Template.assets.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
    Azimuth.collections.Assets.storeFiles(files);
  },
  'click .delete-file': function (e) {
    Azimuth.collections.Assets.remove(this._id);
  }
});
Template.assets.files = function () {
  //show all files that have been published to the client, with most recently uploaded first
  return Azimuth.collections.Assets.find();
};