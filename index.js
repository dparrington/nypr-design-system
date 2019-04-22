'use strict';
const path = require('path');
const map = require('broccoli-stew').map;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,
  included: function(app) {
    let { sassOptions = {} } = app.options;
    if (!sassOptions.includePaths) {
      sassOptions.includePaths = [];
    }
    sassOptions.includePaths.push('node_modules/ember-basic-dropdown/app/styles');
    app.options.sassOptions = sassOptions;

    app.import({
      development: 'vendor/imagesloaded.pkgd.js',
      production: 'vendor/imagesloaded.pkgd.min.js',
    });
    app.import('vendor/shims/imagesloaded.js');

    this._super.included.apply(this, arguments);
  },
  treeForVendor(defaultTree) {
    var trees = [];
    var imagesLoaded = new Funnel(path.dirname(require.resolve('imagesloaded')));

    imagesLoaded = map(imagesLoaded, content => `if (typeof FastBoot === 'undefined') { ${content}; }`);

    trees.push(imagesLoaded);
    if (defaultTree) {
      trees.push(defaultTree);
    }

    return mergeTrees(trees);
  }
};
