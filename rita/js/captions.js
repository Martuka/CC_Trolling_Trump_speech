function listCaptionFiles(videoID) {
	var request = gapi.client.youtube.captions.list({
		part: 'snippet',
		videoId: videoID
	});
	console.log('request = ', request);
	request.execute(function(response) {
		var captionFilesList = response.result.items;
		console.log('response = ', response);
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
		captions = response.body;
		console.log('caption reponse = ', response);
		text_content = captions.split('\n');
		for (var i = 0; i < text_content.length; i++) {
			if (i % 4 == 2) {
				displayed_text += text_content[i] + '<br>';
			}
		}
		console.info('displayed text =\n', displayed_text);
		displayText();
		console.info('text_content = ', text_content);
	}, function() {
		console.error('damned');
	});
}

function uploadFile(videoId) {
	// var data = new FormData();
	// data.append("data" , captionFile);
	// data.append("filename", videoId);
	// var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	// xhr.open( 'POST', 'php/saveFile.php', true );
	// xhr.send(data);

	var datas = {
		'data': captionFile,
		'filename': videoId
	};
	$.ajax({
		url: 'php/savefile.php',
		type: 'POST',
		data: datas,
		success: function(data, textStatus, xhr) {
			alert(textStatus);
			alert(xhr);
			displayVideo();
		},
		error: function(message, plop, blah) {
			alert('error');
			console.log(message);
			console.log(plop);
			console.log(blah);
		}
	});

	$("#playr_video_0").attr("src", 'videos/' + videoTitle + '.mp4');
	$("#playr_track_0_0").attr("src", 'subs/' + videoId + '.srt');

	$("#text").css("display", "none");
}

function displayVideo() {
	$("#video-player").css("visibility", "visible");
}
// function uploadFile(videoId) {
// 	console.info('VideoID = ', videoId);
// 	var snippet = {
// 		videoId: videoId,
// 		language: 'lang',
// 		name: 'subs'
// 	};
//
// 	var resource = {
// 		kind: 'youtube#caption',
// 		snippet: snippet
// 	};
//
// 	var request = gapi.client.youtube.captions.insert({
// 		part: 'snippet',
// 		resource: resource
// 	});
//
// 	request.execute(function(response) {
// 		console.log('upload response = ', response);
// 	});
// }
