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

function downloadCaptionFile(captionId) {
	console.log(captionId);
	var request = gapi.client.youtube.captions.download({
		id: captionId,
		tfmt: 'srt'
	});
	request.then(function(response) {
		console.info('response = ', response);
		captions = response.body;
		text_content = captions.split('\n');
		for (var i = 0; i < text_content.length; i++) {
			if (i % 4 == 2) {
				displayed_text += text_content[i] + '<br>';
			}
		}
		console.info('displayed text =\n', displayed_text);
		displayText();
		console.info('text_content = ',text_content);
	}, function() {
		console.error('damned');
	});
}
