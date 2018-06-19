var testCaseNotes = 
{
    command: "openTrackerForm",
    caseNumber: "12345",
    callWrapNotes: "T2 Consult\nIB: This is some inbound info\nOB: This is some outbound info",
    commentText: "This is a comment/link",
    agentName: "Taylor James"
}

chrome.runtime.sendMessage(testCaseNotes,
    function (response) {
        console.log("Sent test case notes to background script");
    }
);