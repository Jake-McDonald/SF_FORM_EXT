'use strict';

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
        else {console.log("No matching command found!")}
    });
function createFormUrl(caseNotes)
{
}