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

function getTotalServiceHours() {
    var count = 0,
        temp = "",
        eligActivities = ["Belvedere Elem. Tutors", "Codi's Hats", "Columbia Elem. School Tutors", "Computer Tech Assistants", "Glasgow Middle School tutoring"];
    for(var i = 0; i < userBlocks.length; i++) {
        temp = userBlocks[i].activity.title;
        console.log(temp);
        if(eligActivities.includes(temp)) {
            count += 40;
        }
    }
    return count;
}

function getActivities() {
    var arr = [],
        occ = [],
        temp = "";
    for(var i = 0; i < userBlocks.length; i++) {
        temp = userBlocks[i].activity.title;
        if(arr.includes(temp)) {
            occ[arr.indexOf(temp)]++;
        } else {
            arr.push(userBlocks[i].activity.title);
            occ.push(1);
        }
    }
    return [arr, occ];
}

function loadModules() {
    var serviceHours = new Module("hours");
    var activitiesTotal = new Module("activities");
}

var Module = class {
	constructor(s) {
		var parent = document.getElementById("content"),
		    modWrap = document.createElement("div"),
            header = document.createElement("h2"),
            mod = document.createElement("div");
        modWrap.className = "card-wrapper";
        mod.className = "card";
        header.className = "card-title";
        if(s == "hours") {
            header.innerHTML = "Total Service Hours:";
            var count = getTotalServiceHours();
            mod.innerHTML = Math.floor(count/60) + " Hours " +  count % 60 + " Minutes";
        } else if(s == "activities") {
            header.innerHTML = "Your Clubs:";
            var act = getActivities()[0],
                occ = getActivities()[1],
				table = document.createElement("table"),
				colName1 = document.createElement("th"),
				colName2 = document.createElement("th");
			colName1.innerHTML = "Club Name";
			colName2.innerHTML = "Times Attended";
			table.appendChild(colName1);
			table.appendChild(colName2);
            for(var i = 0; i < act.length; i++) {
                var row = document.createElement("tr"),
					cell1 = document.createElement("td"),
					cell2 = document.createElement("td");
                cell1.innerHTML = act[i];
				cell2.innerHTML = occ[i];
                row.appendChild(cell1);
				row.appendChild(cell2);
				table.appendChild(row);
				
            }
			mod.appendChild(table);
        }
        /*modWrap = document.createElement("div"),
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
		expand.onclick = function() {toggleModExpand(modWrap, expand)};
		modWrap.appendChild(bar);
		label.appendChild(expand);
		bar.appendChild(label);
		bar.appendChild(exit);
		modWrap.appendChild(mod);
		*/
        modWrap.appendChild(header);
        modWrap.appendChild(mod);
        parent.appendChild(modWrap);
    }
}
