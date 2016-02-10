"use strict"
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
    var arr = {},
        temp = "";
    for(var i = 0; i < userBlocks.length; i++) {
        temp = userBlocks[i].activity.title;
        if(arr.hasOwnProperty(temp)) {
            arr[temp] = arr[temp] + 1;
        } else {
            arr[temp] = 1;
        }
    }
    return arr;
}

function genPieGraph(json) {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    /*var per = json,
        total = 0,
        temp,
        temp2 = 0;
    for(var i = 0; i < Object.keys(json).length; i++) {
        total += json[Object.keys(json)[i]];
    }
    console.log(total);
    for(var i = 0; i < Object.keys(per).length; i++) {
        temp = Object.keys(per)[i];
        per[temp] = parseFloat((per[temp] / total).toFixed(4));
        temp2 = temp2 + per[temp];
    }
    console.log(per);
    console.log(temp2);
    return document.createElement("svg");*/
}

function jsonToArray(json) {
    var r = [],
        keys = Object.keys(json);
    for(var i = 0; i < keys.length; i++) {
        r.push([keys[i], json[keys[i]]]);
    }
    return r;
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
            var act = getActivities(),
				table = document.createElement("table"),
				colName1 = document.createElement("th"),
				colName2 = document.createElement("th");
            console.log(act);
			colName1.innerHTML = "Club Name";
			colName2.innerHTML = "Times Attended";
			table.appendChild(colName1);
			table.appendChild(colName2);
            for(var i = 0; i < Object.keys(act).length; i++) {
                var row = document.createElement("tr"),
					cell1 = document.createElement("td"),
					cell2 = document.createElement("td");
                cell1.innerHTML = Object.keys(act)[i];
				cell2.innerHTML = act[Object.keys(act)[i]];
                row.appendChild(cell1);
				row.appendChild(cell2);
				table.appendChild(row);
            }
			mod.appendChild(table);
        } else if(s == "pie") {
            header.innerHTML = "Pie Chart of 8th Periods:";
            /*var api = document.createElement("script");
            api.setAttribute("src", "scripts/loader.js");
            document.getElementsByTagName('body')[0].appendChild(api);*/
            var act = getActivities();
                //pie = genPieGraph(act);
            //mod.appendChild(pie);
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Activity');
            data.addColumn('number', 'Attended');
            var temp = jsonToArray(act);
            console.log(temp);
            data.addRows(temp);
            var options = {
              width: 400,
              height: 400
            };
            var chart = new google.visualization.PieChart(mod);
            chart.draw(data, options);
            
        }
        modWrap.appendChild(header);
        modWrap.appendChild(mod);
        parent.appendChild(modWrap);
    }
};
