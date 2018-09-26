'use strict';

//These variables are pulled from salesforceFields.js in form_field_config
var salesforceFields = salesforceFormFields;
var trackerFieldsIDs = trackerFields;
var formURL = trackerFieldsIDs.trackerURL;
var username;


chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ "templateAutofill": true }, function () {
        console.log("Default value of templateAutofill was set to true");
    });
    chrome.storage.local.set({ "autoCallFormSubmit": true }, function () {
        console.log("Default value of autoCallFormSubmit was set to true");
    });
});

chrome.tabs.onCreated.addListener(function () {
    console.log("Startup listener fired");
    chrome.storage.sync.get("user", function (result) {
        if (typeof result.user === 'undefined') {
            console.log("Didn't find user");
            popupHandler({ popup: "login" });
        }
        else {
            console.log("Found user: " + result.user);
            popupHandler({ popup: "main" });
        }
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.command === "getSalesforceFields") {
            sendResponse(salesforceFields);
            console.log("Sent response!!!");
        }
        else if (request.command === "openTrackerForm") {
            createFormURL(request, launchForm);
            console.log("Tracker form opened");
            console.log("URL created");
        }
        else if (request.command === "setPopup") {
            popupHandler(request);
            console.log("Popup change request recieved");
        }
        else if (request.command === "setUserName") {
            setUserName(request.userName);
        }
    });
function createFormURL(caseNotes, callback) {
    chrome.storage.sync.get("user", function (result) {
        var prefilledURL = formURL;
        var entries = [];
        var tierTwoName = trackerFields.tierTwoName + "=" + result.user;
        var tierTwoNameFormatted = tierTwoName.split(' ').join('+');
        entries.push(tierTwoNameFormatted);
        entries.push(trackerFields.caseNumber + "=" + caseNotes.caseNumber); //doesn't require formatting
        if (caseNotes.type === "call") {
            //Add the agent name to the URL
            var agentName = trackerFields.tierOneName + "=" + caseNotes.tierOneAgentName;
            var agentNameFormatted = agentName.split(' ').join('+');
            //Add comment field (currently used for resource links) to the URL
            var commentText = trackerFields.resourceProvided + "=" + encodeURIComponent(caseNotes.commentText);
            //Add default outcome for consultations
            var outcome = trackerFields.outcome + "=" + "T1 continued call/email with support from T2";
            var outcomeFormmated = outcome.split(' ').join('+');
            //Set interaction type to Phone
            var contactMethod = trackerFields.contactMethod + "=" + "Agent - Phone";
            var contactMethodFormatted = contactMethod.split(' ').join('+');
            //Push the entries to an array
            entries.push(commentText);
            entries.push(agentNameFormatted);
            entries.push(outcomeFormmated);
            entries.push(contactMethodFormatted);
        }
        else if (caseNotes.type === "email") {
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
        for (var i = 0; i < entries.length; i++) {
            prefilledURL += "&" + entries[i];
        }
        callback(prefilledURL);
    }
    )
}

function parseCaseNotes(notes) {
    var templateRegex = /(?:IB:)([\s\S]*)(?:OB:)([\s\S]*)/g;
    var summarySplit = templateRegex.exec(notes.callWrapNotes);
    if(summarySplit !== null)
    {
        var agentInquiry = encodeURIComponent(summarySplit[1].trim());
        var tierTwoActionsTaken = encodeURIComponent(summarySplit[2].trim());
        var summary =
        {
            unparsedSummary: notes,
            agentInquiry: agentInquiry,
            tierTwoActionsTaken: tierTwoActionsTaken
        }
        return summary;
    }
    else {
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

var launchForm = function (formUrl) {
    chrome.tabs.create({ url: formUrl });
}

function popupHandler(request) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        if (request.popup === "main") {
            chrome.browserAction.setPopup({ popup: "/popup/popup.html" });
            console.log("Setting popup to main");
        }
        else if (request.popup === "login") {
            console.log("Set popup to login");
            chrome.browserAction.setPopup({ popup: "/popup/login.html" });
        }
    })
}

function setUserName(name) {
    username = name;
}