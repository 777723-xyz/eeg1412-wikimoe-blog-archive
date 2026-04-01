// JavaScript Document
function show_gg_window(){
	$('#my_goods_window').addClass('active');
}
/*$('#cj_gg_windows_back').click(function(){
	self.location='game.html'; 
});*/
$('#goto_set_phone_window').click(function(){
	$('#my_goods_window').removeClass('active');
	$('#input_phone_window').addClass('active');
});
$('#game_noplay_close').click(function(){
	$('#game_noplay').hide();
	$('#input_phone_window').addClass('active');
});