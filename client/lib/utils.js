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

// Return a formatted time from a timestamp
utils.displayHumanReadableTime = function(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  if(hour < 10) hour = "0" + hour;
  var min = a.getMinutes();
  if(min < 10) min = "0" + min;
  var sec = a.getSeconds();
  if(sec < 10) sec = "0" + sec;
  var time = date+'/'+month+'/'+year.toString().slice(2)+' @ '+hour+':'+min+':'+sec ;
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

// Get the standard pnotify settings
utils.pnotify_stack_bottomright = {
  addpos2: 300,
  animation: true,
  dir1: "up",
  dir2: "left",
  firstpos1: 25,
  firstpos2: 25,
  nextpos1: 113,
  nextpos2: 25
}

// Open a modal (should be implemented by view modules)
utils.openModal = utils.openModal || function() {
  console.log('openModal should be implemented in a view module');
}

// Close a modal (should be implemented by view modules)
utils.closeModal = utils.closeModal || function() {
  console.log('closeModal should be implemented in a view module');
}
