// JavaScript Document
$(window).load(function () {
	$('.sr_m_loading').fadeOut(250);
	$('#menu').click(function(){
		event.stopPropagation();
		if($('.sr_menu_box').is(':visible')){
			$('.sr_menu_box').hide();
		}else{
			$('.sr_menu_box').show();
		}
	});
	$(document).click(function(e){
		var divTop = $('.sr_menu_box');   // 设置目标区域
		if(!divTop.is(e.target) && divTop.has(e.target).length === 0){
		  divTop.hide();
	  }
	})
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'vertical',
		loop: false,
		simulateTouch : true,
		mousewheelControl : true,
		mousewheelReleaseOnEdges : true,
		speed:300,
		noSwiping : true,
		onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
			setTimeout('listSize()',200);
	    },
		onSlideChangeStart: function(swiper){
			swiper.disableTouchControl();
		},
	    onSlideChangeEnd: function(swiper){ 
			swiper.enableTouchControl();
			var Index_nums = swiper.activeIndex;
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			if(Index_nums==5){
				page6_anime();
			}else{
				page6_animeOut();
			}
	    } 
  });
  $('.sr_mtext_item').click(function(){
	  $('.sr_mtext_item').removeClass('active');
	  $(this).addClass('active');
  });
  $('.sr_p8_item').click(function(){
	  var index_ = $(this).attr('data-index');
	  $('.sr_p8_jobback').fadeIn(200);
	  $('.sr_p8_jobbody').show();
	  $('.sr_p8_jobBox').eq(index_).fadeIn(200);
  });
  $('.sr_p8_jobback').click(function(){
	  $('.sr_p8_jobback').fadeOut(200);
	  $('.sr_p8_jobbody').fadeOut(200,function(){
		  $('.sr_p8_jobBox').hide();
	  });
  });
  $('.sr_top_menu_link').click(function(){
		var cnums = parseInt($(this).attr('data-page'));
		mySwiper.slideTo(cnums, 500, true);
	});
});
//第六页
function page6_anime(){
	var word_nums = $('.p6_sr_word_item').length;
	for (var i=0;i<word_nums;i++){
		$('.p6_sr_word_item').eq(i).delay(150*i).animate({opacity: '1'}, 400);
	}
}
function page6_animeOut(){
	$('.p6_sr_word_item').stop().animate({opacity: '0'}, 50);
}
//通用
function listSize(){
	var ww = $(window).width();
	var wh = $(window).height();
	var h2 = $('.sr_p9_content').height();
	if(ww<=480){
		var h = $('.sr_p8_itemlist').height();
		$('.sr_p8_itemlist').css({
			'marginTop':-h/2+10,
			'top':'50%'
		});
	}else{
		$('.sr_p8_itemlist').css({
			'marginTop':0,
			'top':'20%'
		});
	}
	var p9m = (wh-44-h2)/2;
	if(p9m>0){
		$('.sr_p9_content').css('marginTop',p9m);
	}else{
		$('.sr_p9_content').css('marginTop',0);
	}
}
$(window).resize(function(){
	setTimeout('listSize()',200);
});
//经过一定时间后如果还未加载完则强制显示内容
	$(function(){
	  setTimeout('stopload()',300000);/*设置时间*/
	});
	 
	function stopload(){
	  $('.sr_m_loading').fadeOut(250);
	}