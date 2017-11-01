function urlMatch( daUrl, patt) {
	var newpatt = patt.replace(/\*(?=.)/g, ".*?");
	newpatt = newpatt.replace(/\*(?!.)/g, ".*");
	var re = new RegExp(newpatt);
	if(re.test(daUrl)) {
		if(re.exec(daUrl)[0] == daUrl) {
			return(true);
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "settings.html"});
});

console.log('working fine');
chrome.webNavigation.onCompleted.addListener( function(details) {

		console.log("page has loaded");
		chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
		var activeTab= tabs[0];
		var currentUrl = activeTab.url;
		console.log(currentUrl);
		try {
		chrome.storage.local.get("worb", function(result) {
		var worb = result.worb;
		console.log(worb);
		if (worb != "white" && worb != "black") {
		console.log("Neither");
		chrome.tabs.create({"url": "settings.html"});
		}
		else if(worb == "white") {
			console.log("Got to white");
			chrome.storage.local.get("wurls", function(result2) {
			var wurls = result2.wurls;
			for(x in wurls) {
				console.log(wurls[x]);
			}
			var bout = false;
			var i = 0;
			try {
			while(i < wurls.length && !bout) {
				console.log(urlMatch(currentUrl, wurls[i]));
				if(urlMatch(currentUrl, wurls[i])) {
				chrome.tabs.executeScript({"file": "jquery-1.12.2.min.js"});
				chrome.tabs.executeScript({"file": "erowid.js"});
				chrome.storage.local.get("chems", function(result3) {
				var listOfChems = result3.chems;
				chrome.storage.local.get("links", function(result4) {
				var listOfLinks = result4.links;
				chrome.tabs.sendMessage(details.tabId, {"message": "Here_are_chems", "chems": listOfChems, "links": listOfLinks});
				bout = true;
				});
				});
				}
				i++;
			}
			}
			catch(err2) {
				console.log(err2.stack);
				alert("Oops! Looks like your preferences aren't set.");
				chrome.storage.local.set({"burls": "*://*wikipedia*"});
				chrome.tabs.create({"url": "settings.html"});
			}
			});
		}
		else {
			console.log("Got to black");
			chrome.storage.local.get("burls", function(result2) {
			var burls = result2.burls;
			for(x in burls) {
				console.log(burls[x]);
			}
			var inject = true;
			var bout = false;
			var i = 0;
			try {
			while(i < burls.length && !bout) {
				console.log(urlMatch(currentUrl, burls[i]));
				if(urlMatch(currentUrl, burls[i])) {
				console.log("Gottem");
				inject = false;
				bout = true;
				}
				i++;
			}
			console.log(inject);
			if(inject) {
				console.log("injecting...");
				chrome.tabs.executeScript({"file": "jquery-1.12.2.min.js"});
				chrome.tabs.executeScript({"file": "erowid.js"});
				console.log("Executing...");
				chrome.storage.local.get("chems", function(result3) {
				var listOfChems = result3.chems;
				console.log("Got chems");
				chrome.storage.local.get("links", function(result4) {
				var listOfLinks = result4.links;
				console.log("Got links");
				chrome.tabs.sendMessage(details.tabId, {"message": "Here_are_chems", "chems": listOfChems, "links": listOfLinks});
				console.log("sent message");
				});
				});
				}
			}
			catch(err2) {
				console.log(err2.stack);
				alert("Oops! Looks like your preferences aren't set.");
				chrome.storage.local.set({"burls": "*://*wikipedia*"});
				chrome.tabs.create({"url": "settings.html"});
			}
			});
		}
		});
		}
		catch(err) {
			console.log(err.stack);
			alert("Oops! Looks like your preferences aren't set.");
			chrome.storage.local.set({"burls": "*://*wikipedia*"});
			chrome.tabs.open({"url": "settings.html"});
		}
		});
});