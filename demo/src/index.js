/**
 * Created by alykoshin on 08.12.16.
 */

'use strict';

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

window.addEventListener('load', function load(event){
  // remove listener, as it is not needed any more
  window.removeEventListener('load', load, false);
  // call main method
  init();
}, false);
