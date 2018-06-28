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
    var switch1 = document.getElementById("templateAutofill");
    switch1.addEventListener("change", toggleTemplateAutofill);
    var switch2 = document.getElementById("autoCallFormSubmit");
    switch2.addEventListener("change", toggleAutoCallFormSubmit);
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

function toggleTemplateAutofill()
{
    /*
    var switch = document.getElementById("templateAutofill");
    if(switch.checked === true)
    {
        switchOff(switch);
    }
    else
    {
        switchOn(switch);
    }
    */
}

function toggleAutoCallFormSubmit()
{
    /*
    toggleCheckbox(document.getElementById("autoCallFormSubmit"));
    */
}

function setToggleStates()
{
    chrome.storage.local.get("templateAutofill", function(result) {
        console.log(result.templateAutofill);
        if(result.templateAutofill === true)
        {
            console.log("True!!!");
            switchOn(document.querySelector('.mdl-js-switch'));
        }
        else
        {
            switchOff(switchOn(document.querySelector('.mdl-js-switch')));
        }
    }
    )
    
    /*
    chrome.storage.local.get("autoCallFormSubmit", function(result) {
        if(result.autoCallFormSubmit === true)
        {
            switchOn(document.getElementById("autoCallFormSubmitLabel"));
        }
        else
        {
            switchOff(document.getElementById("autoCallFormSubmitLabel"));
        }
    }
    )
    */
}

function toggleCheckbox(element)
{
    element.checked = !element.checked;
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