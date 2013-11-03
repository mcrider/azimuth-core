/* init.js
 *
 * Startup code for the front-end.  Defines the collections and subscriptions that Azimuth interacts with.
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

pagesSubscription = Meteor.subscribe('pages');
blocksSubscription = Meteor.subscribe('blocks');
pageBlocksSubscription = Meteor.subscribe('pageBlocks');
rolesSubscription = Meteor.subscribe('roles');
settingsSubscription = Meteor.subscribe('settings');
navigationSubscription = Meteor.subscribe('navigation');
assetsSubscription = Meteor.subscribe('assets');

if(Roles.userIsInRole(Meteor.user(), ['admin'])) allUsersSubscription = Meteor.subscribe('users');

Meteor.call('usersExist', function(err, data) {
  Session.set('usersExist', data)
});