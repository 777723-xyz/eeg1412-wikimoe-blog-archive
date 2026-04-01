// JavaScript Document
$(document).ready(function () {
	if($('.deyun_index_content').hasClass('deyun_index_tag')){
		$('.deyun_nav_list_lv1_box').show();
	}
	else{
		//$('.deyun_nav_list_lv1_box').css('background','#fff');
	}
	
	 $('.deyun_nav_list_box').mouseenter(function() { 
	    $('.deyun_nav_list_lv1_box').show();
    });
	$('.deyun_nav_list_box').mouseleave(function() { 	  
	  if($('.deyun_index_content').hasClass('deyun_index_tag')){
		  $('.deyun_nav_list_lv1_box').show();
		  }
	  else{
	    $('.deyun_nav_list_lv1_box').hide();
		  }
    });
	//if($('.deyun_index_content').hasClass('deyun_index_tag')){
		$('.deyun_nav_list_lv1_name').first().addClass('first')
	//}
	/*else{
        $('.deyun_nav_list_lv1_name').first().addClass('first_b')
	}*/
   $('.deyun_nav_list_lv1_li').mouseenter(function() { 
	    $(this).find('.deyun_nav_list_lv1_name').addClass('active');
		$(this).find('.deyun_nav_list_lv2_box').show()
    });
	$('.deyun_nav_list_lv1_li').mouseleave(function() { 	    
	    $(this).find('.deyun_nav_list_lv1_name').removeClass('active');
		$(this).find('.deyun_nav_list_lv2_box').hide()
    });
})