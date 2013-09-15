var     config  =   require('./config.json'),
        needle  =   require('needle'),
        fs      =   require('fs'),
        path    =   require('path');

var obj = function() {};

/*
 * Show Author's Info
 */

obj.prototype.author = function() {
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

obj.prototype.version = function() {
    console.log(config.TITLE+" Version: "+config.VERSION);
};

/*
 * Error log and exit
 */

obj.prototype.error = function(error) {
    throw new Error(error);
};

/*
 * Upload Files
 */

obj.prototype.fly = function(api,file,show) {
    var data = {
        fileUpload: { file: file, content_type: 'application/octet-stream' }
    }

    needle.post(config.URL+api, data, { multipart: true}, function(err, resp, body) {
        if(!err) {
            var RESPONSE = file + ": " + body.url;
            if(show) {
                RESPONSE += "?dl=false";
            }
            console.log(RESPONSE);
        }
        else {
            this.error(err);
        }
    });
};

/*
 * Process Every Single File
 */

obj.prototype.up = function(files, api, show) {
    if(!api && config.API.length == 0) {
        this.error("API KEY IS REQUIRED");
    }
    else if(!api) {
        api = config.API;
    }

    var self = this;

    if(typeof files.constructor === Array) {
        files.forEach(function(file) {
            file = path.resolve(file);
            fs.exists(file,function(esiste) {
                if(esiste) {
                    self.fly(api,file,show);
                }
                else {
                    self.error(file+" DOESN'T EXISTS");
                }
            });
        });
    }
    else {
        filest = path.resolve(files);
        fs.exists(filest,function(esiste) {
            if(esiste) {
                self.fly(api,filest,show);
            }
            else {
                this.error(filest+" DOESN'T EXISTS");
            }
        });
    }
};

obj.prototype.putDown = function(api, file) {
    needle.delete(file+"?key="+api,{key: api},function(err, resp, body) {
        console.log(file+": "+body);
    });
};

obj.prototype.down = function(files, api) {
    if(!api && config.API.length == 0) {
        this.error("API KEY IS REQUIRED");
    }
    else if(!api) {
        api = config.API;
    }

    var self = this;

    if(typeof files.constructor === Array) {
        files.forEach(function(file) {
            self.putDown(api,file);
        });
    }
    else {
        this.putDown(api, files);
    }
};

module.exports = new obj;
