document.addEventListener("DOMContentLoaded", function() {
    setToggleStates();
    initButtons()
    });
function initButtons()
{
    var button1 = document.getElementById("callButton");
    button1.addEventListener("click", sendCallInfoToBackground);
    var button2 = document.getElementById("emailButton");
    button2.addEventListener("click", sendEmailInfoToBackground);
    var switch1 = document.querySelector("#template");
    switch1.addEventListener("change", function(){
        toggleSwitchState(this)}
    );
    var switch2 = document.querySelector("#callForm");
    switch2.addEventListener("change", function(){
        toggleSwitchState(this)}
    );
}
function sendCallInfoToBackground()
{
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
function toggleSwitchState(switchElement)
{
    if(switchElement.MaterialSwitch.inputElement_.checked)
    {
        saveSwitchState(switchElement, true);
    }
    else
    {
        saveSwitchState(switchElement, false);
    }
}
function setToggleStates()
{
    chrome.storage.local.get("templateAutofill", function(result) {
        console.log(result.templateAutofill);
        if(result.templateAutofill === true)
        {
            switchOn(document.querySelector("#template"));
        }
        else
        {
            switchOff(document.querySelector("#template"));
        }
    }
    )
    chrome.storage.local.get("autoCallFormSubmit", function(result) {
        if(result.autoCallFormSubmit === true)
        {
            switchOn(document.querySelector("#callForm"));
        }
        else
        {
            switchOff(document.querySelector("#callForm"));
        }
    }
    )
}
function switchOn(element)
{
    element.MaterialSwitch.on();
    console.log("Switched on!");
}
function switchOff(element)
{
    element.MaterialSwitch.off();
    console.log("Switched off!");
}
function saveSwitchState(switchElement, state)
{
    var switchName = switchElement.getAttribute("name");
    var switchState = {};
    switchState[switchName] = state;
    chrome.storage.local.set(switchState, function() {
        console.log(switchName + " set to " + state + ".")
        }
    )
}

function updateContentScripts()
{
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {"command": "switchStatesUpdated"}, function (response) {
        })})
}
