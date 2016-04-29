/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){

	var defautlSender = t.getDefaultSender();

	defautlSender.onFailt = function(){
		t.registerSender(t.getAjaxSender());
	};

	t.getImgSender = function(){
		return defautlSender;
	};
})(window.tracker);