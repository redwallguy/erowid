chrome.runtime.onMessage.addListener( function(request, sender, response) {
try {
	if(request.message === "Here_are_chems") {
		var listOfChems = [];
		var listOfLinks = [];
		var i=0;
		for(i; i < request.chems.length; i++) {
			listOfChems[i] = request.chems[i];
			listOfLinks[i] = request.links[i];
		}
	}
$("p, ul, li , :header").each( function(index) {
	var j=0;
	for(j; j < listOfChems.length; j++) {
	var theRegEx = new RegExp("\\b" + listOfChems[j] + "\\b", "ig");
	var theLink = '<a href="' + listOfLinks[j] + '">' + listOfChems[j] + '</a>';
	var re = /<(?!a|\/a).*?>|<a.*?a>/g;
	var cont = $(this).html();
	var matchArr = re.exec(cont);
	var k=0;
	var relItems = cont.split(re);
	var cheminthere = false;
	for(x in relItems) {
		if(relItems[x].search(theRegEx) != -1) {
			cheminthere = true;
			console.log("chem there");
		}
		relItems[x] = relItems[x].replace(theRegEx, theLink);
	}
	if(cheminthere) {
	var finArr = [];
	while(k<relItems.length) {
		if(k<relItems.length-2) {
		finArr.push(relItems[k]);
		finArr.push(matchArr);
		matchArr = re.exec(cont)[0];
		}
		else if(k<relItems.length-1) {
		finArr.push(relItems[k]);
		finArr.push(matchArr);
		}
		else {
		finArr.push(relItems[k]);
		}
		k++;
	}
	var finhtml = finArr.join("");
	$(this).html(finhtml);
	}
	}
});
}
catch(err2) {
	console.log(err2.stack);
}
	});