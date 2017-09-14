/*
* dependence: none
* publish / subscribe
* EventCenter.on(evt, fn) // set event handler
* EventCenter.once(evt, fn) // set , and this event will be triggered at most once
* EventCenter.fire(evt) // trigger event
* EventCenter.off(evt) // remove event
* author：yunyu950908
* */

const EventCenter = (function () {
    const onceEvent = {};
    const events = {};

    function on(evt, fn) {
        if (events[evt]) {
            events[evt].push(fn);
        } else {
            events[evt] = [fn];
        }
    }

    function once(evt, fn) {
        if (onceEvent[evt]) {
            onceEvent[evt].push(fn);
        } else {
            onceEvent[evt] = [fn];
        }
    }

    function fire(evt) {
        if (events[evt]) {
            events[evt].forEach((fn) => {
                fn();
            });
        }
        if (onceEvent[evt]) {
            onceEvent[evt].forEach((fn) => {
                fn();
            });
            onceEvent[evt] = [];
        }
    }

    function off(evt) {
        delete events[evt]
    }

    return {
        on: on,
        once: once,
        fire: fire,
        off: off,
    }
})();
