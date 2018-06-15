'use strict';
let formURL = "https://docs.google.com/forms/d/e/1FAIpQLScUdkxnCW0OES8BQkItvnpQ_oOYhjdSHFA4bE4Oo1cIxB55vw/viewform";
var salesforceFields = salesforceFormFields;
var trackerFieldsIDs = trackerFields;

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'smarttechnologies.my.salesforce.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command === "getSalesforceFields") {
            sendResponse(salesforceFields);
            console.log("Sent response!!!");
        }
        else if(request.command === "openTrackerForm")
        {
            console.log("Tracker form opened");
        }
        else {console.log("No matching command found!")}
    });
function createFormUrl(caseNotes)
{
}


let launchForm = function(formUrl) {
	chrome.tabs.create({ url: formUrl });
}