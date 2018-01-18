
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
});
