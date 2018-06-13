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

if(callWrapSaveButton != null)
{
	console.log("Save button in call wrap was clicked");
	caseNotes = getCaseNotes();
	if(caseNotes != null)
	{		callWrapSaveButton.addEventListener('click', sendCaseNotesToBackground(caseNotes););
	}
}

function getCaseNotes()
{
	var caseNotes =
	{
		caseNumber: document.getElementById(caseNumber).value,
		callWrapNotes: document.getElementById(callWrapID).value,
		commentText: document.getElementById(commentTextID).value,
		agentName: document.getElementByID(tierOneAgentName).value,
		callResult: document.getElementByID(callResult).value
	}
	
	return caseNotes;
};


function sendCaseNotesToBackground(notes)
{
	console.log("Sending case notes to background");
	chrome.runtime.sendMessage(JSON.stringify(notes), 
		function(response) {
			console.log("Case notes recieved by background script");
		}
	)
};

	
	