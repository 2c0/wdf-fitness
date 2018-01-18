// Global object
var global = {
    screenWidth: window.innerWidth
};
jQuery(window).resize(function () {
    global.screenWidth = window.innerWidth;
});

jQuery(function ($) { 

//hide the mobile menu NAV on click
    $(".navbar-nav li a").click(function () {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });
    
    //Main Navigation functionality
    $('a[href^="#"]').on('click', function (e) {

// Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            e.preventDefault();
            // Store hash
            var target = this.hash;
            var $target = $(target);
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').stop().animate({'scrollTop': $target.offset().top}, 900, 'swing', function () {
                window.location.hash = target;
            });
        }
    });

    //move to top smooth animation
    $('.move-top-btn').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });
});