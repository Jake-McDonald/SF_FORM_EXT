// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let formURL = "https://docs.google.com/forms/d/e/1FAIpQLScUdkxnCW0OES8BQkItvnpQ_oOYhjdSHFA4bE4Oo1cIxB55vw/viewform";
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function() {
  //let color = element.target.value;
  //chrome.tabs.query({active: true, currentWindow: true}, function) {
    chrome.tabs.executeScript(
	{file: '/content_scripts/testURLCreation.js'} )
	//chrome.runtime.sendMessage

        //{code: 'document.body.style.backgroundColor = "' + color + '";'});
};

let launchForm = function(formUrl) {
	chrome.tabs.create({ url: formUrl });
}