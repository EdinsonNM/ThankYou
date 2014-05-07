// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl:'js',
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    text: 'libs/require/text',
  }

});

// Let's kick off the application

require(['router/MainRouter'], function(MainRouter){
  
  MainRouter.initialize();

});
