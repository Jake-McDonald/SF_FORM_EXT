document.addEventListener("DOMContentLoaded", function() {initButtons()});

function initButtons()
{
    var button1 = document.getElementById("callButton");
    button1.addEventListener("click", sendCallInfoToBackground);
    var button2 = document.getElementById("emailButton");
    button2.addEventListener("click", sendEmailInfoToBackground);
}

function sendCallInfoToBackground()
{
    console.log("Test button was clicked!");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {"command": "sendCallInfoToBackground"}, function (response) {
        })})
}

function sendEmailInfoToBackground()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {"command": "sendEmailInfoToBackground"}, function (response) {
        })})
}