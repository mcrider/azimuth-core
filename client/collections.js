/* init.js
 *
 * Startup code for the front-end.  Defines the collections that Azimuth interacts with.
 *
 */

window.Azimuth = window.Azimuth || {};

Azimuth.collections = {
  Pages: new Meteor.Collection("pages"),
  Blocks: new Meteor.Collection("blocks"),
  PageBlocks: new Meteor.Collection("pageBlocks"),
  Settings: new Meteor.Collection("settings"),
  Navigation: new Meteor.Collection("navigation"),
  Assets: new CollectionFS('assets')
}

// Set a session variable to tell the client if users exist.
//  If it is true, we will hide the registration link (unless
//  registration is open to the public).
Meteor.call('usersExist', function(err, data) {
  Session.set('usersExist', data)
});
