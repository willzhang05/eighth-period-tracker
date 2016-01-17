"use strict";
var scale = 1.5,
	w = window.innerWidth,
	h = window.innerHeight,
	dia = false,
	exp = false,
	tempW, tempH, tempM;
/*setScale();*/
window.onresize = function() {
	w = window.innerWidth;
	h = window.innerHeight;
	console.log(w);
	/*setScale();*/
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
//var xmlhttp = new XMLHttpRequest();
var url = "ion.tjhsst.edu/api/profile?format=json";
var uname = "";
var pass = "";
document.getElementById("login-dialog").style.display = "block";
testCreds();
/*xmlhttp.onreadystatechange = function() {
    //if (xmlhttp.readyState == 4) {
    	if(xmlhttp.status == 200) {
        	getUserId(xmlhttp.response);
    	} else if(xmlhttp.status == 401) {
			console.log("Please sign in");
			document.getElementById("login-dialog").style.display = "block";
		}
    //}
};
xmlhttp.open("GET", "https://" + url, true, uname, pass);
xmlhttp.send();*/
/*document.getElementById("login-form").onsubmit = function() {
	uname = document.getElementById("uname").value;
	pass = document.getElementById("pass").value;
	alert(uname + ":" + pass + "@" + url);
}*/
function getUserId(json) {
	console.log(json)
}
function loginUser() {
	uname = document.getElementById("uname").value;
	pass = document.getElementById("pass").value;
	//xmlhttp.open("GET", "https://" + url, true, uname, pass);
	//console.log(xmlhttp.readyState);
	//console.log(xmlhttp.status);
	//testCreds();
}
function testCreds() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				getUserId(xmlhttp.response);
			} else if(xmlhttp.status == 401) {
				console.log("Please sign in");
				document.getElementById("login-dialog").style.display = "block";
			}
		}
	};
	xmlhttp.open("GET", "https://" + url, true)
	console.log(xmlhttp.readyState);
	xmlhttp.open("GET", "https://" + uname + ":" + pass + "@" + url, true);
	getUserId(xmlhttp.responseText);
	console.log("https://" + uname + ":" + pass + "@" + url);
}
var profile = getUserId("ion.tjhsst.edu/api/profile?format=api");
var Module = class {
	constructor(s) {
		var parent = document.getElementById("content"),
		modWrap = document.createElement("div"),
		mod = document.createElement("div"),
		bar = document.createElement("div"),
		label = document.createElement("div"),
		expand = document.createElement("button"),
		exit = document.createElement("button"),
		button = document.getElementById("add-card-wrapper");
		modWrap.className = s + " card";
		mod.className = s.substring(0, s.length - 8);
		s = s.substring(0, s.length - 8);
		bar.className = "window-bar";
		label.className = "window-label";
		expand.className = "expand-button";
		exit.className = "exit-button";
		exit.onclick = function() {modWrap.remove()};
		if(s == "twitter") {
			var twitter = document.createElement("a");
			twitter.className = "twitter-timeline";
			twitter.setAttribute("data-dnt", "true");
			twitter.setAttribute("data-widget-id", "667454451305836544");
			var script = document.createElement("script");
			script.src = "scripts/twitter.js"
			mod.appendChild(twitter);
			mod.appendChild(script);
			bar.style.backgroundColor = "#2196F3";
		} else if(s == "nagios") {
			var frame = document.createElement("iframe");
			frame.id = "monitor";
			frame.src = "https://monitor.tjhsst.edu";
			mod.appendChild(frame);
			bar.style.backgroundColor = "#2196F3";
		} else if(s.includes("block")) {
			var frame = document.createElement("iframe");
			frame.id = "blocks";
			if(s == "ablock") {
				frame.src = "https://ion.tjhsst.edu/signage/eighth";
			} else if(s == "bblock") {
				frame.src = "https://ion.tjhsst.edu/signage/eighth?block_increment=1";
			}
			mod.appendChild(frame);
			bar.style.backgroundColor = "#bdbdbd";
		}
		expand.onclick = function() {toggleModExpand(modWrap, expand)};
		modWrap.appendChild(bar);
		label.appendChild(expand);
		bar.appendChild(label);
		bar.appendChild(exit);
		modWrap.appendChild(mod);
		parent.insertBefore(modWrap, button);
	}
}