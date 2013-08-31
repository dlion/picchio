var func = require('./func');

if(process.argv.length > 2) {
    process.argv.splice(2).forEach(function(file, index) {
        switch(file) {
            case '-h':
            case '--help':
                func.usage();
                break;
            case '-w':
            case '--author':
                func.author();
                break;
            case '-v':
            case '--version':
                func.version();
                break;
            default:
                console.log(index + " : "+ file);
        }
    });
}
else {
    func.usage();
}

