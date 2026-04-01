//创建预加载图片标签
(function(_global,$) {
  	var arr = $('.bz_bg_pic[data-img]');
	for(var i=0;i<arr.length;i++){
		var img_src = arr.eq(i).attr('data-img');
		$('#img_load').append("<img src='"+img_src+"'>");
	}
})(this,jQuery);
//定义全局变量
var swiper_ = {};
var swiperCs1 = {};
var swiperCs2 = {};
var swiperCs3 = {};
var swiper_anime = true;


$(window).load(function(){
	stopload();
	var open_speed = 4000;
	set_big_block('rgba(30,165,195,100)');
	var t0 = "";
	var t=setTimeout("set_left_color('rgba(30,165,195,100)')",Math.round(open_speed*0.75));
	var t2=setTimeout("$('.bz_logo').show()",1600);
	var t3=setTimeout("$('.bz_right_menu_box').fadeIn(300);$('.bz_left_menu_box').fadeIn(300)",Math.round(open_speed*1.4));
	var t5=setTimeout("$('.bz_right_menu_item').eq(0).addClass('active')",Math.round(open_speed*1.6));
	var t4=setTimeout("swiper_start()",Math.round(open_speed*1.6));
	var tlogo=setTimeout("$('.bz_logo').hide();$('.bz_logo_sm').show();",21600);
	$('.bz_right_menu_bg').addClass('fadeInDown animated').css({
		    'visibility': 'visible',
			'animation-duration': '2s',
			'-webkit-animation-duration': '2s',
			'animation-delay': '3.7s',
			'-webkit-animation-delay': '3.7s',
  	});
	crearcsSwiper();
	$('.bz_left_menu_btn_item').on("mousedown",function(){
		var this_ = $(this);
		this_.find('.bz_menu_btn').hide();
		this_.find('.bz_menu_btn_put').css('display','inline');
		clearTimeout(t0);//终止触发的setTimeout防止重复执行
		t0 = setTimeout(function(){
			this_.find('.bz_menu_btn').css('display','inline');
			this_.find('.bz_menu_btn_put').hide();
		},500);
	});
	$('.bz_left_menu_btn_item').on("mouseup",function(){
		$(this).find('.bz_menu_btn').css('display','inline');
		$(this).find('.bz_menu_btn_put').hide();
		if(!swiper_anime){
			if(!$(this).parent().hasClass('active')){
				var nums = $(this).attr('data-index');
				var data_color = $(this).attr('data-color');
				var index4_flag = false;
				if($('.bz_left_menu_btn_item[data-index="4"]').parent().hasClass('active')){
					index4_flag=true;
				}
				$('.bz_left_menu_btn_item').parent().removeClass('active');
				$(this).parent().addClass('active');
				creat_swiper(nums,swiper_);
				if(nums==='4'){
					closePicWatch();
					page_contact();
				}
				if(index4_flag){
					page_contact_remove(data_color);
					t5=setTimeout(function(){set_left_color(data_color)},300);
				}else{
					set_left_color(data_color);
				}
			}
		}
	});
	$('.bz_ten_bg').click(function(){
		picWatch($(this));
	});
	$('.bz_logo').click(function(){
		picWatch($(this));
	});
	$('.bz_pic_con_bg').click(function(){
		closePicWatch();
	});
	$('.bz_pic_con_close').click(function(){
		closePicWatch();
	});
});
//经过一定时间后如果还未加载完则强制显示内容
	$(function(){
	  setTimeout('stopload()',300000);/*设置时间*/
	});
	 
	function stopload(){
	  $('.bz_loading_body').fadeOut(250);
	}

function page_contact_remove(data_color){
	$('.bz_big_color_block').css('background',data_color);
	$('.bz_big_color_block').stop(true, false).animate({right:"130%"},500,function(){
		$('.bz_big_color_block').css('right','-150%');
	});
}
function page_contact(){
	$('.bz_big_color_block').css('background','rgba(210,210,210,100)');
	$('.bz_big_color_block').css('right','-150%');
	$('.bz_big_color_block').stop(true, false).animate({right:"-50%"},500);
}
function swiper_start(){
	mySwiper = creat_swiper('1',swiper_);
}
function creat_swiper(nums,mySwiper){
		swiper_anime = true;
		var pic_nums = $('.bz_bg_pic_box').length;
		var isemp = true;
		var loop_ = true;
		var looped = false;
		var slideNum = 0;
		var initEd = false;
		if(!$.isEmptyObject(mySwiper)){
			isemp = false;
		}
		
		$('.bz_bg_pic_box').eq(nums-1).stop(true, false).fadeIn(500,function(){

				if(!isemp){
					delet_swiper(mySwiper);
				}
				if(nums==='4'){
					loop_ = false;
				}
				mySwiper = new Swiper ('.swiper_container_'+nums, {
					direction: 'vertical',
					effect : 'fade',
					loop: loop_,
					simulateTouch : false,
					speed:2000,
					autoplay : 4000,
					onInit: function(swiper){
					  swiper_ =  swiper;
					  swiper_anime = false;
					  slideNum = swiper.slides.length -2;
					  initEd = true;
					},
					onSlideChangeStart: function(swiper){
					  var activeIndex = swiper.activeIndex-1;
					  if(!looped && initEd && (activeIndex+1)>slideNum){
						  looped = true;
						  console.log(looped);
					  }
					  if(looped){
						  if(activeIndex===slideNum){
							  activeIndex = 0;
						  }else{
						  	activeIndex = activeIndex;
						  }
					  }
					  $('.bz_ten_bg').attr('data-pic',activeIndex);
					  $('.bz_logo').attr('data-pic',activeIndex);
					}
				});
				if(nums!=='4'){
					$('.bz_ten_bg').attr('data-index',nums).css({'cursor':'pointer'});
					$('.bz_logo').attr('data-index',nums).css({'cursor':'pointer'});
				}else{
					$('.bz_ten_bg').attr('data-index',nums).css({'cursor':'default'});
					$('.bz_logo').attr('data-index',nums).css({'cursor':'default'});
				}
			
		});
		for (var i=0;i<pic_nums;i++){
			if(i!==parseInt(nums)-1){
				$('.bz_bg_pic_box').eq(i).stop(true, false).fadeOut(500);
			}
		}
}
function delet_swiper(mySwiper){
	mySwiper.destroy(true,true);
	mySwiper.update(true);
	console.log('d');
}
function set_big_block(data_color){
	$('.bz_big_color_block').addClass('big_block_type_1');
	$('.bz_big_color_block').css('background',data_color);
	var t=setTimeout("remove_big_block()",4000);
}
function remove_big_block(){
	$('.bz_big_color_block').removeClass('big_block_type_1');
}
function set_left_color(data_color){
	$('.bz_left_menu_body').fadeIn(300);
	$('.bz_left_menu_body').css('background',data_color);
}
function crearcsSwiper(){
	swiperCs1 = new Swiper ('.swiper_container_cs_1', {
		direction: 'vertical',
		effect : 'fade',
		fade: {
		  crossFade: true,
		},
		simulateTouch : false,
		speed:500,
		prevButton:'.bz_pic_con_left.type_blue',
		nextButton:'.bz_pic_con_right.type_blue',
		onInit: function(swiper){
			
		}
	});
	
	swiperCs2 = new Swiper ('.swiper_container_cs_2', {
		direction: 'vertical',
		effect : 'fade',
		fade: {
		  crossFade: true,
		},
		simulateTouch : false,
		speed:500,
		prevButton:'.bz_pic_con_left.type_green',
		nextButton:'.bz_pic_con_right.type_green',
		onInit: function(swiper){
			
		}
	});
	
	swiperCs3 = new Swiper ('.swiper_container_cs_3', {
		direction: 'vertical',
		effect : 'fade',
		fade: {
		  crossFade: true,
		},
		simulateTouch : false,
		speed:500,
		prevButton:'.bz_pic_con_left.type_yellow',
		nextButton:'.bz_pic_con_right.type_yellow',
		onInit: function(swiper){
			
		}
	});
}
function picWatch(em){
	var index_ = em.attr('data-index');
	var pic_ = em.attr('data-pic');
	if(index_==="" || index_==="4"){
		return;
	}
	swiper_.stopAutoplay();
	$('.bz_pic_fx').hide();
	$('.bz_pic_fx.type_'+index_).show();
	$('.bz_items_content').fadeIn(500);
	$('.swiper_container_cs_'+index_).fadeIn(500);
	$('.bz_bg_pic_body').animate({opacity:'0'},500);
	$('.bz_logo').animate({opacity:'0'},500);
	window['swiperCs'+index_].update();
	window['swiperCs'+index_].slideTo(parseInt(pic_));
}
function closePicWatch(){
	$('.bz_items_content').fadeOut(500);
	$('.bz_pic_cs_body .swiper-container').fadeOut(500);
	$('.bz_bg_pic_body').animate({opacity:'1'},500);
	$('.bz_logo').animate({opacity:'1'},500);
	swiper_.startAutoplay();
}