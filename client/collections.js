//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/collections.js
//
// Initialize Azimuth's collections and serve them to the client.
//

window.Azimuth = window.Azimuth || {};
Azimuth.collections = {
  Pages: new Meteor.Collection('pages'),
  Blocks: new Meteor.Collection('blocks'),
  PageBlocks: new Meteor.Collection('pageBlocks'),
  Settings: new Meteor.Collection('settings'),
  Navigation: new Meteor.Collection('navigation'),
  UserData: new Meteor.Collection('userData'),
  Assets: new CollectionFS('assets')
};
// Set a session variable to tell the client if users exist.
//  If it is true, we will hide the registration link (unless
//  registration is open to the public).
Meteor.call('usersExist', function (err, data) {
  Session.set('usersExist', data);
});