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
    var radio = document.querySelector('#open-in-radio-group');
    radio.addEventListener("click", (event) => {
        if(event.target.tagName.toUpperCase() === "INPUT") {
            let value = event.target.value;
            saveOpenWithState(value);
        }
    });
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
    })
    chrome.storage.local.get("openMethod", (result => {
        if(result.openMethod === "new-tab")
        {
            checkRadio(document.querySelector("#option-1"));
            uncheckRadio(document.querySelector("#option-2"));
        }
        else
        {
            checkRadio(document.querySelector("#option-2"));
            uncheckRadio(document.querySelector("#option-1"));
        }
    })
    )
}
function uncheckRadio(element)
{
    element.parentNode.MaterialRadio.uncheck();
}
function checkRadio(element)
{
    element.parentNode.MaterialRadio.check();
}

function switchOn(element)
{
    element.MaterialSwitch.on();
}
function switchOff(element)
{
    element.MaterialSwitch.off();
}
function saveSwitchState(switchElement, state)
{
    var switchName = switchElement.getAttribute("name");
    var switchState = {};
    switchState[switchName] = state;
    chrome.storage.local.set(switchState, function() {
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

function saveOpenWithState(openWithState)
{
        let state = {};
        let key = "openMethod";
        state[key] = openWithState; 
        chrome.storage.local.set(state, (event) => {console.log("State of open with saved")})
}