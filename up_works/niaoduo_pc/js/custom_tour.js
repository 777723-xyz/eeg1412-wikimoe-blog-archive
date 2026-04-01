// JavaScript Document
$(document).ready(function () {
	$('.niaoduo_cut_left_down_sel_radio').click(function(){
		$('.niaoduo_cut_left_down_sel_radio').parent().removeClass('active');
		for(i=0;i<$('.niaoduo_cut_left_down_sel_radio').length;i++){
			if($('.niaoduo_cut_left_down_sel_radio').eq(i).is(':checked')){
				$('.niaoduo_cut_left_down_sel_radio').eq(i).parent().addClass('active');
			}
		}
	});
	
	$('.niaoduo_go_city_sel_li').mouseenter(function(){
		var nums = $(this).index();
		$('.niaoduo_go_city_sel_sj').hide();
		$('.niaoduo_go_city_sel_sj').eq(nums).show();
		$('.niaoduo_go_city_sel_nr_ul').hide();
		$('.niaoduo_go_city_sel_nr_ul').eq(nums).show();
	});
	$('.niaoduo_go_city_sel_li').eq(0).mouseenter();
	$('.niaoduo_go_city_sel_nr_li').click(function(){
		$('.niaoduo_go_city_sel_nr_li').removeClass('active');
		$(this).addClass('active');
	});
});