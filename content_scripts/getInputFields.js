console.log("getInputFields script started!")

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function (response) {
        setSaveButtonListener(response);
    }
)

function setSaveButtonListener(formIDs) {
    var saveButton = document.getElementsByName(formIDs.callWrapSaveButton)[0];
    if (saveButton != null) {
        console.log("Save button found!");
        var formElements = getFormElements(formIDs);
        var caseNotes = getCaseNotes(formElements);
        if (caseNotes != null) {
            console.log("Call wrap saver button listener set!");
            saveButton.addEventListener('click', function () {
                sendCaseNotesToBackground(caseNotes);
                console.log("Save button in call wrap was clicked");
            });
        }
        else console.log("Case notes was null");
    }
    else console.log("Save button was null");
}

function getFormElements(elementIDs)
{
    var formElements =
    {
        callWrapID: elementIDs.callWrapSummary,
        commentTextID: elementIDs.commentText,
        emailTaskSummaryID: elementIDs.taskSummary,
        callWrapSaveButtonID: elementIDs.callWrapSaveButton,
        tierOneAgentNameID: elementIDs.agentName,
        callResultID: elementIDs.callResult,
        caseNumberID: elementIDs.caseNumber
    }
    return formElements;
}

function getCaseNotes(formFields) {
    var caseNotes =
        {
            command: "openTrackerForm",
            caseNumber: document.getElementById(formFields.caseNumberID).value,
            callWrapNotes: document.getElementById(formFields.callWrapID).value,
            commentText: document.getElementById(formFields.commentTextID).value
            tierOneAgentName: document.getElementById(formFields.tierOneAgentNameID).value
            //callResult: document.getElementById(formFields.callResultID).value
        }

    return caseNotes;
};


function sendCaseNotesToBackground(notes) {
    console.log("Sending case notes to background");
    chrome.runtime.sendMessage(notes,
        function (response) {
            console.log("Case notes received by background script");
        }
    )
};

    
    