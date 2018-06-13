//var formFields;
var callWrapID;
var commentTextID;
var emailTaskSummaryID;


chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function(response) {
        callWrapID = response.callWrapSummary;
		commentTextID = response.commentText;
		emailTaskSummaryID = response.taskSummary;
    }
)


var callWrapSummary = document.getElementById(callWrapID);
var commentText = document.getElementById(commentTextID);
var emailTaskSummary = document.getElementById(emailTaskSummaryID);


//Set call wrap 
if (callWrapSummary != null && commentText != null) {
    callWrapSummary.style.height = "140px";
    console.log("Call Wrap Summary: " + callWrapSummary.value);
    if (!!callWrapSummary) //check if field empty
    {
        callWrapSummary.value = "T2 Consult\nIB:\nOB:";
        commentText.value = "NA";
    }
}

if (emailTaskSummary != null) {
    emailTaskSummary.style.height = "140px";
    if (!!emailTaskSummary) //check if field empty
    {
        emailTaskSummary.value = "T2 Elevation\nIB:\nOB:";
    }
}