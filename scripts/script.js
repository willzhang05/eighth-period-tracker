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
/*
<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/rejectedtjTODAY" data-widget-id="667454451305836544">Tweets by @rejectedtjTODAY</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
*/
document.getElementById("login-form").onsubmit = function() {
	loginUser();
}
var xmlhttp = new XMLHttpRequest();
var url = "https://ion.tjhsst.edu/api/profile?format=api";
var uname = "";
var pass = "";
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
    	if(xmlhttp.status == 200) {
    		var myArr = JSON.parse(xmlhttp.responseText);
        	getUserId(myArr);
    	} else if(xmlhttp.status == 401) {
			console.log("Please sign in");
			document.getElementById("login-dialog").style.display = "block";
		}
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getUserId(url) {
	alert(uname);
}
function loginUser() {
	uname = document.getElementById("uname").value;
	pass = document.getElementById("pass").value;
	testCreds();
}
function testCreds() {
	var testReq = new XMLHttpRequest();
	testReq.onreadystatechange = function() {
		if (testReq.readyState == 4) {
			if(testReq.status == 200) {
				console.log("successful!");
				document.getElementById("login-dialog").style.display = "none";
			} else if(testReq.status == 401) {
				console.log("Try again.");
			}
		}
	};
	testReq.open("GET", uname + ":" + pass + "@" + url, true);
	testReq.send();
}
var profile = getUserId("https://ion.tjhsst.edu/api/profile?format=api");
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