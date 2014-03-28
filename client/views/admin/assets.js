//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/assets.js
//
// Helpers and event handlers for managing assets.
//

Template.assets.events({
  'change .fileUploader': function (e) {
    FS.Utility.eachFile(event, function(file) {
      Azimuth.collections.Assets.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  },
  'click .delete-file': function (e) {
    Azimuth.collections.Assets.remove(this._id);
  }
});
Template.assets.files = function () {
  //show all files that have been published to the client, with most recently uploaded first
  return Azimuth.collections.Assets.find();
};
Template.assets.formattedTime = function() {
  return this.uploadedAt.toLocaleString();
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