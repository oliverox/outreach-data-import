let started = false;
let actionButton = document.getElementById('start');
let clearButton = document.getElementById('clear');
let data = {
	outreach: []
};
clearButton.addEventListener('click', function(e) {
	chrome.storage.sync.set(
		{
			outreach: {
				clients: {},
				parsed: 0,
				total: 0
			}
		},
		function() {
			console.log('storage cleared...');
		}
	);
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
	if (request.action == 'stop') {
		document.getElementById('output').value = request.output;
	}
});
actionButton.addEventListener('click', function(e) {
	chrome.runtime.sendMessage({ action: 'start' }, function(response) {
		console.log('sendMessage: response=', response);
	});
});
