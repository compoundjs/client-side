var generator = require('./lib/generator');
var fs = require('fs');

exports.init = function(compound) {
    with (compound.generators) {
        register('clientside', generator);
        compound.on('initializers', function () {
            if (fs.existsSync(compound.root + '/client-side.js')) {
                fs.unlinkSync(compound.root + '/client-side.js');
            }
            init(compound);
            perform('cs', []);
        });
    }
    with (compound.helpers) {
        contentFor('javascripts', javascriptIncludeTag('compound'));
    }
};
