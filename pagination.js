(function($) {
  var settings = {
    itemsPerPage: 1,
    items: 'div.item',

    navigationHTML: '',
    navigationItem: '',
    navigationContainer: '.navigation',
    pagesContainer: '',
    showPages: true,

    currentPage: '',
    showPerPage: '',
    nextPage: '',
    prevPage: '',

    images: '',
    imagePath: '/gallery_images/',
    imgWidth: '100',
    imgHeight: '100'
  };

  var options = $.extend(settings, options);

  var methods = {
    init: function (options) {
      return this.each(function() {
        var o         = options
          , page      = 0
          , item      = 0
          , items     = $(this).find(o.items)
          , pages     = Math.ceil(items.length / o.itemsPerPage)
          , container = $(this);

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

        o.navigationHTML += o.prevPage;
        // navigation html
        while (pages > page) {
          if (o.navigationItem == '' && typeof o.images == 'undefined') {
            if ($(o.currentPage).val() == page)
              o.navigationHTML += '<li class="active"><a href="javascript:;" class="page active" id="page" data-page="' + page + '">' + parseInt(page+1) + '</a></li>';
            else
              o.navigationHTML += '<li><a href="javascript:;" class="page" id="page" data-page="' + page + '">' + parseInt(page+1) + '</a></li>';
          }

          if (typeof o.images != 'undefined') {
            if (o.images.length != 0) {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML +=
                '<a href="javascript:;" id="page" class="page theImage active" data-page="' + page + '">\n\
                <img src="' + o.imagePath + o.images[page] + '" width="' + o.imgWidth + '" height="' + o.imgHeight + '" alt="" />\n\
                </a>';
              } else {
                o.navigationHTML +=
                '<a href="javascript:;" id="page" class="page theImage" data-page="' + page + '">\n\
                <img src="' + o.imagePath + o.images[page] + '" width="' + o.imgWidth + '" height="' + o.imgHeight + '" alt="" />\n\
                </a>';
              }
            }
          }

          if (o.navigationItem != '') {
            if ($(o.currentPage).val() == page)
              o.navigationHTML += '<li class="active"><a href="javascript:;" class="page active" id="page" data-page="' + page + '">' + o.navigationItem + '</a></li>';
            else
              o.navigationHTML += '<li><a href="javascript:;" class="page" id="page" data-page="' + page + '">' + o.navigationItem + '</a></li>';
          }

          page++;
        }
        o.navigationHTML += o.nextPage;

        methods.writePageNumbering(o, pages);

        if (page > 1) $(o.navigationContainer).html(o.navigationHTML);

        $(o.navigationContainer).find('.page').each(function(key, val) {
          $(val).on('click', function() {
            methods.goToPage($(this).attr('data-page'), container, o);

            methods.changeClass($(this), o);
            methods.changeClass($(this).parent(), o);
          });
        });

        $(o.nextPage).on('click', function() {
          methods.goNext(container, o, pages);
          $(o.navigationContainer).find('.page').each(function(key, val) {
            methods.changeClass($(this), o);
          });
          methods.writePageNumbering(o, pages);
        });

        $(o.prevPage).on('click', function() {
          methods.goPrev(container, o, pages);
          $(o.navigationContainer).find('.page').each(function(key, val) {
            methods.changeClass($(this), o);
          });
          methods.writePageNumbering(o, pages);
        });
      });
    },

    changeClass: function(page, o) {
      if ($(o.currentPage).val() == page.attr('data-page')) {
        if (typeof o.images == 'undefined' || o.images == '') {
          $(o.navigationContainer).find('.page.active').each(function() {
            $(this).attr('class', 'page');
          });

          $(o.navigationContainer).find('li.active').each(function() {
            $(this).attr('class', '');
          });

          page.attr('class', 'page active');
          page.parent().attr('class', 'active');
        } else {
          $(o.navigationContainer).find('.page.active').each(function() {
            $(this).attr('class', 'page theImage');
          });

          page.attr('class', 'page theImage active');
        }
      }
    },

    goToPage: function(page, container, o) {
      var showPerPage = parseInt($(o.showPerPage).val());
      var startFrom = page * showPerPage;
      var endOn = startFrom + showPerPage;

      $(container).find(o.items).attr('style', 'display: none').slice(startFrom, endOn).attr('style', 'display: block');
      $(o.currentPage).val(page);
    },

    goPrev: function(container, o, pages) {
      var navPage = parseInt($(o.currentPage).val()) - 1;
      if (navPage >= 0)
        methods.goToPage(navPage, container, o);
    },

    goNext: function(container, o, pages) {
      var navPage = parseInt($(o.currentPage).val()) + 1;
      if (navPage < pages)
        methods.goToPage(navPage, container, o);
    },

    writePageNumbering: function(o, pages) {
      if (o.showPages !== 'false') {
        if (typeof o.pagesContainer != 'undefined') {
          $(o.pagesContainer).html('<span class="pagination pagesCurrent">' + parseInt(parseInt($(o.currentPage).val()) + 1) + '</span>' + '/' + pages);
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
