// JavaScript Document
function niaoduo_area_scroll_set(){
	var scroll_width = $(window).width();
	if(scroll_width>1920){
		var scroll_width = 1920;
	}
	else if(scroll_width<=1200){
		var scroll_width = 1200;
	}
	var area_sroll_nums = $('.niaoduo_slide').length;
	if(area_sroll_nums==1){
		for(i=0;i<3;i++){
			$('.niaoduo_area_enter_scroll_ul').append($('.niaoduo_area_enter_scroll_ul').html());
		}
		var area_sroll_nums = $('.niaoduo_slide').length;
	}
	else if(area_sroll_nums==3){
		for(i=0;i<1;i++){
			$('.niaoduo_area_enter_scroll_ul').append($('.niaoduo_area_enter_scroll_ul').html());
		}
		var area_sroll_nums = $('.niaoduo_slide').length;
	}
	var pic_copy = Math.ceil(scroll_width/(area_sroll_nums*642));
	var pic_html = $('.niaoduo_area_enter_scroll_ul').html();
	var area_sroll_nums = ($('.niaoduo_slide').length)*pic_copy;
	if($('.niaoduo_slide').length%2==0){
		var area_sroll_nums = ($('.niaoduo_slide').length)*pic_copy+1;
		var even_nums = true;
	}
	$('.niaoduo_area_enter_scroll_ul').css('width',642*area_sroll_nums);
	$('.niaoduo_area_enter_scroll_ul').css('marginLeft',(scroll_width-642*area_sroll_nums)/2);
	for(i=0;i<pic_copy-1;i++){
	   $('.niaoduo_area_enter_scroll_ul').append(pic_html);
	}
	
	
	
	marginleft_nums = $('.niaoduo_area_enter_scroll_ul').css('marginLeft');
	
	$('#niaoduo_area_enter_scroll_next').click(function(){
		$('.niaoduo_area_enter_scroll_ul').stop(true, true).animate({marginLeft: '+=642px'},200,function(){
			$('.niaoduo_area_enter_scroll_ul').prepend($('.niaoduo_area_enter_scroll_ul li:last').prop('outerHTML'));
			$('.niaoduo_area_enter_scroll_ul').find('li').last().remove();
			$('.niaoduo_area_enter_scroll_ul').css('marginLeft',marginleft_nums);
			});
	});
	$('#niaoduo_area_enter_scroll_pre').click(function(){
		$('.niaoduo_area_enter_scroll_ul').stop(true, true).animate({marginLeft: '-=642px'},200,function(){
			$('.niaoduo_area_enter_scroll_ul').append($('.niaoduo_area_enter_scroll_ul li:first').prop('outerHTML'));
			$('.niaoduo_area_enter_scroll_ul').find('li').first().remove();
			$('.niaoduo_area_enter_scroll_ul').css('marginLeft',marginleft_nums);
			});
	});
	$('.niaoduo_area_enter_scroll_body').mouseenter(function(){
		$('.niaoduo_area_enter_scroll_pre,.niaoduo_area_enter_scroll_next').show();
	});
	$('.niaoduo_area_enter_scroll_body').mouseleave(function(){
		$('.niaoduo_area_enter_scroll_pre,.niaoduo_area_enter_scroll_next').hide();
	});
}
function re_area(){
	var scroll_width = $(window).width();
	if(scroll_width>1920){
		var scroll_width = 1920;
	}
	else if(scroll_width<=1200){
		var scroll_width = 1200;
	}
	var area_sroll_nums = $('.niaoduo_slide').length;
	var pic_copy = Math.ceil(scroll_width/(area_sroll_nums*642));
	var pic_html = $('.niaoduo_area_enter_scroll_ul').html();
	var area_sroll_nums = ($('.niaoduo_slide').length)*pic_copy;
	if($('.niaoduo_slide').length%2==0){
		var area_sroll_nums = ($('.niaoduo_slide').length)*pic_copy+1;
		var even_nums = true;
	}
	$('.niaoduo_area_enter_scroll_ul').css('width',642*area_sroll_nums);
	$('.niaoduo_area_enter_scroll_ul').css('marginLeft',(scroll_width-642*area_sroll_nums)/2);
	marginleft_nums = $('.niaoduo_area_enter_scroll_ul').css('marginLeft');
}