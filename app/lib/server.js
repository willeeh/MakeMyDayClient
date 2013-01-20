//*** Public properties:
exports.SIGNED = 'signed';

exports.POST  	= 'POST';
exports.GET 	= 'GET';
 
//*** Protected variables:
//var host = "http://localhost:8080/v1/";
var host = "http://damp-ravine-1429.herokuapp.com/v1/"
 
//*** Public methods:
exports.signUp = function (userData) {
    send('user', exports.POST, JSON.stringify(userData));
};
 
//*** Protected method used only internally.
send = function (path, method, postData) {
	var xhr = Ti.Network.createHTTPClient();

	xhr.onload = function(e) {
		Ti.App.fireEvent(exports.SIGNED,e);
	};
			
	xhr.open(method, host+path);
	xhr.setRequestHeader('Content-Type', 'application/json');
	if (postData)
		xhr.send(postData);
	else
		xhr.send();        
};
