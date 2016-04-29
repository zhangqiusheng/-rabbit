(function(t){
	function encoder(){
		var self = this;
		self.encode = function(str){
			try{
				if (!str || !str.replace) {
					return str;
				}
				var win = t.getWindow();
				if(win){
					return (win.encodeURIComponent || escape)(str);
				}
				return str;
			}
			catch(ex){}

			return null;
		};

		self.dencode = function(str){
			try{
				if (!str || !str.replace) {
					return str;
				}
				var win = t.getWindow();
				if(win){
					return (win.decodeURIComponent || unescape)(str);
				}
				return str;
			}
			catch(ex){}

			return null;
		};
	}
	t.registerEncoder(new encoder());
})(window.tracker);