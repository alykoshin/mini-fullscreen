[![npm version](https://badge.fury.io/js/mini-fullscreen.svg)](http://badge.fury.io/js/mini-fullscreen)
[![Build Status](https://travis-ci.org/alykoshin/mini-fullscreen.svg)](https://travis-ci.org/alykoshin/mini-fullscreen)
[![Coverage Status](https://coveralls.io/repos/alykoshin/mini-fullscreen/badge.svg?branch=master&service=github)](https://coveralls.io/github/alykoshin/mini-fullscreen?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/mini-fullscreen/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/mini-fullscreen)
[![Inch CI](https://inch-ci.org/github/alykoshin/mini-fullscreen.svg?branch=master)](https://inch-ci.org/github/alykoshin/mini-fullscreen)

[![Dependency Status](https://david-dm.org/alykoshin/mini-fullscreen/status.svg)](https://david-dm.org/alykoshin/mini-fullscreen#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/mini-fullscreen/dev-status.svg)](https://david-dm.org/alykoshin/mini-fullscreen#info=devDependencies)


# mini-fullscreen

Mini wrapper for browser Fullscreen API

- https://fullscreen.spec.whatwg.org/
- https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

This package is part of WRTC project.

Not yet ready for public use.

If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/mini-fullscreen/issues).


## Installation

```sh
npm install --save mini-fullscreen
```


## Usage

This package is part of WRTC project.

Not yet ready for public use.

```js
var miniFullScreen = require('mini-fullscreen');


function printStatus(result) {
  console.log('result:', result);
  console.log('miniFullScreen.getEnabled():', miniFullScreen.getEnabled());
  console.log('miniFullScreen.getActive():',  miniFullScreen.getActive());
  console.log('miniFullScreen.getElement():', miniFullScreen.getElement());
}

function init() {
  var htmlElement = document.getElementById('full-element');

  miniFullScreen.on('change', function(event) {
    console.log('miniFullScreen.on(change):', event);
  });

  miniFullScreen.on('error', function(event) {
    console.log('miniFullScreen.on(error):', event);
  });

  document.getElementById('action-start').addEventListener('click', function() {
    var result = miniFullScreen.start(htmlElement);
    printStatus(result);
  });

  document.getElementById('action-stop').addEventListener('click', function() {
    var result = miniFullScreen.stop(htmlElement);
    printStatus(result);
  });

  document.getElementById('action-toggle').addEventListener('click', function() {
    var result = miniFullScreen.toggle(htmlElement);
    printStatus(result);
  });

}
```


It also sets global variable `window.miniFullScreen` (if global `window` object exists) to itself.


## Credits
[Alexander](https://github.com/alykoshin/)


## Links to package pages:

[github.com](https://github.com/alykoshin/mini-fullscreen) &nbsp; [npmjs.com](https://www.npmjs.com/package/mini-fullscreen) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/mini-fullscreen) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/mini-fullscreen) &nbsp; [inch-ci.org](https://inch-ci.org/github/alykoshin/mini-fullscreen)


## License

MIT
