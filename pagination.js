(function($) {
  var settings = {
    'itemsPerPage': 1,
    'items': 'div.item',

    'navigationHTML': '',
    'navigationItem': '',
    'navigationContainer': '.navigation',
    'pagesContainer': '',
    'showPages': true,

    'currentPage': '',
    'showPerPage': '',
    'nextPage': '',
    'prevPage': '',

    'images': '',
    'imagePath': '/gallery_images/',
    'imgWidth': '100',
    'imgHeight': '100'
  };

  var options = $.extend(settings, options);

  var methods = {
    init: function (options) {
      return this.each(function() {
        var o = options;
        var page = 0;
        var item = 0;
        var items = $(this).find(o.items);
        var pages = Math.ceil(items.length / o.itemsPerPage);
        var container = $(this);

        o.navigationHTML = '';
        if (typeof o.imagePath == 'undefined') {
          o.imagePath = '/gallery_images/';
        }

        items.each(function() {
          $(this).attr('style', 'display: none');
        });

        items.attr('style', 'display: none').slice(0, o.itemsPerPage).attr('style', 'display: block');
        $(o.currentPage).val(0);
        $(o.showPerPage).val(o.itemsPerPage);

        // navigation html
        while (pages > page) {
          if (o.navigationItem == '' && typeof o.images == 'undefined') {
            o.navigationHTML += '<a href="javascript:;" id="page" data-page="' + page + '">' + parseInt(page + 1) + '</a> /';
          }

          if (typeof o.images !== 'undefined') {
            if (o.images.length != 0)
              o.navigationHTML += '<a href="javascript:;" id="page" class="theImage" data-page="' + page + '">\n\
                                <img src="' + o.imagePath + o.images[page] + '" width="' + o.imgWidth + '" height="' + o.imgHeight + '" alt="" />\n\
                                </a>';
          }

          if (o.navigationItem != '') {
            o.navigationHTML += '<a href="javascript:;" id="page" data-page="' + page + '">' + o.navigationItem + '</a>';
          }

          page++;
        }

        methods.writePageNumbering(o, pages);

        // append navigation to container
        $(o.navigationContainer).html(o.navigationHTML);
        // end navigation html

        $(o.navigationContainer).find('#page').each(function(key, val) {
          $(val).on('click', function() {
            methods.goToPage($(this).attr('data-page'), container, o);
          });
        });

        $(o.nextPage).on('click', function() {
          methods.goNext(container, o);
          methods.writePageNumbering(o, pages);
        });

        $(o.prevPage).on('click', function() {
          methods.goPrev(container, o);
          methods.writePageNumbering(o, pages);
        });
      });
    },

    goToPage: function(page, container, o) {
      var showPerPage = parseInt($(o.showPerPage).val());
      var startFrom = page * showPerPage;
      var endOn = startFrom + showPerPage;

      $(container).find(o.items).attr('style', 'display: none').slice(startFrom, endOn).attr('style', 'display: block');
      $(o.currentPage).val(page);
    },

    goPrev: function(container, o) {
      var navPage = parseInt($(o.currentPage).val()) - 1;
      methods.goToPage(navPage, container, o);
    },

    goNext: function(container, o) {
      var navPage = parseInt($(o.currentPage).val()) + 1;
      methods.goToPage(navPage, container, o);
    },

    writePageNumbering: function(o, pages) {
      if (o.showPages !== 'false') {
        if (typeof o.pagesContainer != 'undefined') {
          $(o.pagesContainer).html(parseInt(parseInt($(o.currentPage).val()) + 1) + '/' + pages);
        }
      }
    }
  };

  $.fn.pagination = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.pagination');
    }
  }
})(jQuery);
