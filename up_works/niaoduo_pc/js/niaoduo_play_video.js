// JavaScript Document
$(document).ready(function () {
	var niaoduoVideo=document.getElementById("niaoduo_video");
	$('#niaoduo_play_video').click(function(){
		$('#niaoduo_play_video_body').show();
		$("html").css("overflow","hidden");
		niaoduoVideo.play();
	});
	$('#niaoduo_close_video').click(function(){
		$('#niaoduo_play_video_body').hide();
		$("html").css("overflow","auto");
		niaoduoVideo.pause();
	});
});