$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 20
        }, 1000);
        event.preventDefault();
    });

    // slick slider for about section
    $('.slick-about').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });

    // $(function () {
    //     // Initialize partner logos slider
    //     $('.partner-logos-slider').slick({
    //         slidesToShow: 4,  // Number of logos to show at once
    //         slidesToScroll: 1,  // Number of logos to scroll at a time
    //         autoplay: true,
    //         autoplaySpeed: 2000,
    //         dots: false,
    //         arrows: true,
    //         pauseOnHover: false,
    //         infinite: true,  // Enables infinite looping
    //         responsive: [
    //             {
    //                 breakpoint: 768,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 576,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });
    // });
    
    $('.partner-logos-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        pauseOnHover: false,
        infinite: true,
        variableWidth: true // Adjusts to the width of each slide
    });
    
    
    

    //toggle scroll menu
    var scrollTop = 0;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll > 80) {
            if (scroll > scrollTop) {
                $('.smart-scroll').addClass('scrolling').removeClass('up');
            } else {
                $('.smart-scroll').addClass('up');
            }
        } else {
            // remove if scroll = scrollTop
            $('.smart-scroll').removeClass('scrolling').removeClass('up');
        }

        scrollTop = scroll;

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    /**Theme switcher - DEMO PURPOSE ONLY */
    $('.switcher-trigger').click(function () {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function () {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });

    $('#contact').on('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Disable the button and change text to 'Sending...'
            var $submitButton = $('button[type="submit"]');
            $submitButton.prop('disabled', true).text('Sending...');
            
            // Gather form data
            var formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            };
            console.log(formData);
            // Send AJAX POST request
            $.ajax({
                type: 'POST',
                url: './send_email.php', // PHP file that handles the mail
                data: formData,
                success: function(response) {
                    // Show success or error message
                    $('#responseMessage').html('<div class="alert alert-success" role="alert">' + response + '</div>');
                    // Clear the form fields after successful submission
                    $('#name').val(''),
                    $('#email').val(''),
                    $('#message').val('')
                    $submitButton.prop('disabled', false).text('Senden');
                        // Hide the message after 5 seconds (5000 milliseconds)
                    setTimeout(function() {
                        $('#responseMessage').fadeOut('slow'); // Hides the message with a fade effect
                    }, 5000);
                },
                error: function() {
                    // Show a generic error message
                    $('#responseMessage').html('<div class="alert alert-danger" role="alert">There was an error sending the message. Please try again later.</div>');
                    // Hide the message after 5 seconds (5000 milliseconds)
                    $submitButton.prop('disabled', false).text('Senden');

                    setTimeout(function() {
                        $('#responseMessage').fadeOut('slow'); // Hides the message with a fade effect
                    }, 5000);
                }
            });
    });
});
