var func        = require('./func'),
    optimist    = require('optimist')
    .usage("Usage: $0 [options] -f [target1] -f [target2] -f [...]")
    .alias("a", "api")
    .describe("a", "Set API key")
    .alias("f", "file")
    .describe("f", "File to upload")
    .alias("h", "help")
    .describe("h", "Print this usage")
    .alias("p", "proxy")
    .describe("p", "Set Proxy")
    .alias("s", "show")
    .describe("s", "Print show link")
    .alias("w", "author")
    .describe("w", "Print author's name")
    .alias("v", "version")
    .describe("v", "Print version's script")
    .demand('f');

var argv        = optimist.argv;

// Select options

if(argv.f) {
    var API     = (argv.a) ? argv.a : false;
    var PROXY   = (argv.p) ? argv.p : false;
    var SHOW    = (argv.s) ? true   : false;
    func.up(argv.f,API,PROXY,SHOW);
}
else if(argv.h) {
    optimist.showHelp();
}
else if(argv.w) {
    func.author();
}
else if(argv.v) {
    func.version();
}
