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
    var tierTwoName = trackerFields.tierTwoName + "=" + "Jacob";
    var tierTwoNameFormatted = tierTwoName.split(' ').join('+');
    entries.push(tierTwoNameFormatted);
    entries.push(trackerFields.caseNumber + "=" + caseNotes.caseNumber); //doesn't require formatting
    if(caseNotes.type === "call")
    {
        //Add the agent name to the URL
        var agentName = trackerFields.tierOneName + "=" + caseNotes.tierOneAgentName;
        var agentNameFormatted = agentName.split(' ').join('+');
        //Add comment field (currently used for resource links) to the URL
        var commentText = trackerFields.resourceProvided + "=" + caseNotes.commentText;
        var commentTextFormatted = commentText.split(' ').join('+');
        //Add default outcome for consultations
        var outcome = trackerFields.outcome + "=" + "T1 continued call/email with support from T2";
        var outcomeFormmated = outcome.split(' ').join('+');
        //Set interaction type to Phone
        var contactMethod = trackerFields.contactMethod + "=" + "Agent - Phone";
        var contactMethodFormatted = contactMethod.split(' ').join('+');
        //Push the entries to an array
        entries.push(commentTextFormatted);
        entries.push(agentNameFormatted);
        entries.push(outcomeFormmated);
        entries.push(contactMethodFormatted);
    }
    else if(caseNotes.type === "email")
    {
        var outcome = trackerFields.outcome + "=" + "T2 handled elevation received by email";
        var outcomeFormatted = outcome.split(' ').join('+');
        var contactMethod = trackerFields.contactMethod + "=" + "Agent - Email";
        var contactMethodFormatted = contactMethod.split(' ').join('+');
        entries.push(outcomeFormatted);
        entries.push(contactMethodFormatted);
    }
    var notesSummary = parseCaseNotes(caseNotes);
    entries.push(trackerFields.agentInquiry + "=" + notesSummary.agentInquiry);
    entries.push(trackerFields.tierTwoActionsTaken + "=" + notesSummary.tierTwoActionsTaken);
    for(var i = 0; i < entries.length; i++)
    {
        prefilledURL += "&" + entries[i];
    }
    return prefilledURL;
}

function parseCaseNotes(notes)
{
    var templateRegex = /(?:IB: )([\s\S]*)(?:OB: )([\s\S]*)/g;
    var summarySplit = templateRegex.exec(notes.callWrapNotes);
    if(summarySplit !== null)
    {
        var agentInquiry = summarySplit[1];
        var tierTwoActionsTaken = summarySplit[2];
        var agentInquiryFormatted = agentInquiry.split(' ').join('+');
        var tierTwoActionsTakenFormatted = tierTwoActionsTaken.split(' ').join('+');
        var summary =
        {
            unparsedSummary: notes,
            agentInquiry: agentInquiryFormatted,
            tierTwoActionsTaken: tierTwoActionsTakenFormatted
        }
        return summary;
    }
    else
    {
         var parseErrorMessage = "Unable to parse task summary.";
         var parseErrorMessageFormatted = parseErrorMessage.split(' ').join('+');
         var summary =
         {
             unparsedSummary: notes,
             agentInquiry: parseErrorMessageFormatted,
             tierTwoActionsTaken: parseErrorMessageFormatted
         }
         return summary;
    }
}

let launchForm = function(formUrl) {
    chrome.tabs.create({ url: formUrl });
}