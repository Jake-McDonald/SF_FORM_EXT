console.log("getInputFields script started!")

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.command == "sendCallInfoToBackground")
    {
        console.log("Received message from popup!")
        sendResponse({message: "Message received by getInputFields"});
        chrome.runtime.sendMessage({command: "getSalesforceFields"},
            function (response) {
                var notes = getCaseNotes(response);
                if (notes !== undefined) {
                    
                    sendCaseNotesToBackground(notes);
                }
                else
                {
                    console.log("Not a call wrap frame");
                }
            }
        )
    }
});

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function (response) {
        var notes = getCaseNotes(response);
        if (notes !== undefined) {
            
            setSaveButtonListener(response, notes);
        }
        else
        {
            console.log("Not a call wrap frame");
        }
    }
)

function setSaveButtonListener(formIDs, caseNotes) {
   var saveButton = document.getElementsByName(formIDs.callWrapSaveButton)[0];
   saveButton.addEventListener('click', function () {
       sendCaseNotesToBackground(caseNotes);
       console.log("Save button in call wrap was clicked");
   })
    console.log("Call wrap saver button listener set!");
}

function getCaseNotes(formFields) {
    var caseNumberField = document.getElementById(formFields.caseNumberID);
    var callWrapField = document.getElementById(formFields.callWrapID);
    var commentField = document.getElementById(formFields.commentTextID);
    var tierOneAgentName = document.getElementsByName(formFields.tierOneAgentNameID)[0];
    var saveButton = document.getElementsByName(formFields.callWrapSaveButton)[0];
    
    if(caseNumberField && callWrapField && commentField && tierOneAgentName
        && saveButton)
    {
        var caseNotes =
            {
                command: "openTrackerForm",
                caseNumber: document.getElementById(formFields.caseNumberID).value,
                callWrapNotes: document.getElementById(formFields.callWrapID).value,
                commentText: document.getElementById(formFields.commentTextID).value,
                tierOneAgentName: document.getElementsByName(formFields.tierOneAgentNameID)[0].value
            }

        return caseNotes;
    }
};

function sendCaseNotesToBackground(notes) {
    console.log("Sending case notes to background");
    chrome.runtime.sendMessage(notes,
        function (response) {
            console.log("Case notes received by background script");
        }
    )
};

    
    