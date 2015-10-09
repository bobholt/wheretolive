require.config({

  // Make all requires relative to /.
  baseUrl: '../',

  deps: ['src/main'],

  // Map components to nice paths.
  paths: {
    'jquery': 'bower_components/jquery/jquery',
    'leaflet': 'bower_components/Leaflet/dist/leaflet-src',
    'stamen': 'lib/tile.stamen',

    'airports': 'src/modules/airports',
    'arts': 'src/modules/arts',
    'distances': 'src/modules/distances',
    'nature': 'src/modules/nature',
    'schools': 'src/modules/schools',
    'science-history': 'src/modules/science-history',
    'shopping': 'src/modules/shopping',
    'transportation': 'src/modules/transportation',

    // This must work in the browser AND not explode in the r.js build step.
    'livereload': 'http://' + (typeof location !== 'undefined' ?
      location.hostname : 'localhost') + ':35729/livereload.js?snipver=1'
  },

  // Load non-AMD dependencies.
  shim: {
    'leaflet': {
      exports: 'Leaflet'
    },
    'stamen': {
      deps: ['leaflet'],
      exports: 'stamen'
    }
  }

});
