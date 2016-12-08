'use strict';

/**
 * Created by alykoshin on 4/5/14.
 */

if ( typeof module !== 'undefined' && typeof require !== 'undefined') {
  var Emitter = require('mini-emitter');
}

/**
 * Object to manage Full Screen mode
 *
 * @constructor
 * @returns {FullScreen}
 */

var FullScreen = function() {

  var self = this;
  Emitter(self);

  /**
   *
   * @param event
   */
  function onFullScreenChange(event) {
    //console.log('FullScreen: onFullScreenChange(): event:', event );
    self.emit('change', event);
  }

  function onFullScreenError(event) {
    //console.log('FullScreen: onFullScreenError(): event:', event );
    self.emit('error', event);
  }

  [
    'fullscreenchange',
    'msfullscreenchange',
    'mozfullscreenchange',
    'webkitfullscreenchange'
  ].forEach( function(eventName, index, array) {
      document.addEventListener(eventName, onFullScreenChange);
    });

  [
    'fullscreenerror',
    'msfullscreenerror',
    'mozfullscreenerror',
    'webkitfullscreenerror'
  ].forEach( function(eventName, index, array) {
      document.addEventListener(eventName, onFullScreenError);
    });

  /**
   * Start Full Screen Mode
   * https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
   *
   * @param htmlElement - HTML Element to be shown on full screen
   * @returns {boolean}
   */
  self.start = function (htmlElement) {
    //console.log('miniFullScreen: self.start():');
//          assert(!self.getEnabled(), 'Full Screen is already activated.');
    var res = true;
    if      (htmlElement.requestFullScreen)       { htmlElement.requestFullscreen();       }
    else if (htmlElement.msRequestFullscreen)     { htmlElement.msRequestFullscreen();     }
    else if (htmlElement.mozRequestFullScreen)    { htmlElement.mozRequestFullScreen();    }
    else if (htmlElement.webkitRequestFullScreen) { htmlElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); }
    else { res = false; }
    return res;
  };

  /**
   * Stop Full Screen Mode
   * https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
   * https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
   *
   * @returns {boolean}
   */
  self.stop = function (htmlElement) {
    //console.log('miniFullScreen: self.stop():');
//          assert(self.getEnabled(), 'Full Screen was not activated.');
//          assert(htmlElement && (self.getElement() !== htmlElement), 'Full Screen activated for other element.');
    var res = true;
    if      (document.exitFullscreen)         { document.exitFullscreen();       }
    else if (document.msExitFullscreen)       { document.msExitFullscreen();     }
    else if (document.mozCancelFullScreen)    { document.mozCancelFullScreen();  }
    else if (document.webkitExitFullscreen)   { document.webkitExitFullscreen(); }    // also webkitCancelFullScreen
    else { res = false; }
    return res;
  };

  /**
   * Check document currently supports full screen mode
   * Mozilla: https://developer.mozilla.org/en-US/docs/Web/API/Document/mozFullScreenEnabled
   *
   * @returns {boolean} - true if document currently supports full screen mode, false otherwise
   */
  self.getEnabled = function () {
    return !!(
      document.fullscreenEnabled ||
      document.msFullscreenEnabled  ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled
    );
    /** https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode **/
  };

  /**
   * Check whether some HTML element currently is in full screen mode
   * Mozilla: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
   * also (older): https://developer.mozilla.org/en-US/docs/Web/API/Document/mozFullScreen
   *
   * @returns {boolean} - true if some HTML element currently is in full screen mode, false otherwise
   */
  self.getActive = function () {
    return !! self.getElement();
  };

  /**
   * Get the HTML Element which is currently in Full Screen Mode
   *
   * @returns {*}
   */
  self.getElement = function () {
    return (
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement
    );
  };

  /**
   * Toggle Full Screen Mode for the HTML element
   *
   * @param htmlElement
   */
  self.toggle = function(htmlElement) {
    //console.log('miniFullScreen: self.toggle(): self.getActive():', self.getActive());
    if ( ! self.getActive() ) {
      return self.start(htmlElement);
    } else {
      return self.stop();
    }
  };

  return self;

};

var miniFullScreen = new FullScreen();

//

if (typeof module !== 'undefined') {
  module.exports = miniFullScreen;
}

if (typeof window !== 'undefined') {
  window.miniFullScreen = miniFullScreen;
}
