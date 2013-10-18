// Utility methods common to many scripts

window.utils = window.utils || {};

// Get the page object corresponding to the current page slug
utils.getCurrentPage = function() {
  var page_slug = Session.get('page-slug');
  if (!page_slug)
    return {notFound: true, title: 'Sorry, we couldn\'t find the requested page'};
  return Pages.findOne({slug: page_slug});
}

// Get an array of form values for a form
utils.getFormValues = function(selector) {
  var values = {};

  // Turn form into array and handle special cases
  $.each($(selector).serializeArray(), function(i, field) {
    // if (field.name == 'tags') field.value = field.value.split(',');
  	if (field.value == 'on') field.value = true;
    values[field.name] = field.value;
  });
  $.each($(selector).find(':checkbox:not(:checked)'), function(i, field) {
  	values[field.name] = false;
  });
  return values;
}

utils.displayHumanReadableTime = function(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  if(hour < 10) hour = "0" + hour;
  var min = a.getMinutes();
  if(min < 10) min = "0" + min;
  var sec = a.getSeconds();
  if(sec < 10) sec = "0" + sec;
  var time = month+'/'+date+'/'+year.toString().slice(2)+' @ '+hour+':'+min+':'+sec ;
  return time;
}

utils.displayHumanReadableDate = function(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var time = month+'/'+date+'/'+year.toString().slice(2);
  return time;
}

// Get a template fragment
utils.loadTemplate = function(template) {
  return Meteor.render(function () {
    return Template[ template ](); // this calls the template and returns the HTML.
  });
}

// Get a setting value
utils.getSetting = function(settingName) {
  var settings = Settings.findOne();
  if (!settings || !settingName) return '';
  return Settings.findOne()[settingName];
}

// Get a block fragment filled with block data
utils.getBlockFragment = function(block) {
  if (block && block.template) {
    Template[block.template].block = block;
    var fragment = Template[block.template](); // this calls the template and returns the HTML.
  } else {
    console.log('Block not found (or has no template specified)' );
    return false;
  }

  return fragment;
}

// Set the default Noty settings
$.noty.defaults = {
    layout: 'bottomRight',
    theme: 'defaultTheme',
    type: 'alert',
    text: '',
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: 2000, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 5, // you can set max visible notification for dismissQueue true option
    closeWith: ['click'], // ['click', 'button', 'hover']
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {}
    },
    buttons: false // an array of buttons
};

// Open a modal (should be implemented by view modules)
utils.openModal = utils.openModal || function() {
  console.log('openModal should be implemented in a view module');
}

// Close a modal (should be implemented by view modules)
utils.closeModal = utils.closeModal || function() {
  console.log('closeModal should be implemented in a view module');
}
