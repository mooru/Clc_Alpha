var Site = Site || {};
Site.try = (function($, Site) {

  $('document').ready(function(){
    page.init();
  });

  var page = {
    widgetURL: '//static.alpha.org.s3.amazonaws.com/app/try-alpha-widget/index.html',

    init: function(){
      var $widget = $('iframe#try-widget');

      if ($widget.size()) {
        $widget.attr({
          'src': this.getWidgetURL()
        });
      }
    },

    getWidgetURL: function(){
      this.widgetURL += '?lang=' + Site.config.local.lang;
      this.widgetURL += '&country=' + Site.config.local.tryDefaultCountry;
      this.widgetURL += '&town=' + Site.config.local.tryDefaultLocation;
      this.widgetURL += '&coursetype=' + Site.config.local.tryDefaultCourseType;
      this.widgetURL += '&hide=' + Site.config.local.tryHide;
      return this.widgetURL;
    }
  };


})(window.jQuery, window.Site);







