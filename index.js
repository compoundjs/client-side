var generator = require('./lib/generator');

exports.init = function(compound) {
    compound.generators.register('clientside', generator);
};
