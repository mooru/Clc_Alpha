/* global Site */
// Misc. functions to be loaded across all/most pages
Site.helpers = (function($, _) {
    var exp = {};

    // Converts a Backbone Marionette UI object into jQuery elements
    exp.getJQueryElements = function(ui) {
      var $ui = {};
      _.each(_.keys(ui), function(key) {
        $ui[key] = $(ui[key]);
      });
      return $ui;
    };

    return exp;
})(window.jQuery, window._);
