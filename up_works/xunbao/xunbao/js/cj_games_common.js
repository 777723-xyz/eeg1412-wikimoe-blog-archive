// JavaScript Document
function reset_bg(){
	var ww = $(window).width();
	var wh = $(window).height();
	$('.cj_game_common_bg').height(wh).width(ww);
}
$(document).ready(function() {
    reset_bg();
});
$(window).resize(function(){
	reset_bg();
});