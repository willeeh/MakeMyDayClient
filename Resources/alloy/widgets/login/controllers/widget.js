function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "login/" + s : s.substring(0, index) + "/login/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.widget = A$(Ti.Facebook.createLoginButton({
        ns: "Ti.Facebook",
        id: "widget"
    }), "LoginButton", null);
    $.addTopLevelView($.__views.widget);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Facebook.appid = 131352843697130;
    Ti.Facebook.permissions = [ "email", "publish_actions" ];
    Ti.Facebook.addEventListener("login", function(e) {
        if (e.success) {
            var userData = {
                facebookId: e.data.id,
                name: e.data.name,
                gender: e.data.gender,
                email: e.data.email,
                picture: "http://graph.facebook.com/" + e.data.id + "/picture"
            }, xhr = Ti.Network.createHTTPClient();
            xhr.onload = function(e) {
                alert("Logged");
            };
            alert(JSON.stringify(userData));
            xhr.open("POST", "http://localhost:8080/v1/user");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(userData));
        } else (e.error || e.cancelled) && alert(e.error);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;