// Disable overscrolling/elastic scrolling
window.parent.document.getElementsByTagName("html")[0].style.overflow = "hidden";

// #region Override mousewheel event

var prev_time = 0;
var prev_delta = 0;

// Override mousewheel event
window.addEventListener("mousewheel", function (event) {
    event.stopPropagation(); // Stop the original mousewheel implementation from running

    var cur_time = new Date().getTime();
    var time_diff = cur_time - prev_time;
    var delta = Math.abs(event.deltaY);

    var is_touchpad = Number.isInteger(delta); // Touchpad always has non-decimal delta values, I think?

    if (is_touchpad) {
        // Ignore inertial scrolls, sorta?
        if (time_diff < 100 && delta < 50) return;

        // Ignore slow scrolls
        if (delta < 3) return;
    }

    prev_time = cur_time;
    prev_delta = delta;

    ig.input.n7a.call(ig.input, event); // TODO: Get `n7a` name dynamically
}, true);

// #endregion