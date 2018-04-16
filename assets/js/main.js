
(function($) {
    'use strict';

    /**
     * searchIcon
     * retinaLogo
     * responsiveMenu
     * responsiveVideos
     * featuredMedia
     * preLoader
     * scrollToTop
     **/

    var searchIcon = function() {
        $('.header-search-icon').on('click', function() {
            var searchForm = $(this).parent().find('.header-search-form'),
                searchField = $(this).parent().find('.header-search-field');

            searchForm.stop().fadeToggle(function() {
                searchField.focus();
            });

            return false;
        });
    };

    var retinaLogo = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
        var $logo = $('#site-logo img');
        var $logo_retina = $logo.data('retina');

        if (retina && $logo_retina) {
            $logo.attr({
                src: $logo.data('retina'),
                width: $logo.data('width'),
                height: $logo.data('height')
            });
        }
    };

    var responsiveMenu = function() {
        var menuType = 'desktop';
        $(window).on('load resize', function() {
            var mode = 'desktop';
            var $wrapMenu = $('#site-header-inner .wrap-inner');

            if (matchMedia('only screen and (max-width: 1240px)').matches)
                mode = 'mobile';

            if (mode != menuType) {
                menuType = mode;

                if (mode == 'mobile') {
                    $('#main-nav').attr('id', 'main-nav-mobi')
                        .appendTo('#site-header')
                        .hide()
                        .find('li:has(ul)')
                        .children('ul')
                        .removeAttr('style')
                        .hide()
                        .before('<span class="arrow"></span>');
                } else {
                    $('#main-nav-mobi').attr('id', 'main-nav')
                        .removeAttr('style')
                        .prependTo($wrapMenu)
                        .find('.sub-menu')
                        .removeAttr('style')
                        .prev().remove();
                    $('.mobile-button').removeClass('active');
                }
            }

        });

        $(document).on('click', '.mobile-button', function() {
            $(this).toggleClass('active');
            $('#main-nav-mobi').slideToggle();
        })

        $(document).on('click', '#main-nav-mobi .arrow', function() {
            $(this).toggleClass('active').next().slideToggle();
        })
    };

    var headerFixed = function() {
        if ($('body').hasClass('header-fixed')) {
            var nav = $('#site-header');


            if (nav.length) {
                var offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $('<div />', {
                        height: headerHeight
                    }).insertAfter(nav);

                $(window).on('load scroll', function() {
                    if ($(window).scrollTop() > offsetTop) {
                        nav.addClass('is-fixed');
                        injectSpace.show();
                    } else {
                        nav.removeClass('is-fixed');
                        injectSpace.hide();
                    }
                })
            }
        }
    };

    var responsiveVideos = function() {
        if ($().fitVids) {
            $('.wprt-container').fitVids();
        }
    };

    var featuredMedia = function() {
        if ($().slick) {
            $('.blog-gallery').slick({
                dots: false,
                infinite: true,
                speed: 300,
                fade: true,
                cssEase: 'linear'
            });
        }
    };



    /////Validation

    $("form").validate({
        rules: {
            name: "required",
            phone: {
                required: true,
                minlength: 10,
                digits: true
            },
            /* email: {
                 required: true,
                 email: true
             }*/
        },
        messages: {
            name: "Please specify your name",
            phone: {
                required: "Please enter your phone number so that we can contact you",
                digits: "Please only enter digits within this field",
                minlength: "Please enter a minimum of 10 digits",
            },
            /*email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }*/
        }
    });

    //formspree

    var $contactForm = $('form');
    $contactForm.submit(function(e) {
        e.preventDefault();
        if ($("form").valid()) {
            $.ajax({
                url: 'https://formspree.io/lindsonbuildingservices@gmail.com',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                success: function(data) {
					
                    $('#successModal').modal('show');
                    setTimeout(function() {
                        $('#successModal').modal('hide');
                    }, 3000);
                },
                error: function(err) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
                }
            });
        }
    });



    var preLoader = function() {
        if ($().animsition) {
            $('.animsition').animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    'animation-duration'
                ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body',
                transition: function(url) { window.location.href = url; }
            });
        }
    };

    var scrollToTop = function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 800) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
            return false;
        });
    };

    // Dom ready
    $(function() {
        searchIcon();
        retinaLogo();
        responsiveMenu();
        headerFixed();
        responsiveVideos();
        featuredMedia();
        preLoader();
        scrollToTop();
    });
})(jQuery);