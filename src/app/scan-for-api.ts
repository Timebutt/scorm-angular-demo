var nFindAPITries = 0;
var API = null;
var maxTries = 500;

// The ScanForAPI() function searches for an object named API_1484_11
// in the window that is passed into the function. If the object is
// found a reference to the object is returned to the calling function.
// If the instance is found the SCO now has a handle to the LMS
// provided API Instance. The function searches a maximum number
// of parents of the current window. If no object is found the
// function returns a null reference. This function also reassigns a
// value to the win parameter passed in, based on the number of
// parents. At the end of the function call, the win variable will be
// set to the upper most parent in the chain of parents.
export function ScanForAPI(win) {
    while (win.API_1484_11 == null && win.parent != null && win.parent != win) {
        nFindAPITries++;
        if (nFindAPITries > maxTries) {
            return null;
        }
        win = win.parent;
    }
    return win.API_1484_11;
}

// The GetAPI() function begins the process of searching for the LMS
// provided API Instance. The function takes in a parameter that
// represents the current window. The function is built to search in a
// specific order and stop when the LMS provided API Instance is found.
// The function begins by searching the current window’s parent, if the
// current window has a parent. If the API Instance is not found, the
// function then checks to see if there are any opener windows. If
// the window has an opener, the function begins to look for the
// API Instance in the opener window.
function GetAPI(win) {
    if (win.parent != null && win.parent != win) {
        API = ScanForAPI(win.parent);
    }
    if (API == null && win.opener != null) {
        API = ScanForAPI(win.opener);
    }
}

var findAPITries = 0;

export function findAPI(win) {
    // Check to see if the window (win) contains the API
    // if the window (win) does not contain the API and
    // the window (win) has a parent window and the parent window
    // is not the same as the window (win)
    while (win.API == null && win.parent != null && win.parent != win) {
        // increment the number of findAPITries
        findAPITries++;

        // Note: 7 is an arbitrary number, but should be more than sufficient
        if (findAPITries > 7) {
            alert('Error finding API -- too deeply nested.');
            return null;
        }

        // set the variable that represents the window being
        // being searched to be the parent of the current window
        // then search for the API again
        win = win.parent;
    }
    return win.API;
}

function getAPI() {
    // start by looking for the API in the current window
    var theAPI = findAPI(window);

    // if the API is null (could not be found in the current window)
    // and the current window has an opener window
    if (theAPI == null && window.opener != null && typeof window.opener != 'undefined') {
        // try to find the API in the current window’s opener
        theAPI = findAPI(window.opener);
    }
    // if the API has not been found
    if (theAPI == null) {
        // Alert the user that the API Adapter could not be found
        alert('Unable to find an API adapter');
    }
    return theAPI;
}
