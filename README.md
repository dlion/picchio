Picchio - filepicker.io uploader
================================

*Picchio* it's a simple CLI script wrote in Node.js to upload many files into filepicker.io


Modules
-------------
*   [Optimist](https://npmjs.org/package/optimist)
*   [Needle](https://npmjs.org/package/needle)
*   [Fs](http://nodejs.org/api/fs.html)
*   [Path](http://nodejs.org/api/path.html)

Use it
------
*   First of all you must have a filepicker.io account and an API key.

Then you have two choices:

*   Pass API key as parameter
*   Set API key into config.js file

After taht pass your files and will receive links

Example1
-------
```sh
node picchio -f README.md -a "jnkdnjdnfj"
```

Example2
--------
```sh
node picchio -f README.md -f ../pic.jpg -f ../../../text.txt
```
*In this case I have set my API key into config file*

Usage
-----
You can view usage passing `-h` parameter

Show File
---------
When filepicker.io send you a link, when you will visit it you can just download file but if you use `-s` parameter you can view it into your browser

Author
------
Name:       Domenico Leone Luciani

Site:       [http://dlion.it](http://dlion.it)

Twitter:    [@dlion92](http://twitter.com/dlion92)

email:      domenicoleoneluciani [@] gmail [.] com
