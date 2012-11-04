(function($) {
  $.fn.pagination = function(options) {
    var settings = $.extend({
      'itemsPerPage': 1,
      'items': 'div.item',
      'navigationHTML': '',
      'navigationContainer': '.navigation',
      'currentPage': '#currentPage',
      'showPerPage': '#showPerPage'
    });

    var options = $.extend(settings, options);

    return this.each(function() {
      var o = options;

      var page = 0;
      var item = 0;
      var items = $(this).find(o.items);
      var pages = Math.ceil(items.length / o.itemsPerPage);
      var container = $(this);

      items.each(function() {
        $(this).attr('style', 'display: none');
      });

      items.attr('style', 'display: none').slice(0, o.itemsPerPage).attr('style', 'display: block');
      $(o.currentPage).val(0);
      $(o.showPerPage).val(o.itemsPerPage);

      // navigation html
      while (pages > page) {
        o.navigationHTML += '<a href="javascript:;" id="page" data-page="' + page + '">' + page + '</a>';
        page++;
      }

      // append navigation to container
      $(o.navigationContainer).html(o.navigationHTML);
      // end navigation html

      $(o.navigationContainer).find('#page').each(function(key, val) {
        $(val).on('click', function() {
          goToPage($(this).attr('data-page'), container);
        });
      });

      function goToPage(page, container) {
        var showPerPage = parseInt($(o.showPerPage).val());
        var startFrom = page * showPerPage;
        var endOn = startFrom + showPerPage;

        $(container).find(o.items).attr('style', 'display: none').slice(startFrom, endOn).attr('style', 'display: block');
        $(o.currentPage).val(page);
      }

      function goPrev() {
        var navPage = parseInt($(o.currentPage).val()) - 1;
        goToPage(navPage);
      }

      function goNext() {
        var navPage = parseInt($(o.currentPage).val()) + 1;
        goToPage(navPage);
      }
    });
  }
})(jQuery);