// JavaScript Document
function area_margin(){
	$('.niaoduo_master_info_li:nth-child(3n)').css('marginRight','0px');
}
$(document).ready(function() {
    area_margin();
	$('.niaoduo_see_all').click(function(){
		$(this).parent().parent().find('.niaoduo_master_info_ul').css('height','auto');
		
	});
});