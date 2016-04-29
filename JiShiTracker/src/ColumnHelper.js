(function(obj){

	var hashCode = function(str){
	    var hash = 0;
	    if (str.length === 0) {
	    	return hash;
	    }
	    for (i = 0; i < str.length; i++) {
	        var char = str.charCodeAt(i);
	        hash = ((hash<<5)-hash)+char;
	        hash = hash & hash; // Convert to 32bit integer
	    }
	    return hash;
	};

	var getHashCode  = function(hasUrl){
		var url = '';
		if(hasUrl){
			url = window.location.href;
		}
		var hash = hashCode(url);

		return hash +'';
	};

	function Column(){
		this.stack = [];

		var lastCol = getGlobalVar('_columns');

		this.deserialize(lastCol);
	}

	Column.prototype.enterCol = function(colName,hasUrl){
		var self = this;
		if(!colName || '' === colName){
			return;
		}

		var hash = getHashCode(hasUrl);
		var flag = false,i,
			s = this.stack;

		for(i = s.length - 1;i >= 0;i--){
			if(s[i].colName === colName && s[i].hashcode === hash){
				flag = true;
				break;
			}
		}
		if(flag){
			while(s.length > i + 1){
				s.pop();
			}
		}else{
			s.push({colName:colName,hashcode:hash});
		}

		setGlobalVar('_columns',self.serialize());
	};

	Column.prototype.enterBro = function(colName,hasUrl){
		var self = this;
		if(!colName || '' === colName){
			return;
		}

		var hash = getHashCode(hasUrl);

		var s = this.stack;
		
		s.pop();
		s.push({colName:colName,hashcode:hash});

		setGlobalVar('_columns',self.serialize());
	};

	Column.prototype.enterTop = function(colName,hasUrl){
		var self = this;
		if(!colName || '' === colName){
			return;
		}

		var hash = getHashCode(hasUrl);

		var s = this.stack;
		while(s.length){
			s.pop();
		}
		s.push({colName:colName,hashcode:hash});

		setGlobalVar('_columns',self.serialize());
	};

	Column.prototype.deserialize = function(cols){
		var self = this;
		self.stack = [];
		if(cols && '' !==cols){
			var items = cols.split('||');
			for(i = 0;i<items.length;i++){
				var item = items[i].split('--');
				var colName = '';
				var hash = 0;
				if(item.length > 0){
					colName = item[0];
				}
				if(item.length > 1){
					hash = item[1];
				}
				if('' !== colName){
					self.stack.push({colName:colName,hashcode:hash});
				}

			}
		}
	};

	Column.prototype.serialize = function(){
		var self = this;
		var i,path=[],
			s = this.stack,
			len = s.length;
		if(!len){
			return;
		}
		
		for(i = 0;i<len;i++){
			path[i] = s[i].colName + '--'+ (s[i].hashcode || '');
		}
		return path.join('||');
	};

	Column.prototype._getCol = function(){
		var self = this;
		var i,path=[],
			s = this.stack,
			len = s.length;
		if(!len){
			return;
		}
		
		for(i = 0;i<len;i++){
			path[i] = s[i].colName;
		}
		return path.join('-');
	};

	Column.prototype.getCol = function(){
		var self = this;
		return self._getCol();
	};

	var _columnInstance = null;

	obj.getColumnInstance = function(){

		if(!_columnInstance){
			_columnInstance = new Column();
		}

		return _columnInstance;
	};
})(window.tracker);
