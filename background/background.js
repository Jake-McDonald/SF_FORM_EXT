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
    var agentName = trackerFields.tierOneName + "=" + caseNotes.tierOneAgentName;
    var agentNameFormatted = agentName.split(' ').join('+');
    var tierTwoName = trackerFields.tierTwoName + "=" + "Jacob";
    var tierTwoNameFormatted = tierTwoName.split(' ').join('+');
    entries.push(agentNameFormatted);
    entries.push(trackerFields.caseNumber + "=" + caseNotes.caseNumber);
    entries.push(tierTwoNameFormatted);
    
    //Split the call wrap summary into inquiry and actions taken
    var templateRegex = /(?:IB:)([\s\S]*)(?:OB:)([\s\S]*)/g;
    var summarySplit = templateRegex.exec(caseNotes.callWrapNotes);
    if(summarySplit !== null)
    {
        var agentInquiry = summarySplit[1];
        var tierTwoActionsTaken = summarySplit[2];
        var agentInquiryFormatted = agentInquiry.split(' ').join('+');
        var tierTwoActionsTakenFormatted = tierTwoActionsTaken.split(' ').join('+');
    
        entries.push(trackerFields.agentInquiry + "=" + agentInquiryFormatted);
        entries.push(trackerFields.tierTwoActionsTaken + "=" + tierTwoActionsTakenFormatted);
    }
    else
    {
        var parseErrorMessage = "Unable to parse call notes";
        entries.push(parseErrorMessage.split(' ').join('+'));
    }
    var commentText = trackerFields.resourceProvided + "=" + caseNotes.commentText;
    var commentTextFormatted = commentText.split(' ').join('+');
    entries.push(commentTextFormatted);
    
    for(var i = 0; i < entries.length; i++)
    {
        prefilledURL += "&" + entries[i];
    }
    
    return prefilledURL;
}


let launchForm = function(formUrl) {
    chrome.tabs.create({ url: formUrl });
}