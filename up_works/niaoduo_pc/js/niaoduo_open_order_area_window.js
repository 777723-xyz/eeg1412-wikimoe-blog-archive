// JavaScript Document
function area_window(){
	var w =$(window).width();
	var h = $(window).height();
	var window_w = 725;
	var window_h = 621;
	$('.niaoduo_order_window_body').css('left',(w-window_w)/2);
	$('.niaoduo_order_window_body').css('top',(h-window_h)/2);
}
$(document).ready(function(e) {
    area_window();
	$('.niaoduo_add').click(function(){
		$('.niaoduo_order_window_body').show();
		$('.naioduo_order_black_bg').show();
		$('body').css('overflow','hidden');
	});
	$('.niaoduo_order_window_btn.type_close').click(function(){
		$('.niaoduo_order_window_body').hide();
		$('.naioduo_order_black_bg').hide();
		$('body').css('overflow','auto');
	});
});
$(window).resize(function(){
	area_window();
});