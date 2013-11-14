### Getting started

Getting Azimuth installed is easy.  Get a copy of [node.js](http://nodejs.org/) and npm (node package manager) installed on your machine and run the following commands (some of which you may have already done).

1.  Install Meteor.js: `curl https://install.meteor.com | /bin/sh`
2.  Install Meteorite (Meteor's semi-official package manager): `sudo npm install -g meteorite`
3.  Create a project from the command line: `mrt create my-project` (You can delete the generated my-project html, css, and js files)
4.  Its a good idea to disable autopublish: `mrt remove autopublish`
5.  Pick a front-end framework: `mrt add azimuth-views-foundation` or `mrt add azimuth-views-bootstrap`
6.  (optional) Install a theme
7.  Add azimuth Core: mrt add azimuth-core
8.  Start your server: `mrt`

**New to Meteor?**  There is a vibrant and growing community for Meteor developers.  Check out the [canonical Meteor docs](http://docs.meteor.com/#meteor_startup), [Sacha Grief's new book](http://www.discovermeteor.com/), the [Meteor Google group](https://groups.google.com/forum/?fromgroups=#!forum/meteor-talk), and of course [Stack Overflow](http://stackoverflow.com/questions/tagged/meteor) for more help working with Meteor.

### Pages

Azimuth comes with an assortment of page layouts, but you might find you need to do something creative.&nbsp; Here's how to build it.

#### Page files

*   `[page_name].css` Any styles specific to the page.  Note that this CSS is compiled into the main CSS file and will affect elements outside of the page.  A good practice is to scope this CSS within a high-level selector (e.g. a class) in your template.
*   `[page_name].html` Describes the layout of the page.
*   `[page_name].js` Registers the page to make it available to the system.  It is important to edit this when creating a new page.  You may also add event handlers and other javascript you want executed on this page (see the [meteor.js docs](http://docs.meteor.com/#templates_api) for more information)
*   `[page_name]_edit.html` What you will see when editing the page.  All fields are specified in this file using the form helper methods and block zones.

#### Creating a new page template

The easiest way to create a new page template is to copy an existing one from Github and rename it (including each file's filename and the template name inside the code).  You are then free to edit the page layout in the [page_name].html file and add/remove fields in the [page_name]_edit.html file.  Place your new page template anywhere within your project (usually within its own folder in the client/ directory)

### Blocks

Blocks are how Azimuth adds small bits of content to an existing page layout.  Azimuth comes with some basic content blocks in various dimensions, but you might want to create something with more specific fields or do something more complicated.  Blocks are structured pretty much the same way pages are but must be rendered from within a page.

#### Block files

*   `[block_name].css`Any styles specific to the page.  Note that this CSS is compiled into the main CSS file and will affect elements outside of the page.
*   `[block_name].html`Describes the layout of the block.
*   `[block_name].js`Registers the page to make it available to the system.  It is important to edit this when creating a new page.  You may also add event handlers and other javascript you want executed on this page (see the [meteor.js docs](http://docs.meteor.com/#templates_api) for more information)
*   `[block_name]_edit.html`What you will see when editing the page.  All fields are specified in this file using the form helper method.
*   `[block_name]_edit.js`Accompanying JS for the block edit form.  This is typically empty but you may want to add some code to handle special events for the edit form (e.g. an autocomplete handler).

#### Creating a new block template

The easiest way to create a new block template is to copy an existing one from github and rename it (including each file's filename and the template name inside the code).  Your new block can be added to your project just like how pages are.

### Overriding the default layout

Azimuth uses [Iron Router](https://github.com/EventedMind/iron-router) to render templates and route the user to the correct page.  Iron Router uses a layout template to define the general layout of your pages and how other templates are rendered within it.  In your own project, you can override this layout, allowing you to create a custom header or footer or otherwise display your pages however you like.  To do this, `mrt add iron-router` to your project and direct it to use a custom layout like so:

```
Router.configure({
  layoutTemplate: 'custom_layout'
});
```

Then create the custom_layout template [modeled after the default layout](https://github.com/mcrider/azimuth-core/blob/master/client/views/layout.html).  You can then replace the header and footer yields to point to your custom header and footer templates.

### Form Elements

Azimuth uses handlebars helpers to make creating form elements easier. Though you can always roll your own form inputs (except in the case of WYSIWYG editors), form helpers make it easy to consolidate form code into a centralized location in the clients/views/form/ directory (which you are free to edit)

Form helper calls take this form:
```
{{formHelper value=[contents] type="[type]" label="[label]" fieldName="[contents]" }}
```

*   `value`Variable used to store the field's contents.  This variable is the same as the one used whtpen display the field in the page/block.
*   `type`The type of form element.  Can be one of tag, text, textarea, or wysiwyg (other form elements can in the *_edit.html file or by creating a new form helper).
*   `label`The label to display next to the field when editing it
*   `fieldName`The value of the 'name' attribute on the element (can be the same name as the contents attribute)</section>
<section id="theming">

### Theming

CSS added anywhere to your meteor project will be included in the global CSS file.  Styles can be added in the form of CSS files or .less files (Meteor will automatically parse LESS files once you 'mrt add less' to your project).

### Creating a Views Package

If you'd like to integrate front-end code other than the existing views packages, you can create your own views package fairly easily.

* Create your project the usual way
* Create a packages directory: `mkdir packages && cd packages`
* Clone an existing views package into packages/ (we'll use azimuth-views-foundation as example): `git clone git@github.com:/mcrider/azimuth-views-foundation.git`
* Remove the git repo (`rm .git`) and create new repo if desired
* Search and replace all instances of azimuth-views-foundation with azimuth-views-[whatever]
* Edit html files as desired to use your new markup
* Edit package.js/smart.json in views package (change summary, remove foundation-specific packages, etc.)
* Edit your project’s smart.json to reference your local package (should look at the minimum like this):
```
{
  "packages": {
    azimuth-core": {},
    "azimuth-views-test": {
      "path": "packages/azimuth-views-test"
    }
  }
}
```
* Start up your project: `mrt`

### SEO

Until Meteor comes out with a better implementation, Azimuth uses the [Spiderable](http://docs.meteor.com/#spiderable) package to allow search engines to crawl your site.  Spiderable leverages [Phantom.js](http://phantomjs.org/) to create snapshots of your Azimuth pages which are then provided to the search engine bot upon request.  There may be a performance hit to this method of serving up pages to search engines (which could impact SEO) but this technique is common among JS-heavy web apps and is currently the only option to making your Meteor site crawlable.  As noted in the Meteor docs, if you use this package you must have phantomjs installed on your server and accessible via the $PATH variable (this is automatic if you are deploying your app to Meteor's servers).


### Deploying Azimuth

While its easy enough to get Azimuth running on your local machine, it can be a little confusing to get it running on a public server (other than [Meteor's own public servers](http://docs.meteor.com/#deploying)).  Thankfully, there's been some solid work recently in the Meteor community to help get Meteor projects running on cloud servers such as [Amazon EC2](https://github.com/netmute/meteor.sh) and [Heroku](https://github.com/oortcloud/heroku-buildpack-meteorite).  This web site is hosted on EC2 using the above deploy script and the deployment process is simple and painless.

### Support and contributions

Visit the Azimuth [Github Issues](http://github.com/mcrider/azimuth/issues) page to post bug reports or questions (just label your issues appropriately as question/bug/etc.)  This is also a good place to look for issues to fix if you feel like contributing.
