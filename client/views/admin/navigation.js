//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/navigation.js
//
// Helpers and event handlers for the site navigation manager.
//

Template.navigation.rendered = function () {
  var updateNav = function (location) {
    return function () {
      var nav = Azimuth.collections.Navigation.find({ location: location });
      // Re-add links from nestable
      var createNavItems = function createNavItems(links, location) {
        var childIds = [];
        // Iterate over links and create nav items
        _.each(links, function(link) {
          var navData = {
            location: location,
            title: link.title,
            url: link.url
          };
          if (link.root)
            navData.root = true;
          // Recurse if there are children present
          if (link.children) {
            navData.children = createNavItems(link.children, location);
          }
          var navItemId = Azimuth.collections.Navigation.insert(navData)
          childIds.push(navItemId);
        });

        return childIds;
      }
      var links = $('#' + location).nestable('serialize');
      // Set root attribute to true for root links
      _.map(links, function(link){ link.root = true; return link });
      // Remove all links and then re-add
      Azimuth.collections.Navigation.find({ location: location}).forEach(function(link) {
        Azimuth.collections.Navigation.remove(link._id);
      });
      createNavItems(links, location);
    };
  };
  $('#header').nestable({
    maxDepth: 4,
    group: 1,
    onChange: updateNav('header')
  });
  $('#footer').nestable({
    maxDepth: 1,
    group: 2,
    onChange: updateNav('footer')
  });
  $('.azimuth-admin-panel').find('select').selectize({ sortField: 'text' });
};
Template.navigation.events = {
  'click .add-link': function (e) {
    e.preventDefault();
    Session.set('link-location', $(e.currentTarget).next('.dd').attr('id'));
    // Clear modal form elements
    $('#addLinkModal').find('.form-control').val('');
    $("#addLinkModal").find('select').each(function() {
      if (this.selectize) {
        this.selectize.clear();
      }
    });
    Azimuth.utils.openModal('#addLinkModal');
  },
  'click .add-link-confirm': function (e) {
    e.preventDefault();
    var linkLocation = Session.get('link-location'),
        existingPage = $('#addLinkModal').find('#existingPage').val(),
        newUrl = $('#addLinkModal').find('.link-url').val(),
        newTitle = $('#addLinkModal').find('.link-title').val();
    if (linkLocation && existingPage) {
      var page = Azimuth.collections.Pages.findOne({ slug: existingPage });
      Azimuth.collections.Navigation.insert({
        location: linkLocation,
        title: page.label,
        url: '/' + page.slug,
        root: true
      });
    } else if (linkLocation && newUrl && newTitle) {
      Azimuth.collections.Navigation.insert({
        location: linkLocation,
        title: newTitle,
        url: newUrl,
        root: true
      });
    } else {
      noty({
        text: 'Please make sure all fields are filled.',
        type: 'error'
      });
      return false;
    }
    Azimuth.utils.closeModal('#addLinkModal');
  },
  'click .edit-link': function (e) {
    e.preventDefault();
    Session.set('linkId', this._id);
    var link = Azimuth.collections.Navigation.findOne(this._id);
    $("#editLinkModal").find('.link-url').val(link.url);
    $("#editLinkModal").find('.link-title').val(link.title);
    Azimuth.utils.openModal('#editLinkModal');
  },
  'click .edit-link-confirm': function (e) {
    e.preventDefault();
    var linkId = Session.get('linkId'),
        newUrl = $("#editLinkModal").find('.link-url').val(),
        newTitle = $("#editLinkModal").find('.link-title').val();
    if (linkId && newUrl && newTitle) {
      Azimuth.collections.Navigation.update(linkId, { $set: { url: newUrl, title: newTitle } });
    } else {
      noty({
        text: 'Please make sure all fields are filled.',
        type: 'error'
      });
      return false;
    }
    Azimuth.utils.closeModal('#editLinkModal');
  },
  'click .delete-link': function (e) {
    e.preventDefault();
    Session.set('linkId', this._id);
    Azimuth.utils.openModal('#deleteLinkModal');
  },
  'click .delete-link-confirm': function (e) {
    e.preventDefault();
    var linkId = Session.get('linkId');
    // Traverse tree and remove from all children
    Azimuth.collections.Navigation.find().forEach(function (nav) {
      Azimuth.collections.Navigation.update({ _id: nav._id }, { $pull: { 'children': linkId } });
    });
    // Remove the item
    Azimuth.collections.Navigation.remove(linkId);
    noty({
      text: 'Link removed.',
      type: 'success'
    });
    Azimuth.utils.closeModal('#deleteLinkModal');
  }
};
Template.navigation.headerNav = function () {
  return Azimuth.collections.Navigation.find({ location: 'header', root: true });
};
Template.navigation.footerNav = function () {
  return Azimuth.collections.Navigation.find({ location: 'footer' });
};
Template.navigation.allPages = function () {
  return Azimuth.collections.Pages.find();
}
Template.navigation_child.child = function() {
  var navId = this.toString();
  return Azimuth.collections.Navigation.findOne(navId);
}