// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.runtime.onMessage.addListener(function(request, sender) {
	console.log('request:', request);
	console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
	if (request.action == 'start') {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, { file: 'scrape.js' });
		});
	}
	return;
});

// if (chrome.webNavigation) {
// 	chrome.webNavigation.onDOMContentLoaded.addListener(function(data) {
// 		console.log('next page loaded. Continue scraping...>>>>>>>>>>>>>>>>>>>>>>>', data);
// 		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// 			chrome.tabs.executeScript(tabs[0].id, { file: 'scrape.js' });
// 			chrome.runtime.sendMessage({ action: 'start' }, function(response) {
// 				console.log('sendMessage: response=', response);
// 			});
// 		});
// 	});
// }

// if (chrome.declarativeContent) {
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// 		chrome.declarativeContent.onPageChanged.addRules([
// 			{
// 				conditions: [
// 					new chrome.declarativeContent.PageStateMatcher({
// 						pageUrl: { urlContains: 'sfa_sg/raise/client/getPolicyOwnerList.do' }
// 					})
// 				],
// 				actions: [ new chrome.declarativeContent.ShowPageAction() ]
// 			}
// 		]);
// 	});
// }

// chrome.runtime.onInstalled.addListener(function() {
// 	chrome.storage.sync.get('outreach', function(data) {
// 		if (!data) {
// 			chrome.storage.sync.set({
// 				outreach: {
// 					clients: {},
// 					total: 0
// 				}
// 			});
// 		} else {
// 			console.log('synced outreach:', data);
// 			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// 				console.log(tabs);
// 				// let el = document.getElementsByTagName('tr')[11].childNodes[1].innerText.split('\n');
// 				chrome.tabs.executeScript(tabs[0].id, { code: 'console.log(document.body);' });
// 			});
// 		}
// 	});
// });

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// 	chrome.declarativeContent.onPageChanged.addRules([
// 		{
// 			conditions: [
// 				new chrome.declarativeContent.PageStateMatcher({
// 					pageUrl: { urlContains: 'sfa.prudential.com.sg/sfa_sg/raise/client/getPolicyOwnerList.do' }
// 				})
// 			],
// 			actions: [ new chrome.declarativeContent.ShowPageAction() ]
// 		}
// 	]);
// });
