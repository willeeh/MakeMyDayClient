Ti.Facebook.appid = 131352843697130;
Ti.Facebook.permissions = ['email','publish_actions'];
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
    	var userData = {
			facebookId:	e.data.id,
			name: 		e.data.name,
			gender:		e.data.gender,
			email:		e.data.email,
			picture:	'http://graph.facebook.com/'+e.data.id+'/picture'
		};
		
		var xhr = Ti.Network.createHTTPClient();

		xhr.onload = function(e) {
			alert('Logged'); 
		};
		
		alert(JSON.stringify(userData));
		xhr.open('POST','http://localhost:8080/v1/user');
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(userData));
        
    } else if (e.error || e.cancelled) {
    	//TODO @gceballos Hacer algo al respecto
        alert(e.error);   
    }
});