// JavaScript Document
function changerem(){
	var ww = $(window).width();
	if(ww>=750){
		$('html').css('fontSize','100px');
	}else{
	   var size = ww/750*100;
	   $('html').css('fontSize',size);
	}
}
$(document).ready(function() {
    changerem();
});
$(window).resize(function(){
	changerem();
});