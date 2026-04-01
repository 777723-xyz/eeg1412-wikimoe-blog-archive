// JavaScript Document
$(window).load(function () {
	//全部加载完后执行
	$('.sr_loading_body').fadeOut(250);

	var page_animated = true;
    var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
	simulateTouch : false,
	mousewheelControl : true,
	mousewheelReleaseOnEdges : true,
    
	
	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAnimate(swiper); //初始化完成开始动画
	console.log(swiper);
	$(".sr_anime[data-page="+swiper.activeIndex+"]").addClass('sr_animed');
	$('.sr_nav').addClass('fadeIn animated').css({
		    'visibility': 'visible',
			'animation-duration': '1s',
			'-webkit-animation-duration': '1s',
			'animation-delay': '3.8s',
			'-webkit-animation-delay': '3.8s',
  	});
  	}, 
	onSlideChangeStart: function(swiper){
		mySwiper.disableMousewheelControl();
		console.log('start');
		page_animated = false;
		var Index_nums = swiper.activeIndex;
		var flag = 1;
		$('.sr_rt_nav').fadeOut(200,function(){
			if(flag===1){
				$('.sr_rt_nav').removeClass('type_white');
				$('.sr_rt_quan_text').hide();
				$('.sr_rt_quan_text').eq(Index_nums-1).show();
			}
			flag = flag-1;
		});
		p1_bar_width();
		p2_bar_width();
      //alert(swiper.activeIndex);
    },
  	onSlideChangeEnd: function(swiper){ 
		page_animated = true;
		var Index_nums = swiper.activeIndex;
		setTimeout(function(){ mySwiper.enableMousewheelControl();},500);
		$('.sr_anime').removeClass('sr_animed');
		$(".sr_anime[data-page="+swiper.activeIndex+"]").addClass('sr_animed');
		if(swiper.activeIndex==1){
			nav_white_flag = true;
			var nav_white = setTimeout (function()
			{
				if(!nav_white_flag){
					clearTimeout(nav_white);
				}else{
					$('.sr_nav_li').eq(3).find('.sr_nav_subtitle').addClass('type_white');
					$('.sr_nav_li').eq(4).addClass('type_white');
					$('.sr_nav_li').eq(5).addClass('type_white');
					$('.sr_nav_li').eq(6).addClass('type_white');
					$('.sr_nav_li').eq(7).addClass('type_white');
				}
				console.log(nav_white);
			},2200);
		}else{
			nav_white_flag = false;
			$('.sr_nav_li').eq(3).find('.sr_nav_subtitle').removeClass('type_white');
			$('.sr_nav_li').eq(4).removeClass('type_white');
			$('.sr_nav_li').eq(5).removeClass('type_white');
			$('.sr_nav_li').eq(6).removeClass('type_white');
			$('.sr_nav_li').eq(7).removeClass('type_white');
		}
		if(swiper.activeIndex!==0){
			$('.sr_nav').removeClass('fadeIn animated');
		}
		if(Index_nums!=0){
			$('.sr_rt_nav').fadeIn(300);
			if(Index_nums==1){
				$('.sr_rt_nav').addClass('type_white');
			}
		}
		if(Index_nums!=2){
			$('.p3_sr_word_box').hide();
		}else{
			$('.p3_sr_word_box').show();
		}
		if(Index_nums!=3){
			$('#nest_canvas').hide();
		}else{
			$('#nest_canvas').show();
		}
		if(Index_nums==5){
			page6_anime();
		}else{
			page6_animeOut();
		}
		//alert(swiper.activeIndex);
    	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  	} 
  });
  $('.sr_change_page_btn').click(function(){
	  if(page_animated){
		  var cnums = parseInt($(this).attr('data-to'));
		  mySwiper.slideTo(cnums, 500, true);
	  }
  });
  $('.sr_rt_quan_point_body').mouseenter(function(){
	  $('.sr_rt_quan_point_body').stop(true, false).animate({width:"338px"});
  });
  $('.sr_rt_quan_point_body').mouseleave(function(){
	  $('.sr_rt_quan_point_body').stop(true, false).animate({width:"150px"});
  });
});
//第一页
function p1_bar_width(){
	var w_width = $(window).width();
	var w = (w_width-952)/2;
	if(w>=0){
		$('.p1_sr_bar').width(w);
		$('.p1_sr_effect.type_left').css('left',w+20-248);
		$('.p1_sr_effect.type_right').css('right',w+20-248);
	}else{
		$('.p1_sr_bar').width(0);
		$('.p1_sr_effect.type_left').css('left',0-248);
		$('.p1_sr_effect.type_right').css('right',0-248);
	}
}
//第二页
function p2_bar_width(){
	var w_width = $(window).width();
	var w = (w_width-1154)/2;
	if(w>=0){
		$('.p2_sr_bar').width(w);
		$('.p2_sr_icon.type_left').css('left',w-203);
		$('.p2_sr_icon.type_right').css('right',w-203);
	}else{
		$('.p2_sr_bar').width(0);
		$('.p2_sr_icon.type_left').css('left',0-203);
		$('.p2_sr_icon.type_right').css('right',0-203);
	}
}
$('.sr_swiper_box.ten_bg').mousemove(function(e) {
	var ww = $(window).width()/2;
	var wh = $(window).height()/2;
    var x = (e.pageX-ww) / 9.2, y = (e.pageY-wh) / 9.2;
	var x1 = (e.pageX-ww) / 12.2, y1 = (e.pageY-wh) / 12.2;
	var x2 = (e.pageX-ww) / 15.2, y2 = (e.pageY-wh) / 15.2;
    $(".sr_bg_mouseten.type_0").css('background-position', x1 + 'px ' + y1 + 'px');
	$(".sr_bg_mouseten.type_1").css('background-position', x + 'px ' + y + 'px');
	$(".sr_bg_mouseten.type_2").css('background-position', x2 + 'px ' + y2 + 'px');
});
//第六页
function page6_anime(){
	var word_nums = $('.p6_sr_word_item').length;
	for (var i=0;i<word_nums;i++){
		$('.p6_sr_word_item').eq(i).delay(200*i).animate({opacity: '1'}, 500);
	}
}
function page6_animeOut(){
	$('.p6_sr_word_item').stop().animate({opacity: '0'}, 50);
}
function text_size(){
	var size_pre = 0.474;
	var wh = $(window).height();
	if(wh<=600){
		wh=600;
	}
	var text_size = ((wh*size_pre)/512).toFixed(2);
	var text_top = wh*0.20-(512-(wh*size_pre))/1.5;
	if(wh*size_pre>=512){
		text_top = wh*0.20;
	}
	$('.p6_sr_word_body').css('transform','scale('+text_size+')');
	$('.p6_sr_word_body').css('top',text_top);
}
//第七页
function p7_ico_size(){
	var size_pre = 0.600;
	var wh = $(window).height();
	if(wh<=600){
		wh=600;
	}
	var text_size = ((wh*size_pre)/660).toFixed(2);
	var text_top = wh*0.135-(660-(wh*size_pre))/1.2;
	if(wh*size_pre>=660){
		text_top = wh*0.135;
	}
	if(text_size>=1.4){
		text_size=1.4;
	}
	$('.p7_sr_content_box').css('transform','scale('+text_size+')');
	$('.p7_sr_content_box').css('top',text_top);
}
//第八页
$(document).ready(function(e) {
	$('.p8_sr_right_ico_item').mouseenter(function(){
		if($('.p8_sr_right_ico_item_body').attr('data-anime')!='1'){
			$(this).find('.p8_hover_pre').hide();
			$(this).find('.p8_hover').show();
		}
	});
	$('.p8_sr_right_ico_item').mouseleave(function(){
		$(this).find('.p8_hover').hide();
		$(this).find('.p8_hover_pre').show();
	});
	$('.p8_sr_ico_right').click(function(){
		if($('.p8_sr_right_ico_item_body').attr('data-anime')=='1'){
			return false;
		}
		var elm_nums = $('.p8_sr_right_ico_item').length;
		elm_nums = elm_nums-4;
		$('.p8_sr_right_ico_item_box:not(:animated)').animate({marginLeft: '-=190px'}, 250,function(){
			var marginL = $('.p8_sr_right_ico_item_box').css('marginLeft');
   			if(parseInt(marginL)<=elm_nums*-190){
				$('.p8_sr_ico_right').hide();
			}else{
				$('.p8_sr_ico_left').show();
			}
		});
	});
	$('.p8_sr_ico_left').click(function(){
		if($('.p8_sr_right_ico_item_body').attr('data-anime')=='1'){
			return false;
		}
		var elm_nums = $('.p8_sr_right_ico_item').length;
		elm_nums = elm_nums-4;
		$('.p8_sr_right_ico_item_box:not(:animated)').animate({marginLeft: '+=190px'}, 250,function(){
			var marginL = $('.p8_sr_right_ico_item_box').css('marginLeft');
   			if(parseInt(marginL)>=0){
				$('.p8_sr_ico_left').hide();
			}else{
				$('.p8_sr_ico_right').show();
			}
		});
	});
	$('.p8_sr_right_ico_item').click(function(){
		var item_Left = $(this).offset().left;
		var body_left = $('.p8_sr_right_ico_item_body').offset().left;
		var Left_px = 760-(item_Left-body_left)-190+45;
		var Index_nums = $(this).index();
		var return_kai = 1;
		if($('.p8_sr_right_ico_item_body').attr('data-anime')!='1'){
			$('.p8_sr_right_ico_item_body').attr('data-anime','1');
			$('.p8_sr_right_ico_item').not($(this)).animate({opacity: '0'}, 500,function(){
				if(return_kai === 1){
					console.log('go');
					$('.p8_sr_right_ico_item_body').css('transform','translateX('+Left_px+'px)');
					$('.p8_sr_right_ico_item').css('cursor','default');
					$('#p8_sr_LR_btn').hide();
					$('.p8_text_content_body').show();
					set_p8_text();
					$('.p8_text_content_item').eq(Index_nums).fadeIn(500,function(){
					   $('.p8_text_content_box').mCustomScrollbar('scrollTo','right');
					 });
				}
				return_kai = return_kai-1;
			});
		}
	});
	$('#p8_text_back').click(function(){
		var return_kai = 1;
		$('.p8_text_content_item').stop().fadeOut(200,function(){
			if(return_kai === 1){
				console.log('end');
				$('.p8_text_content_body').hide();
				$('#p8_sr_LR_btn').show();
				$('.p8_sr_right_ico_item').css('cursor','pointer');
				$('.p8_sr_right_ico_item_body').css('transform','translateX(0px)');
				$('.p8_sr_right_ico_item').animate({opacity: '1'}, 500);
				$('.p8_sr_right_ico_item_body').attr('data-anime','0');
			}
			return_kai = return_kai-1;
		});
	});
});
function set_p8_ico(){
		var elm_nums = $('.p8_sr_right_ico_item').length;
		$('.p8_sr_right_ico_item_box').width(190*elm_nums);
		if(elm_nums<=4){
			$('.p8_sr_ico_right').hide();
			$('.p8_sr_ico_left').hide();
		}
}
function set_p8_text(){
	var boxH = $('.p8_text_content_box').height();
	$('.p8_text_content_item').height(boxH);
	var bodyH = $('.p8_sr_right_ico_item_body').height();
	var itemH = $('.p8_sr_right_ico_item_box').height();
	var MarT = (bodyH-itemH)/2;
	$('.p8_sr_right_ico_item_box').css('marginTop',MarT+'px')
}
//全局
function nav_bottom(){
	var wh = $(window).height();
	if(wh<=600){
		wh=600;
	}
	var bottom = wh*0.076+50;
	$('.sr_nav').css('bottom',bottom);
}
//经过一定时间后如果还未加载完则强制显示内容
	$(function(){
	  setTimeout('stopload()',300000);/*设置时间*/
	});
	 
	function stopload(){
	  $('.sr_loading_body').fadeOut(250);
	}
$(document).ready(function(e) {
    p1_bar_width();
	p2_bar_width();
	text_size();
	p7_ico_size();
	nav_bottom();
	set_p8_ico();
	set_p8_text();
	$(".p8_text_content_box").mCustomScrollbar({
        scrollButtons:{
		enable:false,
		scrollType:"continuous",
		scrollSpeed:20,
		scrollAmount:40
		},
        theme:"minimal-dark",
		horizontalScroll:true,
		advanced:{autoExpandHorizontalScroll:true }
    });
});
$(window).resize(function(e) {
    p1_bar_width();
	p2_bar_width();
	text_size();
	p7_ico_size();
	nav_bottom();
	set_p8_ico();
	set_p8_text();
});