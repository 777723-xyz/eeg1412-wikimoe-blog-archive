// JavaScript Document
$(document).ready(function () {
	$('.hot_susume_item_list_box_b .hot_susume_item_box:last-child').find('.hot_item_name_price_box').addClass('item_no_border')
	$('.hot_susume_item_list_box_b .hot_susume_item_box:last-child').find('.hot_susume_yellow_line').css('width','239')
	$('.hot_susume_item_list_box_c .hot_susume_item_box:nth-child(5n) ').find('.hot_item_name_price_box').addClass('item_no_border');
	$('.hot_susume_item_list_box_c .hot_susume_item_box:nth-child(5n) ').find('.hot_susume_yellow_line').css('width','239')
	
	$('.hot_susume_item_box').mouseenter(function(){
		$(this).find('.hot_susume_yellow_line').show()
	})
	$('.hot_susume_item_box').mouseleave(function(){
		$(this).find('.hot_susume_yellow_line').hide()
	})	
});