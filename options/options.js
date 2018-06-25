document.addEventListener("DOMContentLoaded", function() {initButtons()});

function initButtons()
{
   var resetButton = document.getElementById("reset");
   resetButton.addEventListener("click", resetUserSettings);
}

function resetUserSettings()
{
    chrome.storage.sync.remove("user", function(item){console.log("User removed")});
    chrome.runtime.sendMessage({command: "setPopup", popup: "login"})
}