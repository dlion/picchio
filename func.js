var     config  =   require('./config.json'),
        needle  =   require('needle'),
        fs      =   require('fs'),
        path    =   require('path');




/*
 * Show Author's Info
 */

exports.author = function() {
    console.log("Author: Domenico Leone Luciani\n"
                +"Email: domenicoleoneluciani [@] gmail [.] com\n"
                +"Site: http://dlion.it\n"
                +"twitter: @dlion92\n"
                +"github: http://github.com/DLion"
            );
};

/*
 * Show Version's Info
 */

exports.version = function() {
    console.log(config.TITLE+" Version: "+config.VERSION);
};

/*
 * Error log and exit
 */

exports.error = function(error) {
    throw new Error(error);
};

/*
 * Upload Files
 */

exports.fly = function(api,file,show) {
    var data = {
        fileUpload: { file: file, content_type: 'application/octet-stream' }
    };

    needle.post(config.URL+api, data, { multipart: true}, function(err, resp, body) {
        if(!err) {
            var RESPONSE = file + ": " + body.url;
            if(show) {
                RESPONSE += "?dl=false";
            }
            console.log(RESPONSE);
        }
        else {
            exports.error(err);
        }
    });
};

/*
 * Process Every Single File
 */

exports.up = function(files, api, show) {
    if(!api && config.API.length == 0) {
        exports.error("API KEY IS REQUIRED");
    }
    else if(!api) {
        api = config.API;
    }

    if(files.constructor === Array) {
        files.forEach(function(file) {
            file = path.resolve(file);
            fs.exists(file,function(esiste) {
                if(esiste) {
                    exports.fly(api,file,show);
                }
                else {
                    exports.error(file+" DOESN'T EXISTS");
                }
            });
        });
    }
    else {
        files = path.resolve(files);
        fs.exists(files,function(esiste) {
            if(esiste) {
                exports.fly(api,files,show);
            }
            else {
                exports.error(files+" DOESN'T EXISTS");
            }
        });
    }
};

exports.putDown = function(api, file) {
    needle.delete(file+"?key="+api,{key: api},function(err, resp, body) {
        console.log(file+": "+body);
    });
};

exports.down = function(files, api) {
    if(!api && config.API.length == 0) {
        exports.error("API KEY IS REQUIRED");
    }
    else if(!api) {
        api = config.API;
    }

    if(typeof files.constructor === Array) {
        files.forEach(function(file) {
            exports.putDown(api,file);
        });
    }
    else {
        exports.putDown(api, files);
    }
};
