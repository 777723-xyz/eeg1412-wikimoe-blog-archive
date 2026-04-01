// JavaScript Document
function banner_height(){
	var wh= $(window).height();
	var ww = $(window).width();
	if(ww<=1200){
		$('.dg_index_top_banner').height(wh-75+'px');
	}else{
	   $('.dg_index_top_banner').height(wh-100+'px');
	}
}
$(document).ready(function() {
    banner_height();
});
$(window).resize(function(){
	banner_height();
});