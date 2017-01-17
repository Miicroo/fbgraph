var containerManager = (function() {
	var self = {};
	var containers = {};
	
	self.createContainer = function(config) {
		var defaultConfig = {'width': '400px', 'closeable': false};
		var config = getOptions(config, defaultConfig);
		
		var id = guid();
		
		var containerDiv = document.createElement('div');
		containerDiv.id = id;
		containerDiv.setAttribute('style', 'width:'+config.width+'px');
		
		if(config.closeable) {
			var closeDiv = document.createElement('div');
			closeDiv.id = id+'Close';
			closeDiv.setAttribute('style', 'width:'+config.width+'px');
			closeDiv.className += 'containerHeader';
			
			var closeLink = document.createElement('a');
			closeLink.href = '#';
			closeLink.onclick = function() {closeContainer(id);}
			closeLink.className += 'containerCloseLink';
			closeLink.innerText = 'X';
			
			var containerContent = document.createElement('div');
			containerContent.id = id+'Content';
			containerContent.setAttribute('style', 'width:'+config.width+'px');
			
			closeDiv.appendChild(closeLink);			
			containerDiv.appendChild(closeDiv);
		}
		
		containerDiv.appendChild(containerContent);
		document.body.appendChild(containerDiv);
		
		containers[id] = containerDiv;
		
		return id;
	};
	
	self.getContainer = function(id) {
		return containers[id];
	};
	
	self.closeContainer = function(containerId) {
		var element = document.getElementById(containerId);
		element.parentNode.removeChild(element);
	};
			
	self.setContainerContent = function(containerId, content) {
		document.getElementById(containerId+'Content').innerHTML = content;
	}
	
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	
	return self;
}());