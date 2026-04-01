// JavaScript Document
function right_tools(){
	var wh = $(window).height();
	var ww = $(window).width();
	$('.niaoduo_right_fix_tools_body').css('top',(wh-153)/2);
	if(ww>1250){
		$('.niaoduo_right_fix_tools_body').css('right',(ww-1250)/4);
		$('.niaoduo_right_fix_tools_body').show();
		if($('#niaoduo_index_banner_body').hasClass('niaoduo_index_banner')){
			$('.niaoduo_right_fix_tools_body').hide();
		}
	}
	else{
		$('.niaoduo_right_fix_tools_body').hide();
	}
}
$(document).ready(function () {
	right_tools();
	if($('#niaoduo_index_banner_body').hasClass('niaoduo_index_banner')){
		 $(window).scroll(function(){
            var s=$(window).scrollTop();
            if(s<1596){
				$('.niaoduo_right_fix_tools_body').hide();
				
		    }
			else{
				if($(window).width()>1250){
				   $('.niaoduo_right_fix_tools_body').show();
				}
			}
			
		 });
	    }
	$('#niaoduo_go_top').click(function(){
		$('body,html').animate({scrollTop: 0},500);
	});
	$('#niaoduo_go_top').css('borderBottom','0px')
});
$(window).resize(function(){
	right_tools();
});