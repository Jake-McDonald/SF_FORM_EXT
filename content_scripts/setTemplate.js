'use strict;'

var callWrapID;
var commentTextID;
var emailTaskSummaryID;

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function(response) {
        if(response !== null) {
            callWrapID = response.callWrapSummary;
            commentTextID = response.commentText;
            emailTaskSummaryID = response.taskSummary;
            console.log("Received Salesforce field IDs");
        }
    }
)

var wrapSummary = document.getElementById(callWrapID);
var commentText = document.getElementById(commentTextID);
var emailTaskSummary = document.getElementById(emailTaskSummaryID);


//Set call wrap 
if (wrapSummary !== null && commentText !== null) {
    wrapSummary.style.height = "140px";
    console.log("Call Wrap Summary: " + wrapSummary.value);
    if (wrapSummary.value === "") //check if field empty
    {
        wrapSummary.value = "T2 Consult\nIB:\nOB:";
        commentText.value = "NA";
    }
}

//Sets email task summary
if (emailTaskSummary !== null) {
    emailTaskSummary.style.height = "140px";
    if (emailTaskSummary.value === "") //check if field empty
    {
        emailTaskSummary.value = "T2 Elevation\nIB:\nOB:";
    }
}