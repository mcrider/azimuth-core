# [Azimuth](http://github.com/mcrider/azimuth)

Azimuth is a simple, elegant, and fast CMS built using meteor.js.

This is the core library for Azimuth, and is usually used by adding to your project with meteorite.  Visit [http://azimuthc.ms](http://azimuthc.ms) for instructions on how to get started.

***Note: Azimuth is currently in early alpha; I'm still working out code design and many features are not yet implemented.***

To administer Azimuth, create a user account -- the first user account will be the admin user.  From there you can edit your site from the admin menu in the top right corner of the page.

For further documentation and a demo of Azimuth in action, visit [http://azimuthc.ms](http://azimuthc.ms).

### File structure

The [Azimuth core library](http://github.com/mcrider/azimuth-core) is laid out as follows:

*   `/client/` JS/HTML/CSS that is available to the browser.  The bulk of the code lives here.
*   `/client/blocks/` Default block templates, and their accompanying JS/CSS files are stored here.  Block are stored in a modular fashion where everything needed to display a type of block them is stored in its own directory.
*   `/client/css/` Core CSS (in [LESS](http://lesscss.org/) format) as well as any third-party CSS files.
*   `/client/lib/` Core JS files as well as third-party JS.
*   `/client/views` Core templates and their accompanying JS files.
*   `/client/pages/` Default Page templates, and their accompanying JS/CSS files are stored here.  Pages are stored in a modular fashion where everything needed to display a page template is stored in its own directory.
*   `/server` JS that is run only on the server and not sent to the client.

### Shoutouts

Thanks to [BeDifferential](https://github.com/BeDifferential/accounts-entry/) for creating the basis of the account templates.
