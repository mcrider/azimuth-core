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