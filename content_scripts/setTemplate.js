'use strict;'

var summaryHeight = "140px";

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function(response) {
        console.log("Sent request to background script for Salesforce field IDs");
        if(response !== null) {
            var formElements = {
                callWrapSummary: document.getElementById(response.callWrapSummary),
                commentText: document.getElementById(response.commentText),
                emailTaskSummary: document.getElementById(response.taskSummary)
            };
            console.log("Received Salesforce field IDs");
            setTemplates(formElements);
        }
    }
)

function setTemplates(formElements)
{
    //Set call wrap 
    if (formElements.callWrapSummary !== null && formElements.commentText !== null) {
        formElements.callWrapSummary.style.height = summaryHeight;
        if (formElements.callWrapSummary.value === "") //check if field empty
        {
            formElements.callWrapSummary.value = "T2 Consult\nIB:\nOB:";
            formElements.commentText.value = "NA";
            console.log("Set call template");
        }
    }

    //Sets email task summary
    if (formElements.emailTaskSummary !== null) {
        formElements.emailTaskSummary.style.height = summaryHeight;
        if (formElements.emailTaskSummary.value === "") //check if field empty
        {
            formElements.emailTaskSummary.value = "T2 Elevation\nIB:\nOB:";
            console.log("Set email template"); 
        }
    }
};
