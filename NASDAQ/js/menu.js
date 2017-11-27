$(function () {
  $(window).on("resize", function () {
  });

  $(document).ready(function () {
    // code for main menu children click and hover event
    menuChildren();

    //  code active class on menu item
    if ($(window).width() < 1200) {
      $('.navbar-toggle').on('click', function (e) {
        setTimeout(function () {
          var url = window.location.href;
          $('.navbar a').each(function () {
            if (this.href == url)
            {
              $(this).closest('ul.dropdown-menu').parent('li.dropdown').addClass('open')

            }
          })
        }, "50");
      });
    }
    var url = window.location.href
    $('.navbar a').each(function () {
      if (this.href == url)
      {
        $(this).addClass('is-active');
        $(this).closest('ul.dropdown-menu').parent('li.dropdown').addClass('active');

      }
    })

    // carousel js code
    $('.carousel-showmanymoveone .item').each(function () {
      var itemToClone = $(this);

      for (var i = 1; i < 4; i++) {
        itemToClone = itemToClone.next();

        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-" + (i))
          .appendTo($(this));
      }
    });

  });

//Carousel
});

function menuChildren() {

  if ($(window).width() >= 1200) {
// shows sub menu when you click on a parent item
    $('.navbar-collapse ul.navbar-nav li.dropdown').on('click', function (e) {
      $('.subMenu').show();
      $(this).children('ul.dropdown-menu').css('display', 'inline-block');
//      e.preventDefault();
      if ($(this).hasClass('open')) {
        $('.subMenu').hide();
        $('.navbar-collapse ul.navbar-nav li.dropdown ul.dropdown-menu').css('display', 'none');
//        e.preventDefault();
      }
    });

// when you hover on a parent menu item hide submmenu for other
    $('.navbar-collapse ul.navbar-nav li.dropdown').on(' mouseenter', function (e) {
      $('.subMenu').show();
      $(this).children('ul.dropdown-menu').css('display', 'inline-block');
      $('.navbar-collapse ul.navbar-nav li.dropdown').not(this).children('ul.dropdown-menu').css('display', 'none');
      $('.navbar-collapse ul.navbar-nav li.dropdown').not(this).removeClass('open');

    });

// hide submenu for other parent items when you hover on a menu item
    $('.navbar-collapse ul.navbar-nav ').children('li').on(' mouseenter', function (e) {
      if (!$(this).hasClass('dropdown')) {
        $('.subMenu').hide();
        $('.navbar-collapse ul.navbar-nav ul.dropdown-menu').css('display', 'none');
      }
    });

    // hide sub menu when you leave the navigation section
    $('.navbar .container').on('mouseleave', function () {
      if ($('.navbar-collapse ul.navbar-nav li.dropdown.open').length == 0)
      {
        $('.subMenu').hide();
        $('.navbar-collapse ul.navbar-nav ul.dropdown-menu').css('display', 'none');
      }
    });
    //  hide submenu when click outside of the navigation
    $('body').on('click', function (e) {
      if ($('.navbar .container').has(e.target).length > 0) { //
      } else {
        $('.subMenu').hide();
        $('.navbar-collapse ul.navbar-nav ul.dropdown-menu').css('display', 'none');
      }
    });
  }
}
