// JavaScript Document
$(document).ready(function () {
	$('.niaoduo_header_meanu_bar').last().empty();
	$(".niaoduo_header_input_search").focus(function(){
       $(".niaoduo_header_btn_search").addClass('type_focus');
    });
    $(".niaoduo_header_input_search").blur(function(){
       $(".niaoduo_header_btn_search").removeClass('type_focus');
    });
});