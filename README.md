
http v1.0
=========

http is a unified Javascript RequireJS/CommonJS module for the browser or Wakanda Server (SSJS)
which provides basic http support. 

Contents
--------
* [Dependencies](#DEPENDENCIES)
* [Script Files](#SCRIPT_FILES)
* [Constants](#CONSTANTS)
    * [HEADER\_FIELD\_NAMES (Alias: HFN)](#HEADER_FIELD_NAMES)
    * [STATUS\_CODES](#STATUS_CODES)
* [Module Functions](#MODULE_FUNCTIONS)
    * [isAuthErrorResponse (xhr)](#ISAUTHERRORRESPONSE)
    * [isErrorResponse (xhr)](#ISERRORRESPONSE)
    * [responseHeadersToObject (xhr)](#RESPONSEHEADERSTOOBJECT)
    * [statusText (xhr)](#STATUSTEXT)
* [Contributions](#CONTRIBUTIONS)
* [License](#LICENSE)


<a id="DEPENDENCIES"></a>
Dependencies
------------

* [RequireJS](http://requirejs.org) on the client (browser) side.
* [Wakanda](http://www.wakanda.org) v6+.

<a id="SCRIPT_FILES"></a>
Script Files
------------

* http.js - Fully commented script. Update to contribute.
* http.min.js - Minimized script. For normal use.
* http.no-md.js - Commented script without markdown comments. Use for debugging.

<a id="CONSTANTS"></a>
Constants
---------
<a id="HEADER_FIELD_NAMES"></a>
### HEADER\_FIELD\_NAMES (Alias: HFN)
Standard and common custom HTTP header field names. See the module code for specific values. 

Examples:

```javascript
xhr.setRequestHeader(http.HEADER_FIELD_NAMES.CONTENT_TYPE, "text/plain");	
```

<a id="STATUS_CODES"></a>
### STATUS\_CODES
The HTTP protocol status codes. See the module code for specific values. 

Examples:

```javascript
http.STATUS_CODES.OK; // 200
```


<a id="MODULE_FUNCTIONS"></a>
Module Functions
----------------
<a id="ISAUTHERRORRESPONSE"></a>
### isAuthErrorResponse (xhr)

Determines if the status within `xhr` indicates that an authentication error (401) occurred.

#### Arguments

* `xhr` - An XMLHttpRequest object.

#### Return Value

* Returns *true* if `xhr` indicates an authentication error and returns *false* otherwise.

Examples:

```javascript
....
xhr.send();

if (http.isAuthErrorResponse(xhr)) {
    // Reauthorize and try again.
}
```
<a id="ISERRORRESPONSE"></a>
### isErrorResponse (xhr)

Determines if the status within `xhr` indicates that an error occurred.

#### Arguments

* `xhr` - An XMLHttpRequest object.

#### Return Value

* Returns *true* if `xhr` indicates an error and returns *false* otherwise.

Examples:

```javascript
....
xhr.send();

if (http.isErrorResponse(xhr)) {
    // Handle the error.
}
```
<a id="RESPONSEHEADERSTOOBJECT"></a>
### responseHeadersToObject (xhr)

Converts the response headers in `xhr` into a javascript object where the response fields become
the object's properties with their corresponding values. 

#### Arguments

* `xhr` - An XMLHttpRequest object.

#### Return Value

* Returns the response headers within `xhr` as a javascript object.

Examples:

```javascript
....
xhr.send();

headers = http.responseHeadersToObject(xhr);

// headers ==> {
//                  "Content-Length": 583727,
//                  "Content-Type": "text/html; charset=utf-8",
//                  "Last-Modified": "Tue, 15 Nov 1994 12:45:26 +0000"
//             }
```
<a id="STATUSTEXT"></a>
### statusText (xhr)

Returns a textual representation of the status within `xhr`.

#### Arguments

* `xhr` - An XMLHttpRequest object.

#### Return Value

* See description.

Examples:

```javascript
....
xhr.send();

http.statusText(xhr); // "200 OK"
```

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you contribute to this library, just modify `http.js` and send a pull request. Please remember
to update the markdown if the public interface changes. 

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
