// JavaScript Document
onmessage =function (evt){
  	var cishu = 0;
	var six = 0;
	var five = 0;
	var four = 0;
	var three = 0;
	var two = 0;
	var one = 0;
	var cp_q = new Array();
	var cp_h = new Array();
	var cp2_q = new Array();
	var cp2_h = new Array();
	var attack_arr = new Array();
	var timer = null;
	var arr = evt.data;
	function generate_randomx(count,nums_length) {
	  //初始化数组
	  var generated = new Array();
	  //生成数组数
	  var generatedCount = generated.length;
	  //生成nums_length个随机数
	  for(var i = 0 ; i < nums_length; i++){
		var candidate = Math.floor(Math.random() * count)+1;
		//如果生成一样的数字则重新生成
		for(var j = 0; j < generatedCount; j++) {
		  if(candidate == generated[j]){
			candidate = Math.floor(Math.random() * count)+1;
			j= -1;
		  }
		}
		generated[i] = candidate;  
		generatedCount++;
	  }
	  return generated;  
	}
	function sortNumber(a, b){
		return a - b
	}
	function creat_nums(caipiao_span,arr){
		if(caipiao_span=="caipiao35"){
			cp_q = arr;
		}
		if(caipiao_span=="caipiao12"){
			cp_h = arr;
		}
		if(caipiao_span=="caipiao35-2"){
			cp2_q = arr;
		}
		if(caipiao_span=="caipiao12-2"){
			cp2_h = arr;
		}
	}
	function creat_attack(){
		clearTimeout(timer);
		var input_q = arr[0];
		var input_h = arr[1];
		if(input_q.length<5||input_h.length<2||input_q.length>5||input_h.length>2){
			console.log("输入格式不对");
			return false;
		}
		for(var i = 0 ; i < input_q.length; i++){
			var nums_cache = parseInt(input_q[i]);
			if(nums_cache<1||nums_cache>35){
				console.log("前区范围不正确");
				return false;
				break;
			}
			attack_arr[i] = nums_cache;
		}
		for(var i = 0 ; i < input_h.length; i++){
			var nums_cache = parseInt(input_h[i]);
			if(nums_cache<1||nums_cache>12){
				console.log("后区范围不正确");
				return false;
				break;
			}
			attack_arr[i+5] = nums_cache;
		}
		cp_nums();
	}
	function cp_nums(){
		var q = generate_randomx(35,5).sort(sortNumber);
		var h = generate_randomx(12,2).sort(sortNumber);
		var z  = new Array();
		z = q.concat();
		z.push(h[0]);
		z.push(h[1]);
		timer = setTimeout(function(){
			cp_bidui(attack_arr,z,q,h);
			var arrPost = [cishu,one,two,three,four,five,six,cp_q,cp_h,cp2_q,cp2_h];
			postMessage(arrPost);
		},10);
	}
	function cp_bidui(attack,z,q,h){
		var j = 0;
		var jq = 0;
		var jh = 0;
		creat_nums("caipiao35",q);
		creat_nums("caipiao12",h);	
		for(var i=0;i<attack.length;i++){
			if(i<=4){
				for(var r=0;r<z.length-2;r++){
					if(z[r]===attack[i]){
						jq++;
					}
				}
			}
			if(i<=6&&i>4){
				for(var u=5;u<z.length;u++){
					if(z[u]===attack[i]){
						jh++;
					}
				}
			}
			if(i===6){
				if(jq===5&&jh===2){
					console.log(q);
					console.log(h);
					one++;
					q = generate_randomx(35,5).sort(sortNumber);
					h = generate_randomx(12,2).sort(sortNumber);
					creat_nums("caipiao35-2",q);
					creat_nums("caipiao12-2",h);
					return;
				}
				else if(jq===5&&jh===1){
					two++;
					cp_nums();
				}
				else if(jq===4&&jh===2||jq===5){
					three++;
					cp_nums();
				}
				else if(jq===3&&jh===2||jq===4&&jh===1){
					four++;
					cp_nums();
				}
				else if(jq===2&&jh===2||jq===3&&jh===1||jq===4){
					five++;
					cp_nums();
				}
				else if(jh===2||jq===1&&jh===1||jq===3){
					six++;
					cp_nums();
				}else{
					cp_nums();
				}
			}
		}
		cishu++;
	}
	creat_attack();
}