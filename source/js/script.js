
jQuery(function ($) {

//Play/Pause control clicked
	$(".video-btn").on("click", function () {
		var video = document.getElementById("video1");
		if (video.paused) {
			$('.video-btn').hide();
			video.play();
		} else {
			video.pause();
			$('.video-btn').show();
		}
	});


	//Main Navigation functionality
	$('a[href^="#"]:not([data-toggle])').on('click', function (e) {

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

});
