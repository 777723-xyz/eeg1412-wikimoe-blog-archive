// JavaScript Document
function mudi(){
	for(i=0;i<$('.niaoduo_mudi_lv1_li').length;i++){
		if($('.niaoduo_mudi_lv1_li').eq(i).hasClass('active')){
			$('.niaoduo_mudi_lv2_ul').hide();
			$('.niaoduo_mudi_lv2_ul').eq(i).show();
		}
	}
}

$(document).ready(function () {
	mudi();
	$('.niaoduo_mudi_lv1_item_name a').click(function(){
	   $('.niaoduo_mudi_lv1_li.active').removeClass('active');
	   $(this).parent().parent().addClass('active');
	   mudi();
    });
	$('.niaoduo_list_sku_normal_ul').last().css('borderBottom','0px').css('marginBottom','0px');
	$('.niaoduo_shop_item_share_box').mouseenter(function(){
		$(this).find('.niaoduo_shop_item_share_nr').show();
	});
	$('.niaoduo_shop_item_share_nr').mouseenter(function(){
		$(this).show();
	});
	
	$('.niaoduo_shop_item_share_box').mouseleave(function(){
		$(this).find('.niaoduo_shop_item_share_nr').hide();
	});
	$('.niaoduo_shop_item_share_nr').mouseleave(function(){
		$(this).hide();
	});
	$('.niaoduo_shop_item_li:nth-child(3n)').css('marginRight','0px')
});
