 
function wapmsg(msg)
{
	if(msg!='')
	{
		layer.open({
		    content: msg,
		    style: 'background-color:#000;filter:alpha(Opacity=70);-moz-opacity:0.6;opacity: 0.6; color:#fff; border:none;',
		    time: 2
		});
	}
}
