var callWrapSummary;
var commentText;
var emailTaskSummary;

chrome.runtime.sendMessage({command: "getSalesforceFields"},
    function(response) {
        //console.log(response.callWrapSummary);
    }
)

callWrapSummary = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id51');
commentText = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id52');
emailTaskSummary = document.getElementById('00N0P000006DxMi');

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