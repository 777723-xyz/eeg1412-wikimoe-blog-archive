// JavaScript Document
$(document).ready(function () {
	$('.niaoduo_item_tab_change_li').click(function(){
		var nums = $(this).index();
		$('.niaoduo_item_tab_change_li').removeClass('active');
		$(this).addClass('active');
		$('.niaoduo_item_down_left_item_box').removeClass('active');
		$('.niaoduo_item_down_left_item_box').eq(nums).addClass('active');
	});
	$('.niaoduo_item_shop_pj_li').last().css('borderBottom','0px')
	
});