/* global Site */
/* global moment */
var Site = Site || {};
Site.global = (function($, Site) {

  $('document').ready(function(){
    page.init();
  });

  // Turn strings in to a class
  function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return s.toLowerCase();
      return c.toString(16).slice(-4);
    });
  }

  var page = {
    init: function(){

      var myItems = [];
      var myList = $( "#global-countries" );
      var Global = Site.config.global;

      // Tabs header
      myItems.push("<ul class='tabs'>");
        for (var region in Global){
          // Create ID from Content name
          var regionID = makeSafeForCSS(region);
          // Repeating li
          myItems.push( "<li class='" + regionID + "'>" );
            // Link to tab content
            myItems.push( "<a href='#region-" + regionID + "' class='translate'>" );
              myItems.push( "<span class='icon icon-regions'><span class='path1'></span><span class='path2'></span></span>" );
              myItems.push( region );
            myItems.push( "</a>" );
          myItems.push("</li>");
        }
      myItems.push("</ul>");

      // Tab inner
      myItems.push( "<div class='tab-inner'>" );

        // Build the lists of countries
        for (var region in Global ){

          // Create ID from Content name
          var regionID2 = makeSafeForCSS(region);

          // Div wrapper
          myItems.push( "<div id='region-" + regionID2 + "'>" );
            // Ul wrapper
            myItems.push("<ul>");

            for (var country in Global[region]){
              var c = Global[region][country];

              // Repeating li
              myItems.push( "<li>" );

                // Link to c.url
                myItems.push( "<a href='" + c.url + "'>" );

                  // Is there an image
                  if(c.image != "") {
                    // Add image
                    myItems.push( "<img src='/assets/icons/flags/" + c.image + "' alt='" + c.locale + " flag' />" );
                  }

                  // Country Name
                  myItems.push( "<span>" + c.locale + "</span>" );

                myItems.push( "</a>" );
              myItems.push( "</li>" );

            }
            myItems.push("</ul>");
          myItems.push("</div>");
        }
      myItems.push("</div>");

      myList.append( myItems.join( "" ) );


      // Tabs
      $('ul.tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
          $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function(e){
          // Make the old tab inactive.
          $active.removeClass('active');
          //$content.hide();
          $content.slideUp(300);

          // Update the variables with the new link and content
          $active = $(this);
          $content = $(this.hash);

          // Make the tab active.
          $active.addClass('active');
          // $content.show();
          $content.delay(300).slideDown(300);

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });

    }
  };

})(window.jQuery, window.Site);