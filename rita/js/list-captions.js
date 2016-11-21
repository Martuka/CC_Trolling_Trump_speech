
function listCaptionFiles(videoID) {
	var request = gapi.client.youtube.captions.list({
		part: 'snippet',
		videoId: videoID
	});
	request.execute(function(response) {
		var captionFilesList = response.result.items;

		if (captionFilesList) {
			console.log('caption id = ' + captionFilesList[0].id);
			downloadCaptionFile(captionFilesList[0].id);
		} else {
			alert('Ooops, no caption file found for this video !');
		}
	});
}

// var captionFile;
function downloadCaptionFile(captionId) {
	console.log(captionId);
	var request = gapi.client.youtube.captions.download({
		id: captionId
	});
	request.execute(function(response, data) {
		var captionFile = response;
		console.log(data);
		console.log('response type = ' + captionFile.constructor.name + ', value = ' + captionFile);
		// var blob = new Blob(captionFile, {type: 'application/octet-stream'});
		// var storedFile = 'daCaption.srt';
		// saveAs(blob, storedFile);
	});
	foo(captionId);
}

function foo(captionId) {
	// gapi.client.init({
	// 	'apiKey': 'AIzaSyDbIp0hmHzxt9_O126wE4C8Pe8tAdz6C0k',
	// 	'clientId': '704589813215-d5r81u4qermi1prrotbjfdjvr3r1s08n.apps.googleusercontent.com',
	// 	'scope': [
	// 		'https://www.googleapis.com/auth/youtube',
	// 		'https://www.googleapis.com/auth/youtubepartner'
	// 	]
	// });
	// gapi.client.load('youtube', 'v3');
	console.log('caption id again = ' + captionId);
	gapi.client.request({
		path: 'https://www.googleapis.com/youtube/v3/captions/opfhyxTT7dth5VWyGTnvhfvIexQtfFCu'
	}).execute(function(response) {
		console.log('In foo, resp = ' + response + ', of type ' + response.constructor.name);
	});

	// var xhr = new XMLHttpRequest();
	// var req = {
	// 	path: 'https://www.googleapis.com/youtube/v3/captions/',
	// 	params: {
	// 		id: captionId
	// 	}
	// };
	// xhr.open('GET', req);
	// // xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
	// xhr.send();
	// console.log(xhr.responseText);
}

// var sampleBytes = new Int8Array(4096);
//
// var saveByteArray = (function () {
// 	var a = document.createElement("a");
// 	document.body.appendChild(a);
// 	a.style = "display: none";
// 	return function (data, name) {
// 		var blob = new Blob(data, {type: "octet/stream"}),
// 			url = window.URL.createObjectURL(blob);
// 		a.href = url;
// 		a.download = name;
// 		a.click();
// 		window.URL.revokeObjectURL(url);
// 	};
// }());
//
// saveByteArray([sampleBytes], 'daCaptionFile.txt');
