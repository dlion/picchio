var     config  =   require('./config');
/*
 * Function to use Picchio
 */

exports.usage = function() {
    console.log("node "+process.argv[1]+" [options] [target1] [target2] [target3] [...]\n"
                +"Options:\n"
                +"-a|--api              Set API key\n"
                +"-h|--help             Print this usage\n"
                +"-p|--proxy            Set Proxy\n"
                +"-s|--show             Print show link\n"
                +"-w|--author           Print author's name\n"
                +"-v|--version          Print version's script"
            );
};

exports.author = function() {
    console.log("Author: Domenico Leone Luciani\n"
                +"Email: domenicoleoneluciani [@] gmail [.] com\n"
                +"Site: http://dlion.it\n"
                +"twitter: @dlion92\n"
                +"github: http://github.com/DLion"
            );
};

exports.version = function() {
    console.log("Version: "+config.VERSION);
};

