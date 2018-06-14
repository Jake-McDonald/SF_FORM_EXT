var callWrapID;
var commentTextID;
var emailTaskSummaryID;
var callWrapSaveButton;
var caseNumber;
var tierOneAgentName;
var callResult;

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function(response) {
        callWrapID = response.callWrapSummary;
        commentTextID = response.commentText;
        emailTaskSummaryID = response.taskSummary;
        callWrapSaveButton = response.callWrapSaveButton;
        tierOneAgentName = response.agentName;
        callResult = response.callResult;
        caseNumber = response.caseNumber;
    }
)

var saveButton = document.getElementById(callWrapSaveButton);
if(saveButton != null)
{
    console.log("Save button in call wrap was clicked");
    caseNotes = getCaseNotes();
    if(caseNotes != null)
    {       saveButton.addEventListener('click', function(){ sendCaseNotesToBackground(caseNotes)});
    }
}

function getCaseNotes()
{
    var caseNotes =
    {
        caseNumber: document.getElementById(caseNumber).value,
        callWrapNotes: document.getElementById(callWrapID).value,
        commentText: document.getElementById(commentTextID).value,
        agentName: document.getElementById(tierOneAgentName).value,
        callResult: document.getElementById(callResult).value
    }
    
    return caseNotes;
};


function sendCaseNotesToBackground(notes)
{
    console.log("Sending case notes to background");
    chrome.runtime.sendMessage(notes, 
        function(response) {
            console.log("Case notes received by background script");
        }
    )
};

    
    