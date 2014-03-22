
### Logging in

Azimuth has a basic registration system accessible by clicking on the user icon in the top right of the site.  The first user created on the site will automatically be registered as the site administrator; That user then has the ability to set the roles that subsequent users have.

### Administration

Once logged in, you will be able to manage your site via the left-hand sidebar.  Here's a summary of each section of the navigation:

*   **Page Settings**: Edit page metadata and change the page template.
*   **New Page**: Create a new page.
*   **Navigation**: Set header and footer navigation menus with a drag-and-drop interface.
*   **Assets**: Upload and manage site assets (images and other files).
*   **Site Settings**: General site-wide settings.
*   **Users**: Administer user accounts.

### User administration

The user administration page shows a basic listing of all users registered on your site.  This page allows you to delete users (by clicking the 'x' icon to the right of each user entry) and set the roles of each user by clicking on the admin and author icons to the left of each entry.

### Pages

There are a variety of page templates included with Azimuth and creating new ones is a straightforward process.  Pages are packaged as self-contained modules containing all the requisite Javascript, CSS, and markup required to render the page.  This modular nature allows you to extend each page to contain a mini-application that can exploit any feature Meteor.js has to offer (and offload all the boring content management to Azimuth).  The content for each page is managed by blocks, which are grouped into block zones by the page template.

#### Creating A Page

New pages are added to your site by click on the 'New Page' menu item from the administration menu.  A panel will appear which allows you to set the page title and the slug that will be used to access the page.  This slug will automatically be generated based on the page title, but feel free to edit it to whatever you like.

#### Adding Pages to Navigation

Pages can be added to your header and footer navigation by going to the Site Navigation menu item from the admin menu.  This page provides a drag-and-drop interface for ordering how your pages are displayed in each menu and optionally for the header menu, the hierarchy in which they appear.  Pages that you want hidden from each menu can be dragged to the right side.

### Blocks

Blocks are structurally similar to pages in that they are self-contained modules, the only difference being that they require a page to be displayed in.  How a block appears depends entirely on a block's template, but typically blocks contain small bits of content that are grouped together in meaningful ways.

#### Creating A Block

You can add a new block to your page by going to a block zone element on a page and clicking the '+' in the block zone's header.  You can also click on the '...' icon over an existing block to add a block after.  From the block add panel you have the option of adding an existing block, group of blocks by type/tag, or creating a new block.  When creating a new block, a dialog will appear that lets you specify the values for the block's fields.

#### Managing Blocks

Clicking on the '...' button over a block will bring up a panel to manage it.  Click on one of the icons to perform these tasks:

*   **Left/Right Arrows**: Change the block's position.
*   **Edit**: Edit the block's contents.
*   **Plus**: Add a new block after the currently selected block.
*   **Down**: Successive blocks will be placed on a new row.

#### Block zone settings

From the block zone's settings menu, you can limit the number of blocks that will appear before a pagination list appears.  When set to off, all blocks in the blockzone will appear on the client; Otherwise, the selected number will be used to limit the amount of blocks that will appear per 'page'.  You can also sort blocks (reverse order or by date) from this panel.

### Asset Library

Azimuth includes an asset library (accessible from the Admin menu) allowing you to upload files and images to access through your site.  This interface is also accessible through the wysiwyg editor via the file and image upload buttons.

### Users

You can edit and administer users from the user admin panel.  The user list also lets you set the role (admin or author) for each user.