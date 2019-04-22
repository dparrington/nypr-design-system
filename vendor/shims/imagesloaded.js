(function() {
  function vendorModule() {
    'use strict';

    return {
      default: self['imagesLoaded']
    };''
  }

  define('imagesloaded', [], vendorModule);
})();
