var loginButton = document.getElementById("loginbutton");

 document.addEventListener("DOMContentLoaded", function(event) {
     initButtons();
  });

  
function initButtons()
{
    var loginButton = document.getElementById("loginbutton");
    loginButton.addEventListener("click", loginHandler);
}
  
function loginHandler()
{
    var userName = document.getElementById("username").value;
    if(userName === "")
    {
        document.getElementById("loginerror").innerHTML = "You must enter a name.";
        document.getElementById("loginerror").style.color = "red";
        console.log("No user name entered");
    }
    else
    {
        chrome.storage.sync.set({"user": userName}, function(){
            console.log(userName + " successfully signed in.");
        })
        chrome.runtime.sendMessage({command: "setPopup", popup: "main"});
        //Make sure username is set immediately. Username is otherwise only updated on Chrome tab creation.
        chrome.runtime.sendMessage({"command": "setUserName", "userName": userName});
        location.href = "popup.html";
    }
}