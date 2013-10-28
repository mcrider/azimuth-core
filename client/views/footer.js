Template.footer.footerNav = function () {
  var nav = Azimuth.collections.Navigation.findOne({location: "footer_active"});
  if (nav) return nav.pages;
  return false;
};
