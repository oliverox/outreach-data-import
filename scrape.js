console.log('starting scrape...');
let data;

function scrapePage() {
	console.log('fn scrapePage()...');
	console.log('outreach data from storage:', data);
	let tables = document.getElementsByTagName('table');
	let tableHeader = tables[5];
	let tableData = tables[6];
	let tableDataRows = tableData.getElementsByTagName('tr');
	let tableHeaderRows = tableHeader.getElementsByTagName('tr');
	let total = parseInt(tableHeaderRows[0].innerText.split('\t')[1].split('of ')[1].split('First')[0].trim());
	let next = tableHeaderRows[0].childNodes[3].childNodes[1].childNodes[3];
	let nextUrl = next && next.getAttribute('href') ? next.getAttribute('href') : '';

	for (let i = 1; i < tableDataRows.length; i = i + 4) {
		let [ fullName, id, otherDetails ] = tableDataRows[i].innerText.split('\n');
		let address = tableDataRows[i + 1].innerText.split('Residential Address:')[1].trim();
		let d = otherDetails.split('\t');
		let phoneNumber = d[2].trim();
		let nationality = d[4].trim().toLowerCase();
		let gender = d[5].trim().toLowerCase();

		if (fullName) {
			fullName = fullName.split(' ').splice(1).join(' ');
		}
		if (phoneNumber.indexOf('65-') >= 0) {
			phoneNumber = phoneNumber.split('65-')[1];
		}
		if (gender !== 'male' && gender !== 'female') {
			gender = 'others';
		}
		data.outreach.total = total;
		data.outreach.clients[id] = {
			fullName,
			phoneNumber,
			nationality,
			gender,
			address
		};
	}
	data.outreach.parsed = Object.keys(data.outreach.clients).length;
	chrome.storage.sync.set(data, function() {
		console.log(`Progress: ${Math.round(Object.keys(data.outreach.clients).length / data.outreach.total * 100)}%`);
		console.log('Current page has been scraped and data synced.', data);
		chrome.runtime.sendMessage({ action: 'stop', output: JSON.stringify(data.outreach) });
	});
}

chrome.storage.sync.get('outreach', function(storageData) {
	if (!storageData || !storageData.outreach) {
		console.log('Storage data not found, so create new...');
		data = {
			outreach: {
				clients: {},
				parsed: 0,
				total: 0
			}
		};
		chrome.storage.sync.set(data, scrapePage);
	} else {
		data = storageData;
		scrapePage();
	}
});
