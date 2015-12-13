'use strict';

/**
 * Created by alykoshin on 4/5/14.
 */

/**
 * Object to manage Full Screen mode
 *
 * @constructor
 * @returns {FullScreen}
 */

var FullScreen = function() {

  var self = this;

  /**
   *
   * @param evt
   */
  function onFullScreenChange(evt) {
    console.log('FullScreen: onFullScreenChange(): evt:', evt );

    /** Need to change class for the button wrtcOn <-> wrtcOff
     * we'll do it for ALL buttons - anyway, we do not see all of them...
     */
    var elements = document.getElementsByClassName('wrtcFullScreen');

    /** @type {number} **/
    for (var i=0; i < elements.length; i++) {
      elementFlipOnOff(elements[i]);
    }
  }

  function onFullScreenError(evt) {
    console.log('FullScreen: onFullScreenError(): evt:', evt );
  }

  [
    'fullscreenchange',
    'msfullscreenchange',
    'mozfullscreenchange',
    'webkitfullscreenchange'
  ].forEach( function(item, index, array) {
      document.addEventListener(item, onFullScreenChange);
    });

  [
    'fullscreenerror',
    'msfullscreenerror',
    'mozfullscreenerror',
    'webkitfullscreenerror'
  ].forEach( function(item, index, array) {
      document.addEventListener(item, onFullScreenError);
    });

  //document.addEventListener('fullscreenchange',       onFullScreenChange);
  //document.addEventListener('msfullscreenchange',     onFullScreenChange);
  //document.addEventListener('mozfullscreenchange',    onFullScreenChange);
  //document.addEventListener('webkitfullscreenchange', onFullScreenChange);

  /**
   * Start Full Screen Mode
   *
   * @param htmlElement - HTML Element to be shown on full screen
   */
  self.start = function (htmlElement) {
    //var res = true;
    var res = false;
//          assert(element === null, 'Full Screen is already activated.');
    [
      'requestFullScreen',
      'msRequestFullscreen',
      'mozRequestFullScreen',
      'webkitRequestFullScreen'
    ].forEach( function(item, index, array) {
        if (htmlElement[item]) { htmlElement[item](); res = true; }
      } );
    //if      (htmlElement.requestFullScreen)       { htmlElement.requestFullScreen();       }
    //else if (htmlElement.msRequestFullscreen)     { htmlElement.msRequestFullscreen();     }
    //else if (htmlElement.mozRequestFullScreen)    { htmlElement.mozRequestFullScreen();    }
    //else if (htmlElement.webkitRequestFullScreen) { htmlElement.webkitRequestFullScreen(); }//Element.ALLOW_KEYBOARD_INPUT); }
    //else { result = false; }
    return res;
  };

  /**
   * Stop Full Screen Mode
   */
  self.stop = function () {
    var result = true;
//          assert(element !== null, 'Full Screen was not activated.');
//          assert( elem!==undefined && element !== elem, 'Full Screen activated for other element.');
    if      (document.cancelFullScreen)       { document.cancelFullScreen();       }
    else if (document.msCancelFullScreen)     { document.msCancelFullScreen();     }
    else if (document.mozCancelFullScreen)    { document.mozCancelFullScreen();    }
    else if (document.webkitCancelFullScreen) { document.webkitCancelFullScreen(); }
    else { result = false; }
    return result;
    /*      // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
     if (document.exitFullscreen) {
     document.exitFullscreen();
     } else if (document.msExitFullscreen) {
     document.msExitFullscreen();
     } else if (document.mozCancelFullScreen) {
     document.mozCancelFullScreen();
     } else if (document.webkitExitFullscreen) {
     document.webkitExitFullscreen();
     }*/
  };

  /**
   * Check whether some HTML element currently is in full screen mode
   *
   * @returns {boolean} - true if some HTML element currently is in full screen mode, false otherwise
   */
  self.getEnabled = function () {
    return !!(document.fullscreenEnabled ||
    document.msFullscreenEnabled ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen);
    /** https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode **/
  };

  /**
   * Get the HTML Element which is currently in Full Screen Mode
   *
   * @returns {*}
   */
  self.getElement = function () {
    return document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullscreenElement ||
      document.webkitFullscreenElement;
  };

  /**
   * Toggle Full Screen Mode for the HTML element
   *
   * @param htmlElement
   */
  self.toggle = function(htmlElement) {
    if ( ! self.getEnabled() ) {
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
