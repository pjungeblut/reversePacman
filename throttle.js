/**
 * Code from: https://developer.mozilla.org/en-US/docs/Web/Events/resize
 *
 * Throttling some events that may fire to quickly to perform complicated tasks
 * in their event handlers.
 */
(function() {
    /**
     * Throttles an event. To be used when an event fires very quickly and the
     * handler needs to perform complicated tasks.
     *
     * @param {string} type The original event name.
     * @param {string} name The throttled event name.
     * @param {Object=} opt_obj The object to call the event on. If not
     *     specified , the event will be dispatched on the window object.
     */
    var throttle = function(type, name, opt_obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle("resize", "optimizedResize");
})();
