/*
* dependence: none
* publish / subscribe
* EventCenter.on(evt, fn)
* EventCenter.once(evt, fn)
* EventCenter.fire(evt)
* EventCenter.off(evt)
* author：yunyu950908
* */

const EventCenter = (function () {
    const onceEvent = {};
    const events = {};

    function on(evt, fn) {
        if (this.events[evt]) {
            this.events[evt].push(fn);
        } else {
            this.events[evt] = [fn];
        }
    }

    function once(evt, fn) {
        if (this.onceEvent[evt]) {
            this.onceEvent[evt].push(fn);
        } else {
            this.onceEvent[evt] = [fn];
        }
    }

    function fire(evt) {
        if (this.events[evt]) {
            this.events[evt].forEach((fn) => {
                fn();
            });
        }
        if (this.onceEvent[evt]) {
            this.onceEvent[evt].forEach((fn) => {
                fn();
            });
            this.onceEvent[evt] = [];
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