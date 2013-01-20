var server = require('server');

Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
    	var userData = {
			facebookId:	e.data.id,
			name: 		e.data.name,
			gender:		e.data.gender,
			email:		e.data.email,
			picture:	'http://graph.facebook.com/'+e.data.id+'/picture'
		};
		
		server.signUp(userData);
		Ti.App.addEventListener(server.SIGNED,function(e)		
		{			
			$.trigger('logged', e);
		});
		
    } else if (e.error || e.cancelled) {
    	//TODO @gceballos Hacer algo al respecto
        alert(e.error);   
    }
});

Ti.Facebook.appid = 131352843697130;
Ti.Facebook.permissions = ['email','publish_actions'];
if (Ti.Facebook.loggedIn)
{
	//alert("already logged in");
	$.trigger('logged', {});
}