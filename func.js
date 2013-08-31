var     config  =   require('./config'),
        request =   require('request'),
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
    console.log("[ERROR]: "+error);
    process.exit(1);
};


/*
 * Upload File
 */

exports.up = function(files, api, proxy, show) {
    if(!api && config.API.length == 0) {
        exports.error("API KEY IS REQUIRED");
    }
    else if(!api) {
        api = config.API;
    }

    if(files.constructor === Array) {
        files.forEach(function(file) {
            if(fs.existsSync(file)) {
                console.log("PROCESS: "+file);
                var req = request({
                    url:    config.URL,
                    method: 'POST',
                    form: {
                        fileUpload: fs.createReadStream(file),
                        apikey:     api
                    }
                }, function(error, resp, body) {
                    if(!error && resp.statusCode == 200) {
                        console.log("CORPO:\n"+body);
                    }
                    else {
                        exports.error(error);
                    }
                });
            }
            else {
                exports.error(file+" DOESN'T EXISTS");
            }
        });
    }
    else {
        console.log("NON ARRAY");
        fs.exists(files,function(esiste) {
            if(esiste) {
                console.log("PROCESS: "+files+" API: "+api+" PATH: "+path.join(__dirname,files));
                var req     =   request.post(config.URL+files,function(err, resp, body) {
                    console.log("BODY: "+body);
                }).form({
                    apikey: api,
                    fileUpload: fs.createReadStream(path.join(__dirname,files))
                });
            }
            else {
                exports.error(files+" DOESN'T EXISTS");
            }
        });
    }
};

