window.Azimuth = window.Azimuth || {};
Azimuth.metadata_fields = [
  {
    meta_name: 'Title',
    meta_key: 'title',
    template: '<title class=\'azimuth-tag\'>%s</title>'
  },
  {
    meta_name: 'Description',
    meta_key: 'description',
    template: '<meta class=\'azimuth-tag\' name=\'description\' content=\'%s\' />'
  },
  {
    meta_name: 'Keywords',
    meta_key: 'keywords',
    template: '<meta class=\'azimuth-tag\' name=\'keywords\' content=\'%s\' />'
  },
  {
    meta_name: 'Noindex',
    meta_key: 'noindex',
    template: '<meta class=\'azimuth-tag\' name=\'%s\' content=\'noindex\' />'
  },
  {
    meta_name: 'Robots',
    meta_key: 'robots',
    template: '<meta class=\'azimuth-tag\' name=\'robots\' content=\'%s\' />'
  },
  {
    meta_name: 'GoogleBot',
    meta_key: 'googlebot',
    template: '<meta class=\'azimuth-tag\' name=\'googlebot\' content=\'%s\' />'
  },
  {
    meta_name: 'Google Site Verification',
    meta_key: 'google_site_verification',
    template: '<meta class=\'azimuth-tag\' name=\'google_site_verification\' content=\'%s\' />'
  },
  {
    meta_name: 'Canonical,',
    meta_key: 'canonical',
    template: '<link class=\'azimuth-tag\' rel=\'canonical\' href=\'%s\' />'
  },
  {
    meta_name: 'Author',
    meta_key: 'author',
    template: '<link class=\'azimuth-tag\' rel=\'author\' href=\'%s\' />'
  },
  {
    meta_name: 'Publisher',
    meta_key: 'publisher',
    template: '<link class=\'azimuth-tag\' rel=\'publisher\' href=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Title',
    meta_key: 'og:title',
    template: '<meta class=\'azimuth-tag\' property=\'og:title\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Type',
    meta_key: 'og:type',
    template: '<meta class=\'azimuth-tag\' property=\'og:type\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Image',
    meta_key: 'og:image',
    template: '<meta class=\'azimuth-tag\' property=\'og:image\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: URL',
    meta_key: 'og:url',
    template: '<meta class=\'azimuth-tag\' property=\'og:url\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Description',
    meta_key: 'og:description',
    template: '<meta class=\'azimuth-tag\' property=\'og:description\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Facebook Admin ID',
    meta_key: 'fb:admins',
    template: '<meta class=\'azimuth-tag\' property=\'fb:admins\' content=\'%s\' />'
  },
  {
    meta_name: 'OpenGraph: Facebook App ID',
    meta_key: 'fb:app_id',
    template: '<meta class=\'azimuth-tag\' property=\'fb:app_id\' content=\'%s\' />'
  },
  {
    meta_name: 'Twitter: Card',
    meta_key: 'twitter:card',
    template: '<meta class=\'azimuth-tag\' name=\'twitter:card\' content=\'%s\' />'
  },
  {
    meta_name: 'Twitter: URL',
    meta_key: 'twitter:url',
    template: '<meta class=\'azimuth-tag\' name=\'twitter:url\' content=\'%s\' />'
  },
  {
    meta_name: 'Twitter: Title',
    meta_key: 'twitter:title',
    template: '<meta class=\'azimuth-tag\' name=\'twittertitle content=\'%s\' />'
  },
  {
    meta_name: 'Twitter: Description',
    meta_key: 'twitter:description',
    template: '<meta class=\'azimuth-tag\' name=\'twitter:description\' content=\'%s\' />'
  },
  {
    meta_name: 'Twitter: Image',
    meta_key: 'twitter:image',
    template: '<meta class=\'azimuth-tag\' name=\'twitter:image\' content=\'%s\' />'
  }
];