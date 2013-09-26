(function($) {
  var methods = {
    init: function(options) {
      var o = $.extend({
        mode                : '',
        itemsPerPage        : 3,
        items               : 'div.item',
        navigationItem      : '',
        navigationContainer : '.navigation',
        pagesContainer      : '',
        showPages           : true,
        currentPage         : '',
        showPerPage         : '',
        nextPage            : '',
        prevPage            : '',
        images              : '',
        imagePath           : '/gallery_images/',
        imgWidth            : 100,
        imgHeight           : 100
      }, options);

      return this.each(function() {
        var page      = 0
          , item      = 0
          , items     = $(this).find(o.items)
          , pages     = Math.ceil(items.length / o.itemsPerPage)
          , container = $(this);

        if (typeof o.navigationHTML == 'undefined') o.navigationHTML = '';

        items.each(function() { $(this).attr('style', 'display: none'); });
        items.attr('style', 'display: none').slice(0, o.itemsPerPage).attr('style', 'display: block');
        $(o.currentPage).val(0);
        $(o.showPerPage).val(o.itemsPerPage);

        if (o.mode == 'bootstrap') o.navigationHTML += o.prevPage;

        // navigation html
        while (pages > page) {
          if (o.navigationItem == '' && o.images == '') {
            if (o.mode == 'bootstrap') {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML += '<li class="active">';
                o.navigationHTML += '<a href="javascript:;" class="page active" id="page" data-page="' + page + '">';
                o.navigationHTML += parseInt(page+1);
                o.navigationHTML += '</a></li>';
              } else {
                o.navigationHTML += '<li><a href="javascript:;" class="page" id="page" data-page="' + page + '">';
                o.navigationHTML += parseInt(page+1) + '</a></li>';
              }
            } else {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML += '<a href="javascript:;" class="page active" id="page" data-page="' + page + '">';
                o.navigationHTML += parseInt(page+1) + '</a>';
              } else {
                o.navigationHTML += '<a href="javascript:;" class="page" id="page" data-page="' + page + '">';
                o.navigationHTML += parseInt(page+1) + '</a>';
              }
            }
          }

          // @TODO: add the bootstrap. li.class here too
          if (typeof o.images != 'undefined') {
            if (o.images.length != 0) {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML += '<a href="javascript:;" id="page" class="page theImage active" data-page="' + page + '">';
                o.navigationHTML += '<img src="' + o.imagePath + o.images[page] + '" width="' + o.imgWidth + '" ';
                o.navigationHTML += 'height="' + o.imgHeight + '" alt="" /></a>';
              } else {
                o.navigationHTML += '<a href="javascript:;" id="page" class="page theImage" data-page="' + page + '">';
                o.navigationHTML += '<img src="' + o.imagePath + o.images[page] + '" width="' + o.imgWidth + '" ';
                o.navigationHTML += 'height="' + o.imgHeight + '" alt="" /></a>';
              }
            }
          }

          if (o.navigationItem != '') {
            if (o.mode == 'bootstrap') {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML += '<li class="active">';
                o.navigationHTML += '<a href="javascript:;" class="page active" id="page" data-page="' + page + '">';
                o.navigationHTML += o.navigationItem + '</a></li>';
              } else {
                o.navigationHTML += '<li><a href="javascript:;" class="page" id="page" data-page="' + page + '">';
                o.navigationHTML += o.navigationItem + '</a></li>';
              }
            } else {
              if ($(o.currentPage).val() == page) {
                o.navigationHTML += '<a href="javascript:;" class="page active" id="page" data-page="' + page + '">';
                o.navigationHTML += o.navigationItem + '</a>';
              } else {
                o.navigationHTML += '<a href="javascript:;" class="page" id="page" data-page="' + page + '">';
                o.navigationHTML += o.navigationItem + '</a>';
              }
            }
          }

          page++;
        }

        if (o.mode == 'bootstrap') o.navigationHTML += o.nextPage;
        methods.writePageNumbering(o, pages);
        if (page > 1) $(o.navigationContainer).html(o.navigationHTML);

        $(o.navigationContainer).find('.page').each(function(key, val) {
          $(val).on('click', function() {
            methods.goToPage($(this).attr('data-page'), container, o);
            methods.changeClass($(this), o);
          });
        });

        $('#' + $(o.nextPage).attr('id')).on('click', function() {
          methods.goNext(container, o, pages);
          $(o.navigationContainer).find('.page').each(function(key, val) { methods.changeClass($(this), o); });
          methods.writePageNumbering(o, pages);
        });

        $('#' + $(o.prevPage).attr('id')).on('click', function() {
          methods.goPrev(container, o, pages);
          $(o.navigationContainer).find('.page').each(function(key, val) { methods.changeClass($(this), o); });
          methods.writePageNumbering(o, pages);
        });
      });
    },

    changeClass: function(page, o) {
      if ($(o.currentPage).val() == page.attr('data-page')) {
        if (typeof o.images == 'undefined' || o.images == '') {
          $(o.navigationContainer).find('.page.active').each(function() { $(this).attr('class', 'page'); });
          $(o.navigationContainer).find('li.active').each(function() { $(this).attr('class', ''); });

          page.attr('class', 'page active');
          if (page.parent().get(0).tagName == 'LI') page.parent().attr('class', 'active');
        } else {
          // @TODO: add the bootstrap li.class here too
          $(o.navigationContainer).find('.page.active').each(function() { $(this).attr('class', 'page theImage'); });
          page.attr('class', 'page theImage active');
        }
      }
    },

    goToPage: function(page, container, o) {
      var showPerPage = parseInt($(o.showPerPage).val())
        , startFrom   = page * showPerPage
        , endOn       = startFrom + showPerPage;

      $(container).find(o.items).attr('style', 'display: none').slice(startFrom, endOn).attr('style', 'display: block');
      $(o.currentPage).val(page);
    },

    goPrev: function(container, o, pages) {
      var navPage = parseInt($(o.currentPage).val()) - 1;
      if (navPage >= 0) methods.goToPage(navPage, container, o);
    },

    goNext: function(container, o, pages) {
      var navPage = parseInt($(o.currentPage).val()) + 1;
      if (navPage < pages) methods.goToPage(navPage, container, o);
    },

    writePageNumbering: function(o, pages) {
      if (o.showPages !== 'false')
        if (typeof o.pagesContainer != 'undefined')
          $(o.pagesContainer).html(
            '<span class="pagination pagesCurrent">'
            + parseInt(parseInt($(o.currentPage).val()) + 1)
            + '</span>' + '/' + pages
          );
    }
  };

  $.fn.pagination = function(method) {
    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
    else $.error('Method ' +  method + ' does not exist on jQuery.pagination');
  }
})(jQuery);
