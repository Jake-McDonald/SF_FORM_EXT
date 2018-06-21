document.addEventListener("DOMContentLoaded", function() {initTestButton()});


function initTestButton()
{
    var button1 = document.getElementById("testButton");
    button1.addEventListener("click", sendCallInfoToBackground);
}

/*
function sendCallInfoToBackground()
{
    console.log("Test button was clicked!");
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"command": "sendCallInfoToBackground"})
    })
}
*/

function sendCallInfoToBackground()
{
    console.log("Test button was clicked!");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {"command": "sendCallInfoToBackground"}, function (response) {
        })})
}