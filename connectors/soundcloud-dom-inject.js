/**
 * Last.fm Scrobbler for Chrome - Soundcloud connector
 * @author Jeppe Hasseriis - https://github.com/cenobitedk
 *
 * This script runs in the context of soundcloud itself.
 * It listens to the page event bus, and propagates these
 * events to the extension via 'postMessage'.
 */

window._ATTACHED = window._ATTACHED || false;
(function() {
    // Exit if already attached.
    if (window._ATTACHED) return;
    // Attach event listeners to the event-bus.
    webpackJsonp([1], {
        0: function(e, t, n) {
            function isEventBus(f) {
                return typeof f === 'object' &&
                    typeof f._events === 'object' &&
                    typeof f._events.all !== 'undefined';
            }

            bus = n(19);
            if (!isEventBus(bus)) {
                var i;
                for (i = 0; i < 255; i++) {
                    var test = n(i);
                    if (isEventBus(test)) {
                        bus = test;
                        break;
                    }
                }
            }
            bus.on('audio:play', function(e) {
                window.postMessage({
                    type: 'SC_PLAY',
                    metadata: e.sound.attributes
                }, '*');
            });
            bus.on('audio:pause', function(e) {
                window.postMessage({
                    type: 'SC_PAUSE',
                    metadata: e.sound.attributes
                }, '*');
            });
        }
    });
    window._ATTACHED = true;
}());
