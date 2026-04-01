// JavaScript Document
function auto_right(go_right){
     $('#'+go_right).click();
}

function JInterval(funcName,time,id_group){
       var args=[];
       for(var i=3;i<arguments.length;i++){
           args.push(arguments[i]);
       }
	   if(banner_t!=='undefined'){
          var banner_t = setInterval(function(){
             funcName.apply(this,args);
          },time);
	   }
	   $('#'+id_group[1]).mouseenter(function(){
		  window.clearInterval(banner_t);
	   });
	   $('#'+id_group[2]).mouseenter(function(){
		  window.clearInterval(banner_t);
	   });
	   $('#'+id_group[3]).mouseenter(function(){
		  window.clearInterval(banner_t);
	   });
} 

function banner_slider(id,point,go_left,go_right,banner_body){
	$('#'+id).find('li').first().show().stop(true, false).animate({opacity:'1'},200).addClass('active');
	var banner_nums = $('#'+id).find('li').length;
	for(i=0;i<banner_nums;i++){
		$('#'+point).append("<li></li>");
	}
	$('#'+point).find('li').first().addClass('active');
	$('#'+point).css("marginLeft",0-(banner_nums*28-16)/2);
	$('#'+point).find('li').mouseover(function(){
		if($(this).hasClass('active')){
			
		}
		else{
		   $('#'+point).find('li').removeClass('active');
		   var banner_index = $(this).index();		
		   $(this).addClass('active');
		   banner_show(id,banner_index);
		}
	});
	$('#'+go_left).click(function(){
		var banner_nums = $('#'+id).find('li').length;
	    for(i=0;i<banner_nums;i++){
		    if($('#'+id).find('li').eq(i).hasClass('active')){
			    var active_banner = i;
		    }
	    }
		var banner_index=active_banner-1;
		if(banner_index<0){
			banner_index=banner_nums-1;
		};
		banner_show(id,banner_index);
		point_active(point,banner_index);
	});
	
	$('#'+go_right).click(function(){
		var banner_nums = $('#'+id).find('li').length;
	    for(i=0;i<banner_nums;i++){
		    if($('#'+id).find('li').eq(i).hasClass('active')){
			    var active_banner = i;
		    }
	    }
		var banner_index=active_banner+1;
		if(banner_index>banner_nums-1){
			banner_index=0;
		};
		banner_show(id,banner_index);
		point_active(point,banner_index);
	});
	var id_group = [id,point,go_left,go_right,banner_body]
	JInterval(auto_right,5000,id_group,go_right);
	$('#'+banner_body).mouseleave(function(){
		  $('.niaoduo_banner_next_pre_body').hide();
	});
	$('#'+banner_body).mouseenter(function(){
		  $('.niaoduo_banner_next_pre_body').show();
	});
	$('#'+point).mouseleave(function(){
		  JInterval(auto_right,5000,id_group,go_right);
	});
	$('#'+go_left).mouseleave(function(){
		  JInterval(auto_right,5000,id_group,go_right);
	});
	$('#'+go_right).mouseleave(function(){
		  JInterval(auto_right,5000,id_group,go_right);
	});
};
function banner_show(id,banner_index){
	var banner_nums = $('#'+id).find('li').length;
	for(i=0;i<banner_nums;i++){
		if($('#'+id).find('li').eq(i).hasClass('active')){
			var active_banner = i;
		}
	}
	$('#'+id).find('li').eq(active_banner).removeClass('active').stop(true, false).animate({opacity:'0'},200, function(){$('#'+id).find('li').eq(active_banner).hide();});
	$('#'+id).find('li').eq(banner_index).show().addClass('active').stop(true, false).animate({opacity:'1'},200, function(){$('#'+id).find('li').eq(banner_index);});
};
function point_active(point,banner_index){
	$('#'+point).find('li').removeClass('active');	
	$('#'+point).find('li').eq(banner_index).addClass('active');
}



