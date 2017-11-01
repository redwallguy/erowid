$.get("https://www.erowid.org/general/big_chart.shtml", function(data) {
	var listOfChems = [];
	var listOfLinks = [];
	$("tr > td[class='subname'] > a", data).each( function(i) {
		listOfChems[i] = $(this).text();
		listOfLinks[i] = "https://erowid.org/" + $(this).attr("href");
	});	
	chrome.storage.local.set({'chems': listOfChems});
	chrome.storage.local.set({'links': listOfLinks});
});
$(document).ready(function() {
	$("#white").hide();
	chrome.storage.local.set({'worb': "black"});
	chrome.storage.local.get("burls", function(result) {
		chrome.storage.local.get("wurls", function(result2) {
			burls = result.burls;
			wurls = result2.wurls
			$("#whitetext").val(wurls);
			$("#blacktext").val(burls);
		});
	});
	$("input[name='bw']").click(function() {
		if($(this).attr("value") == "white") {
			$("#white").show();
			$("#black").hide();
			chrome.storage.local.set({'worb': "white"}, function() {
			console.log("w saved");
			});
		}
		if($(this).attr("value") == "black") {
			$("#black").show();
			$("#white").hide();
			chrome.storage.local.set({'worb': "black"}, function() {
			console.log("b saved");
			});
		}
	});
	$("#wbutton").click(function() {
		console.log("w clicked");
		var pat = /,\s*/;
		var wurls = $("#whitetext").val().split(pat);
		chrome.storage.local.set({'wurls': wurls}, function() {
		console.log("Saved wurls");
		});
		$.get("https://www.erowid.org/general/big_chart.shtml", function(data) {
	var listOfChems = [];
	var listOfLinks = [];
	$("tr > td[class='subname'] > a", data).each( function(i) {
		listOfChems[i] = $(this).text();
		listOfLinks[i] = "https://erowid.org/" + $(this).attr("href");
	});	
	chrome.storage.local.set({'chems': listOfChems});
	chrome.storage.local.set({'links': listOfLinks});
});
	alert("Preferences saved");
	});
	$("#bbutton").click(function() {
		console.log("b clicked");
		var pat = /,\s*/;
		var burls = $("#blacktext").val().split(pat);
		for(x in burls) {
		console.log(burls[x]);
		}
		chrome.storage.local.set({'burls': burls}, function() {
		console.log("Saved burls");
		});
		$.get("https://www.erowid.org/general/big_chart.shtml", function(data) {
	var listOfChems = [];
	var listOfLinks = [];
	$("tr > td[class='subname'] > a", data).each( function(i) {
		listOfChems[i] = $(this).text();
		listOfLinks[i] = "https://erowid.org/" + $(this).attr("href");
	});	
	chrome.storage.local.set({'chems': listOfChems});
	chrome.storage.local.set({'links': listOfLinks});
});
	alert("Preferences saved");
	});
	$("#cbutton").click(function() {
		console.log("c clicked");
		chrome.storage.local.clear();
		alert("Preferences cleared");
	});

});