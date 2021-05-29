
<!--#echo json="package.json" key="name" underline="=" -->
genconf-firefox-lockedprefs-pmb
===============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Render a dictionary of prefs as Firefox locked pref config file format.
<!--/#echo -->



API
---

This module exports one function:

### fmtLockedPref(opt, prefs)

`opt` is an options object that supports these keys:

* `ffVerMajor` (required): Firefox major version, as an integer number.


`prefs` is a dictionary of prefs you want to lock.

Returns an array of prefs file lines, whose `toString` method is one
that joins them with newlines and also appends a trailing newline.




Usage
-----

see [test/usage.mjs](test/usage.mjs)



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
