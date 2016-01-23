"use strict";
var scale = 1.5,
	w = window.innerWidth,
	h = window.innerHeight,
	dia = false,
	exp = false,
	tempW, tempH, tempM,
    dialog = document.getElementById("login-dialog");
/*setScale();*/
window.onresize = function() {
	w = window.innerWidth;
	h = window.innerHeight;
	console.log(w);
	/*setScale();*/
}
window.onkeydown = function(event) {
    if(event.keyCode == 13 && dialog.style.display == "block") {
        loginUser();
    }
}
/*function setScale() {
	var element = document.getElementById('schedule'),
		style = window.getComputedStyle(element),
		top = style.getPropertyValue('-webkit-transform');
	console.log(top);
	scale =  w * (1.5/1280);
	console.log(scale);
	element.style["-webkit-transform"] = "scale(" + scale + ")";
	element.style["-moz-transform"] = "scale(" + scale + ")";
	element.style["-o-transform"] = "scale(" + scale + ")";
	element.style["-ms-zoom"] = scale + "";
	scale = 1280 / (1.49 * w);
	element.style.width =  (scale * 100) + "%";
}*/
var request = new XMLHttpRequest(),
    profileUrl = "ion.tjhsst.edu/api/profile?format=json",
    uname = "",
    pass = "",
    userInfo,// = reqHandler(profileUrl); //Initial test for authetication
    userBlocks,
    authed = false;
dialog.style.display = "block";

request.onload = function() {
    if(request.status >= 200 && request.status < 400) {
        dialog.style.display = "none";
        if(authed) {
            userBlocks = JSON.parse(request.responseText);
            loadModules();
        } else {
            userInfo = JSON.parse(request.responseText);
            authed = true;
            reqHandler("ion.tjhsst.edu/api/signups/user/" + userInfo.id + "?format=json");
        }
    } else {
        //if(!(uname == "" && pass == "")) {
            var loginMesg = document.getElementById("login-message");
            loginMesg.innerHTML = "Invalid credentials";
            loginMesg.style.color = "#F44336";
        //}
    }
};
request.onerror = function() {
    console.log("Connection Error");
};

function loginUser() {
	uname = document.getElementById("uname").value;
    pass = document.getElementById("pass").value;
    reqHandler(profileUrl);
}

function reqHandler(url) {
	try {
        request.open("GET", "https://" + url, true);
        request.setRequestHeader("Authorization", "Basic " + btoa(uname + ":" + pass));
        request.send();
    } catch(e) {
        console.log("Error");
    }
}

function loadModules() {
    var serviceHours = new Module("hours");
    var activitiesTotal = new Module("activities");
    var activitiesPie = new Module("pie");
}