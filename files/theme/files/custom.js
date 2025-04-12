jQuery(function($) {


// Blog Pagination
  var url = window.location.href;
  var urlSplit = url.split('/').slice(0,4).join('/');
  var indexCheck = $(".wsite-blog-index").length;
  
  if (indexCheck == 1) {
    if (url.indexOf("category") < 0 && url.indexOf("archives") < 0) {
  $(".pagination a").css("display", "flex");
  // "First" page
      $(".firstPage").attr("href", urlSplit);
      // Current Page 
      $(".currentPage").attr("href", url);
  if (url.indexOf("previous") < 0) {
        $(".currentPage").text("1");
    $(".previousPage, .previousPagePlus, .firstPage").hide();
      } else {
    var currentPageNumber = (url.split("/")[5]);
    $(".currentPage").text(currentPageNumber);
  }
  // Next Page
      var nextPageCheck = $(".blog-page-nav-previous a").length;
      if (nextPageCheck == 1) {
        var nextPage = $(".blog-page-nav-previous a").attr('href');
        $(".nextPage").attr("href", nextPage);
    var nextPageNumber = (nextPage.split("/")[3]);
        $(".nextPage").text(nextPageNumber);
      } else {
        $(".nextPage, .lastPage").hide();
      }
  // Next Page Plus
      $.get(nextPage, function(data){
        var nextPagePlusCheck = $(data).find(".blog-page-nav-previous a").length; 
    if (nextPagePlusCheck == 1) {
      var nextPagePlus = $(data).find(".blog-page-nav-previous a").attr('href');
      $(".nextPagePlus").attr("href", nextPagePlus);
      var nextPagePlusNumber = (nextPagePlus.split("/")[3]);
          $(".nextPagePlus").text(nextPagePlusNumber);
    } else {
      $(".nextPagePlus").hide();
    }
      });
  // Previous Page
      var previousPageCheck = $(".blog-page-nav-next a").length;
      if (previousPageCheck == 1) {
    var previousPage = $(".blog-page-nav-next a").attr('href');
        $(".previousPage").attr("href", previousPage);
    var previousPageNumber = (previousPage.split("/")[3]);
        $(".previousPage").text(previousPageNumber);
    if (previousPage.indexOf("previous") < 0) {
      $(".previousPage").text("1");
      $(".previousPagePlus").hide();
    }
      }
  // Previous Page Plus
      $.get(previousPage, function(data){
        var previousPagePlusCheck = $(data).find(".blog-page-nav-next a").length;
    if (previousPagePlusCheck == 1) {
      var previousPagePlus = $(data).find(".blog-page-nav-next a").attr('href');
      $(".previousPagePlus").attr("href", previousPagePlus);
      var previousPagePlusNumber = (previousPagePlus.split("/")[3]);
          $(".previousPagePlus").text(previousPagePlusNumber);
  if (previousPagePlus.indexOf("previous") < 0) {
        $(".previousPagePlus").text("1");
      }
}
      });
} 
else {
  $(".blog-page-nav-next a, .blog-page-nav-previous a").addClass("show");
    }
  }
  // Total Blog Page Counter
  $.get(urlSplit, function(data) {
    var a = $(data).find(".blog-page-nav-previous").length;
    var b = $(data).find(".blog-page-nav-previous a").attr("href");
    function getMore() {
      if (a == 1) {
        $.get(b, function(data) {
      var c = $(data).find(".blog-page-nav-previous a").length;
      var d = $(data).find(".blog-page-nav-previous a").attr("href");
      if (a == c) {
            b = d;
    getMore();
      } 
  else {
    var e = b.split("/")[3];
$(".totalPages").append(e);
// Last Page pagination
            var indexCheck = $(".wsite-page-index.wsite-blog-index").length;
if (indexCheck == 1) {
  var nextPageCheck = $(".blog-page-nav-previous a").length;
      if (nextPageCheck == 1) {
        var urlSplitMore = url.split('/').slice(0,3).join('/');
var nextPage = $(".blog-page-nav-previous a").attr("href");
var nextPageStrip = nextPage.split('/').slice(0,2).join('/');
var lastPage = urlSplitMore + nextPageStrip + "/previous/" + e;
$(".lastPage").attr("href", lastPage);
  }
}
else {
  var lastPage = urlSplit + "/previous/" + e;
  $(".lastPage").attr("href", lastPage);
}   
  }
    });
      }
  else if (a != 1) {
    $(".totalPages").append(1);
  }
    }
    getMore();
  });

    // Fixed nav
    $.fn.checkHeaderPositioning = function(scrollEl, scrollClass) {
        var $me = $(this);

        if (!$me.length) {
          return;
        }

        if($(scrollEl).scrollTop() > 50) {
            $me.addClass(scrollClass);
        } else if($(scrollEl).scrollTop() === 0) {
            $me.removeClass(scrollClass);
        }
    };

  // Mobile sidebars
  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;

    $me.on('click', function() {
      if(!$me.hasClass(expandedClass)) {
        $me.addClass(expandedClass);
      } else {
        $me.removeClass(expandedClass);
      }
    });
  }

  // Interval loop
  $.fn.intervalLoop = function(condition, action, duration, limit) {
    var counter = 0;
    var looper = setInterval(function(){
      if (counter >= limit || $.fn.checkIfElementExists(condition)) {
        clearInterval(looper);
      } else {
        action();
        counter++;
      }
    }, duration);
  }

  // Check if element exists
  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  var birdseyeController = {
    init: function(opts) {
      var base = this;

      $('body').checkHeaderPositioning(window, 'affix');

      // Add classes to elements
      base._addClasses();

      if(!$('body').hasClass('wsite-editor') && $('#wsite-nav-cart-a').length) {
        $('#wsite-nav-cart-a').html($('#wsite-nav-cart-a').html().replace(/[()]/g, ''));
      }

      setTimeout(function(){
        base._checkCartItems();
        base._attachEvents();
        if($('#wsite-nav-cart-a').length) {
          $('#wsite-nav-cart-a').html($('#wsite-nav-cart-a').html().replace(/[()]/g, ''));
        }
        $('.banner-wrap .container').css("padding-top", $('.birdseye-header').outerHeight() + "px");
      }, 1500);
    },

    _addClasses: function() {
      var base = this;

      // Add fade in class to nav + logo + banner
        $('body').addClass('fade-in');

      // Add class to nav items with subnav
      $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
        }
      });

      // Add class to subnav items with subnav
      $('.wsite-menu').find('li.wsite-menu-subitem-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-subitem'));
        }
      });

        // Keep subnav open if submenu item is active
        if ($(window).width() < 1024) {
          $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');
        }

      // Add placeholder text to inputs
      setTimeout(function(){
        $('.wsite-form-sublabel').each(function(){
            var sublabel = $(this).text();
            $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
          });
        }, 1000);
    },

    _checkCartItems: function() {
      var base = this;
      if($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
        $('body').addClass('cart-full');
      } else {
        $('body').removeClass('cart-full');
      }
    },

    _moveLogin: function() {
      var login = $('#member-login').clone(true);
      $('.mobile-nav .wsite-menu-default > li:last-child').after(login);
    },

    _moveFlyout: function() {
      var maxheight = $(window).height() - $('.birdseye-header').outerHeight();
      var anchor = true;

      $('#wsite-menus .wsite-menu-wrap').each(function() {
        if ($(this).outerHeight() > maxheight) {
          anchor = false;
        }
      });

      if (anchor) {
        var move = $("#wsite-menus").detach();
        $(".birdseye-header").append(move);
      }
    },

    _moveCart: function() {
      var move = $("#wsite-mini-cart").detach();
      $(".birdseye-header").append(move);
    },

    _attachEvents: function() {
      var base = this;

        $('.hamburger').on('click', function(e) {
            e.preventDefault();
            if (!$('body').hasClass('nav-open')) {
                $('body').addClass('nav-open');
            } else {
                $('body').removeClass('nav-open');
            }
        });

        // Move cart + login
        $.fn.intervalLoop('.mobile-nav #member-login', base._moveLogin, 800, 5);

        // Move Flyout
        $.fn.intervalLoop('.birdseye-header #wsite-menus', base._moveFlyout, 300, 8);

        // Move Cart
        $.fn.intervalLoop('.birdseye-header #wsite-mini-cart', base._moveCart, 300, 8);

        // Check Cart

        $.fn.intervalLoop('body.cart-full', base._checkCartItems, 300, 10);

        // Window scroll

        // Fixed header
        $(window).on('scroll', function() {
          $('body').checkHeaderPositioning(window, 'affix');
        });

        // Subnav toggle
        $('li.has-submenu span.icon-caret').on('click', function() {
            var $me = $(this);

            if($me.siblings('.wsite-menu-wrap').hasClass('open')) {
                $me.siblings('.wsite-menu-wrap').removeClass('open');
            } else {
                $me.siblings('.wsite-menu-wrap').addClass('open');
            }
        });

      // Store category dropdown
      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

      // Search filters dropdown
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

      // Init fancybox swipe on mobile
      if ('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }
    },

    _initSwipeGallery: function() {
      var base = this;

      setTimeout(function(){
        var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          base._initSwipeGallery();
        });
      }, 500);
    }
  }

  $(document).ready(function(){
    birdseyeController.init();
  });
});