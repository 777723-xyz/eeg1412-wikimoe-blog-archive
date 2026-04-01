// JavaScript Document
$(document).ready(function () {
    var wh=$(window).height();
        $(window).scroll(function(){
            var s=$(window).scrollTop();
            if(s>0){
            $(".niaoduo_common_header").addClass("type_fix");
			if($(".niaoduo_common_header").hasClass('type_opacity')==false &&$(".niaoduo_common_header").hasClass('type_opacity_cache')==false){
				$('body').css('marginTop','94px');
			}
			if($(".niaoduo_common_header").hasClass('type_opacity')){
			   $(".niaoduo_common_header").removeClass("type_opacity");
			   $(".niaoduo_common_header").addClass("type_opacity_cache");
			}
            }
            else{
            $(".niaoduo_common_header").removeClass("type_fix");
			if($(".niaoduo_common_header").hasClass('type_opacity')==false &&$(".niaoduo_common_header").hasClass('type_opacity_cache')==false){
				$('body').css('marginTop','0px');
			}
			if($(".niaoduo_common_header").hasClass('type_opacity_cache')){
			   $(".niaoduo_common_header").removeClass("type_opacity_cache");
			   $(".niaoduo_common_header").addClass("type_opacity");
			}
            }
    });
});