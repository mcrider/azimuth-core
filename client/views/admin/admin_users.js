Template.admin_users.users = function () {
  return Meteor.users.find();
};
Template.admin_users.events = {
  'click .admin': function () {
    if (!this._id)
      return false;
    if (Meteor.userId() == this._id)
      return false;
    // Can't un-admin yourself
    if (_.contains(this.roles, 'admin'))
      Roles.removeUsersFromRoles([this._id], ['admin']);
    else
      Roles.addUsersToRoles([this._id], ['admin']);
  },
  'click .author': function () {
    if (!this._id)
      return false;
    if (_.contains(this.roles, 'author'))
      Roles.removeUsersFromRoles([this._id], ['author']);
    else
      Roles.addUsersToRoles([this._id], ['author']);
  },
  'click .delete-user': function (e) {
    e.preventDefault();
    Session.set('delete-user-id', this._id);
    utils.openModal('#deleteUserModal');
  },
  'click .delete-user-confirm': function (e) {
    e.preventDefault();
    utils.closeModal('#deleteUserModal');
    var userId = Session.get('delete-user-id');
    if (!userId)
      return false;
    if (Meteor.userId() == userId)
      return false;
    // Can't delete yourself
    Roles.removeUsersFromRoles([userId], ['admin']);
    Roles.removeUsersFromRoles([userId], ['author']);
    Meteor.users.remove(userId);
  },
  'click .create-user': function (e) {
    e.preventDefault();
    utils.openModal('#createUserModal');
  },
  'click .create-user-confirm': function (e) {
    e.preventDefault();
    var t = $('.create-user-form');
    var email = t.find('input[type="email"]').val();
    var password = t.find('input[type="password"]').val();
    var trimInput = function (val) {
      return val.replace(/^\s*|\s*$/g, '');
    };
    var passwordErrors = function (password) {
        var errMsg = [];
        var msg = false;
        if (password.length < 4) {
          errMsg.push('4 character minimum password.');
        }
        if (errMsg.length > 0) {
          msg = '';
          errMsg.forEach(function (e) {
            return msg = msg.concat('' + e + '\r\n');
          });
          Session.set('error', msg);
          return true;
        }
        return false;
      }(password);
    if (passwordErrors) {
      return;
    }
    email = trimInput(email);
    if (email.length === 0) {
      Session.set('error', 'Email is required');
      return;
    }
    // Everything okay so far, lets create the account
    return Meteor.call('accountsCreateUser', email, email, password, function (err, data) {
      if (err) {
        Session.set('error', err.reason);
        return;
      }
      noty({
        text: 'New account created!',
        type: 'success'
      });
      utils.closeModal('#createUserModal');
    });
  }
};