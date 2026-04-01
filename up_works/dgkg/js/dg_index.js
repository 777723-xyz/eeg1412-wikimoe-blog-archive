// JavaScript Document
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
			var f0 = $('#f0').offset().top;
			var f1 = $('#f1').offset().top;
			var f2 = $('#f2').offset().top;
			var f3 = $('#f3').offset().top;
			var f4 = $('#f4').offset().top;
			if(f0>s){
				$('.dg_index_top_nav_li a').removeClass('active');
				$('.dg_index_top_nav_li a[data-page="0"]').addClass('active');
			}
			if(f1<=s+100){
				$('.dg_index_top_nav_li a').removeClass('active');
				$('.dg_index_top_nav_li a[data-page="1"]').addClass('active');
			}
			if(f2<=s+138){
				$('.dg_index_top_nav_li a').removeClass('active');
				$('.dg_index_top_nav_li a[data-page="2"]').addClass('active');
			}
			if(f3<=s+138){
				$('.dg_index_top_nav_li a').removeClass('active');
				$('.dg_index_top_nav_li a[data-page="3"]').addClass('active');
			}
			if(f4<=s+208){
				$('.dg_index_top_nav_li a').removeClass('active');
				$('.dg_index_top_nav_li a[data-page="4"]').addClass('active');
			}
			
}
$('.dg_index_top_nav_li a').click(function(){
	var this_page = $(this).attr('data-page');
	var ww = $(window).width();
	if(ww>1200){
		$('html, body').animate({scrollTop: $('#f'+this_page +'').offset().top-100}, 300);
	}else{
	   $('html, body').animate({scrollTop: $('#f'+this_page +'').offset().top-75}, 300);
	}
});
function right_text_height(){
	var block_height = $('.dg_about_right_text_box').height();
	if(block_height>690){
		$('.dg_about_right_text_body').height(block_height);
	}else{
		$('.dg_about_right_text_body').height(690);
	}
}
$(document).ready(function() {
    right_text_height();
});
$(window).resize(function(){
	right_text_height();
});