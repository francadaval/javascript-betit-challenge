# The Javascript Betit Challenge Solution by Fran Cadaval

## Client Side Address Book
Build a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) address book using JavaScript, HTML and CSS.

### Functionality
1. There should be one view where all contacts are listed.
1. There should be another view to add, delete and edit contacts.
1. The data should be persisted (on the client), and loaded again when the application starts.
1. Add fitting validation to the different input fields.

### Form Fields
* First name (input, required)
* Last name (input, required)
* Email (input[type=text], required, valid email)
* Country (dropdown, required) - use the [country-list](https://www.npmjs.com/package/country-list) module to populate the list

### Other Requirements
* Even though this is a small project, structure and architecture should mimic a large project.
* The code should obviusly follow best practises (DRY, maintainable, tesable, etc.).
* Feel free to depend on any frameworks/libraries you think is suitable using NPM/Bower.
* We want the code you submit to be written by you, so don’t use skelletons/generators.
* Make sure the application work on Node 5.x, NPM 3.x and in latest Chrome and Firefox.

When you are done, send us a link to your repository on Github/Bitbucket (preferred) or email us your project as a zip. If you send it as a zip, please don’t include your NPM/Bower dependencies.

Note, this is where you get to shine — *show us what you’ve got!*

## Installation
### Sass
Install Sass following the [instructions for command line](http://sass-lang.com/install).

### Grunt-CLI
Install grunt-cli globally as described in ['Getting Started'](http://gruntjs.com/getting-started) page.
```
$ npm install -g grunt-cli
```

### Bower
As described in (https://bower.io/#install-bower), install Bower globally.
```
$ npm install -g bower
```

### NPM dependencies
Install Node.js dependencies with npm:
```
$ npm install
```

### Bower dependencies
Install scripts dependencies declared with Bower:
```
$ bower install
```

## Build and run project
### Build with Grunt
Grunt is used to build the project. It copies requiered external script, uglify project script, parse sass files, etc.
The project can be built in release or debug mode respectively with :
```
$ grunt release
```
```
$ grunt debug
```

### Run Express web server
The web application is started runing de index.js script and accesible in http://localhost:8080.
```
$ node index.js
```

I hope the work is to your liking.
