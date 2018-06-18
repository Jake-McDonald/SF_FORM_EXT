'use strict';

//These variables are pulled from salesforceFields.js in form_field_config
var salesforceFields = salesforceFormFields;
var trackerFieldsIDs = trackerFields;
var formURL = trackerFieldsIDs.trackerURL; 

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
            var prefilledURL = createFormURL(request);
            launchForm(prefilledURL);
            console.log("Tracker form opened");
            console.log("URL created: " + prefilledURL);
        }
        else {console.log("No matching command found!")}
    });
function createFormURL(caseNotes)
{
    var prefilledURL = formURL;
    var entries = [];
    entries.push(trackerFields.tierOneName + "=" + caseNotes.agentName);
    entries.push(trackerFields.caseNumber + "=" + caseNotes.caseNumber);
    
    //Split the call wrap summary into inquiry and actions taken
    var templateRegex = /(?:IB:)([\w\s]+)(?:OB:)([\w\s]+)/g;
    var summarySplit = templateRegex.exec(caseNotes.callWrapNotes);
    var agentInquiry = summarySplit[1];
    var tierTwoActionsTaken = summarySplit[2];
    var agentInquiryFormatted = agentInquiry.split(' ').join('+');
    var tierTwoActionsTakenFormatted = tierTwoActionsTaken.split(' ').join('+');
    
    entries.push(trackerFields.agentInquiry + "=" + agentInquiryFormatted);
    entries.push(trackerFields.tierTwoActionsTaken + "=" + tierTwoActionsTakenFormatted);
    
    for(var i = 0; i < entries.length; i++)
    {
        prefilledURL += "&" + entries[i];
    }
    
    return prefilledURL;
}


let launchForm = function(formUrl) {
    chrome.tabs.create({ url: formUrl });
}