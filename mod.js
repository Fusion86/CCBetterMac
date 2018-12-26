// Disable overscrolling/elastic scrolling
window.parent.document.getElementsByTagName("html")[0].style.overflow = "hidden";

// #region Patch mousewheel event

orig_func_name = 'n7a'; // TODO: Get dynamically
orig = ig.input[orig_func_name].toString(); // Get original eventhandler code
code = orig.substring(orig.indexOf('{') + 1, orig.lastIndexOf('}')); // Stip `function {` and `}`

// Patch code so that it works better on macOS
// TODO: ...

// Create new function with patched code
orig_func = new Function('a', code); // Argument name should always be `a` (because that is how the uglifier works)

// Override mousewheel event
window.addEventListener("mousewheel", function (event) {
    event.stopPropagation(); // Stop the original mousewheel implementation from running

    // Call original scroll function
    // We are using orig_func.call() so that `this` points to `ig.input` (as expected by the original code)
    orig_func.call(ig.input, event);
}, true);

// #endregion