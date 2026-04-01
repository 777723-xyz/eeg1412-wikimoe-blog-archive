
$(document).ready(function() {
	// 定义宽高
	check_window();
	// 初始化swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical'
    }); 
	$('.ymm_event_3btn_box.type_1').click(function(){
      swiper.slideTo(1, 500, false);
    });
    $('.ymm_event_3btn_box.type_2').click(function(){
      swiper.slideTo(2, 500, false);
    });
    $('.ymm_event_3btn_box.type_3').click(function(){
      swiper.slideTo(3, 500, false);
    });
});
$(window).resize(function(){
	check_window();
});
function check_window(){
	var ww=$(window).width();
	var wh=$(window).height();
	if(ww>720){
		ww=720;
	}
	$('.ymm_event_page_body').height(wh);
	$('.ymm_event_page_body').width(ww);
	$('.swiper-container').height(wh);
	$('.swiper-container').width(ww);
	$('.ymm_event_index1_bg').css('top',wh*0.3-32+'px')
}
