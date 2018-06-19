// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let formURL = "https://docs.google.com/forms/d/e/1FAIpQLScUdkxnCW0OES8BQkItvnpQ_oOYhjdSHFA4bE4Oo1cIxB55vw/viewform";

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("testButton").addEventListener("click", sendCallInfoToBackground);
});

let launchForm = function(formUrl) {
	chrome.tabs.create({ url: formUrl });
}

function sendCallNotesToBackground()
{
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "sendCallInfoToBackground"})
        };
    )
}