roostagram
===========

Created for Bocoup's Backbone.js Training.

## Overview ##

A demonstration that illustrates developing an event-driven web application
using Backbone.js and friends. The application displays a grid of images that
have been uploaded to the server and provides a tool mechanism to take photos
using the native webcam or from the filesystem.

## Getting started ##

To install and get roostagram running, you will need Node.js:

* [Node.js](http://nodejs.org)

Once this is installed, clone or download the repository and change directory
into it. From there, run `npm install` and then the `grunt` command to get the
server running.

Navigate to: [http://localhost:8000](http://localhost:8000)

## Architecture ##

Bocoup is all about open web technology and you should be, too! There is no
reason why you can't be leveraging existing libraries that are open source to
complete tasks in your web applications.

### Development stack ###

This application heavily borrows from the knowledge of great Internet minds to
expedite the development process. Backbone.js is not an end-to-end solution
for building any sized web application, therefore other libraries will be
required.

Below lists out all the libraries we've used in making this application:

#### bower_components/ ####

Bower is used as a front-end package manager. With one exception, the components
loaded here are dependencies for the running app and are intended for
redistribution with the application.

[Backbone](http://backbonejs.org/), [jQuery](http://jquery.com/),
[Lodash](http://lodash.com/)

Our base application framework. Backbone gives us a very basic MVC structure. It
has dependencies on jQuery and Underscore/Lodash, but these are useful in their
own rights. jQuery acts as a facade to the DOM API, which is inconsistent across
even modern browsers. Underscore/Lodash gives us useful array and object
utilities as well as a light templating engine.

[Lodash Template Loader](https://github.com/tbranyen/lodash-template-loader)

It is more efficient in production to pre-compile our templates than to compile
them at runtime in the browser. This RequireJS plugin will compile the templates
on the fly in dev mode, but will pre-compile them as part of the build process.

[RequireJS](http://requirejs.org/), [Almond](https://github.com/jrburke/almond)

RequireJS is a dynamic module loader for JavaScript. It includes a build utility
(r.js) that optimizes the modules for production (into a single file for our
purposes). Even after the optimization step, we would need RequireJS in
production. Almond serves as a smaller replacement for RequireJS that we can
ship as part of our optimized file.

[Twitter Bootstrap](https://github.com/twitter/bootstrap)

Used to quickly style the application. Even though Twitter Bootstrap is
overkill for this project and between the base and responsive CSS account for a
large portion of the file size, this is a popular project and its useful to see
how to integrate it properly.

[vintageJS](https://github.com/rendro/vintageJS)

Used to create the **fun** "instagram"-like photo effect. Due to API changes,
we're sticking with version 1.0.0.

#### node_modules/ ####

[Express](http://expressjs.com/),
[SQLite](http://github.com/mapbox/node-sqlite3)

As part of this demo, we're simulating a RESTful service using a Node server.
ExpressJS is the server software, and a SQLite database holds our data. For the
purposes of Roostagram, the implementation is not important. However, if you
want to use this as a model for stubbing out RESTful interfaces for your own
projects, feel free.

[Grunt](http://gruntjs.com/), et al.

Grunt is a JavaScript task runner like Make, Rake, etc. The `grunt-*`
directories in node_modules are premade Grunt tasks we use in the development
and build of our application.

[Mocha](http://visionmedia.github.io/mocha/), [Chai](http://chaijs.com/),
[Sinon](http://sinonjs.org/), [Sinon-Chai](http://chaijs.com/plugins/sinon-chai)

Mocha is a JavaScript testing library. Chai adds assertions, and Sinon allows us
to stub/spy/mock. This will be explained.

### Presentation ###

Textures via [SubtlePatterns](http://subtlepatterns.com/)

## Components ##

The application is constructed through three very different types of components.
`Photo` and `Tools` contain Backbone.js specific constructors that are used for
Models, Collections, and Views. The third module: `Vintage` is used to process
the image with a *vintage* look.

## Layouts ##

There are two layouts in the application. The first displays a main content
area with a left sidebar used for the controls. The second is similar to the
first, but does not have a side bar.

These layouts exist in the `app/templates/layouts` directory and are referenced
throughout the routes.

### Photo ###

The `Photo` module is used specifically to handle anything related to single
or multiple photos.

#### Models ####

The only model present in this module is `Photo.Model`, which is empty except
for a reference to the API URL.

#### Collections ####

The `Photo.Collection` collection is set up to use a RESTful interface to
retrieve and save data. It is initialized in the main Router which then
updates the collection throughout the routes. This collection powers the
`galleryview` view and is used whenever a new photo is added.

#### Views ####

`galleryview` is a view that displays the collection of photos. Whenever the
collection is updated, this View automatically updates.

`takeview` is the most complicated view. It creates a `<video/>` and
`<canvas/>` tag to monitor the webcam and snap a photo when the **take photo**
button is pressed. The `dataURL` is processed by vintageJS and then saved into
the collection.

`uploadview` is less complex than `takeview`. It allows a user
to upload a photo file from their harddrive and apply the same vintageJS effect
to it.

`detailview` displays a single photo.

### Tools ###

The `Tools` module is used to display the controls views on the right hand
side of the application.

#### Views ####

`standardview` displays the standard toolbar which contains buttons for
using the webcam or uploading from the hard drive.

`captureview` not only displays a different template for the webcam to
snap a photo, but triggers a global `photo:capture` event when the **take
photo** button is clicked.

### Services ###

Services are things that work on data, but are not part of the MVC architecture.
If we want to transform data (such as our images), we call a service that takes
in the data and returns the transformed version.

#### APIServer ####

This is really a service that puts together our urls for use when calling our
RESTful API. This could also be placed under core, but is here in case we need
to handle a bit more complex logic, like API versioning, or programmatically
generating the URLs.

#### gum-compat ####

A facade over browser implementations (or lack therof) of
navigator.getUserMedia.

#### Vintage ####

Takes in a `dataURL` and processes it with the vintageJS plugin that only works
on images. Once the image is done processing, it triggers the callback with
the processed image data.

This does not use any Backbone specific code and is set up this way to show how
you can use modules for just about anything to help code re-use.

## Routes ##

The application is designed to work seamlessly between hash and pushState urls.

There are four routes to correspond to the "pages". These routes are:

* **"index"** - This route puts the standard toolbar and the photo gallery into
  the base layout and fetches the photo's collection.

* **"take"** - Displays the capture toolbar and the photo take view into the
  base layout.

* **"upload"** - Uses the single layout instead of base and displays the photo
  upload view inside it.

* **"photo"** - Also uses the single layout and displays the specific photo
  based off the parameter using the photo detail view.
