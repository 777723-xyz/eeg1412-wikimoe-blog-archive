// JavaScript Document
//置顶导航
$(window).scroll(function(){
	sorll_check();
});
function sorll_check(){
	var w_h = $(window).height();
	var w_w = $(window).width();
            var s=$(window).scrollTop();
            if(s>0){
            $("#top_nav").addClass("active");
            }
            else{
            $("#top_nav").removeClass("active");
            }
			if(w_w>=720){
			$('#f0').css('backgroundPosition','center '+s+'px');
			}
			var f1 = $('#f1').offset().top;
			var f2 = $('#f2').offset().top;
			var f3 = $('#f3').offset().top;
			var f4 = $('#f4').offset().top;
			var f5 = $('#f5').offset().top;
			var f6 = $('#f6').offset().top;
			
			if(f1>s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="0"]').addClass('active');
			}
			if(f1<=s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="1"]').addClass('active');
			}
			if(f3<=s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="3"]').addClass('active');
			}
			if(f4<=s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="4"]').addClass('active');
			}
			if(f5<=s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="5"]').addClass('active');
			}
			if(f6<=s+118){
				$('.sr_index_top_nav_li a').removeClass('active');
				$('.sr_index_top_nav_li a[data-page="6"]').addClass('active');
			}
			

			if(f1<s+w_h){
			$('#f1').addClass('animated fadeInUp');
			
			};
			if(f2<s+w_h){
			$('#f2').addClass('animated fadeIn').find('.sr_index_mid_banner_text_l').addClass('animated fadeInLeft');
			$('#f2').find('.sr_index_mid_banner_text_r').addClass('animated fadeInRight');
			
			};
			if(f3<s+w_h){
			$('#f3').addClass('animated fadeInUp').find('.sr_index_f3_item_box').addClass('animated bounceIn');
			
			};
			if(f4<s+w_h){
			$('#f4').addClass('animated fadeIn');
			
			};
			if(f5<s+w_h){
			$('#f5').addClass('animated fadeIn');
			
			};
}
$('.sr_index_top_nav_li a').click(function(){
	var this_page = $(this).attr('data-page');
	$('html, body').animate({scrollTop: $('#f'+this_page +'').offset().top-118}, 300);
});
$(document).ready(function(e) {
	
	 $('#f1,#f2,#f3,#f4,#f5').addClass('opacity_0'); 
	
	sorll_check();
	
   var mySwiper = new Swiper ('.sr_index_f4_list_pc_box', {
    slidesPerView : 4,
    
    // 如果需要前进后退按钮
    nextButton: '.sr_index_f4_list_turn_right',
    prevButton: '.sr_index_f4_list_turn_left',

    });
	
    var mySwiper = new Swiper ('.sr_index_f4_list_mobile_box', {
    slidesPerView : 1,
    

    }); 
	
	var mySwiper = new Swiper ('.sr_index_job_list_body', {
    slidesPerView : 1,
	pagination : '.sr_job_list_page',
   paginationClickable :true, 

    }); 
	 

});
$('#open_mobile_nav').click(function(){
	$('.sr_mobile_nav_part').removeClass('animated fadeOut');
	$('.sr_mobile_nav_part').show();
	$('.sr_index_mobile_nav_ul').addClass('animated fadeInRight');
	$('.sr_index_mobile_nav_ul').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.sr_index_mobile_nav_ul').removeClass('animated fadeInRight');
	});
});
$('#close_mobile_nav').click(function(){
	$('.sr_mobile_nav_part').hide();
});
$('.sr_mobile_nav_part').click(function(){
	$('.sr_mobile_nav_part').hide();
});