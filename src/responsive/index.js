window.onresize=function() {
	document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+widthProportion()*75+"px !important");
}
document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+widthProportion()*75+"px !important");
function widthProportion(){
	var t=(document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth)
	t=t/750;
	t=t<=1.33?1.33:(t>=2?2:t)
	return t;
}