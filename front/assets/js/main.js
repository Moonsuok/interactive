$(document).ready(function(){
  $(window).on('scroll', function () {
		
		var moveTopScroll = $(window).scrollTop();

        console.log(moveTopScroll);

		if (moveTopScroll > 80 ) {
			$('#header').addClass('on');
		} else {
			$('#header').removeClass('on');
		}
	});

});