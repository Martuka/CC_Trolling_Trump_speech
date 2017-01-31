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
	var data = new FormData();
	webvtt = 'WEBVTT\n\n'+captionFile;
	data.append("data" , captionFile);
	// data.append("data" , webvtt);
	data.append("filename", videoId);
	var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	xhr.open('POST', 'php/savefile.php', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			alert(xhr.responseText);
			console.log("videoId = ", videoId, ", videoTitle = ", videoTitle);
			displayVideo(videoId);
		}
	};

	xhr.send(data);
	$("#text").css("display", "none");
}

function displayVideo(videoId) {

	HTMLContent = '<!DOCTYPE html>\n';
	HTMLContent += '<html lang="en">\n';
	HTMLContent += '<head>\n';
	HTMLContent += '<meta charset="UTF-8">\n';
	HTMLContent += '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n';
	HTMLContent += '<title>Trolling Trump</title>\n';
	HTMLContent += '<meta name="viewport" content="width=device-width,initial-scale=1">\n';
	HTMLContent += '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">\n';
	HTMLContent += '<link rel="icon" href="favicon.ico" type="image/x-icon">\n';
	HTMLContent += '<link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">\n';
	HTMLContent += '<link rel="stylesheet" href="../build/mediaelementplayer.css">\n';
	HTMLContent += '</head>\n';
	HTMLContent += '<body>\n';
	HTMLContent += '<div id="container">\n';
	HTMLContent += '<div class="players" id="player1-container">\n';
	HTMLContent += '<div class="media-wrapper">\n';
	HTMLContent += '<video id="player1" width="960" height="540" controls preload="metadata" autoplay="autoplay">\n';
	HTMLContent += '<source src="../videos/'+videoTitle+'.mp4" type="video/mp4">\n';
	HTMLContent += '<track srclang="en" kind="subtitles" src="../videos/'+videoId+'.srt">\n';
	HTMLContent += '</video>\n';
	HTMLContent += '</div>\n';
	HTMLContent += '</div>\n';
	HTMLContent += '<script src="../build/jquery.js"></script>\n';
	HTMLContent += '<script src="../build/mediaelement-and-player.min.js"></script>\n';
	HTMLContent += '<script src="../demo/demo.js"></script>\n';
	HTMLContent += '</body>\n';
	HTMLContent += '</html>\n';



	// ALTERHTMLContent = '<html>\n';
	// ALTERHTMLContent += '<head>\n';
	// ALTERHTMLContent += '<title>Trolled Trump</title>\n';
	// ALTERHTMLContent += '<script src="libs/jquery.js"></script>\n';
	// ALTERHTMLContent += '<script src="libs/mediaelement-and-player.js"></script>\n';
	// ALTERHTMLContent += '<link href="/mediaelement.js/mediaelementplayer.css" rel="stylesheet">\n';
	//
	// ALTERHTMLContent += '</head>\n'
	// ALTERHTMLContent += '<body>\n'
	// ALTERHTMLContent += '<div>\n';
	// ALTERHTMLContent += '<video class="mejs-player" data-mejsoptions=\'{"pluginPath": "/path/to/shims/", "alwaysShowControls": "true"}\' id="Subtitle" width="960" height="540" autoplay="autoplay" controls preload="metadata">\n';
	// ALTERHTMLContent += '<source src="videos/' + videoTitle + '.mp4" type="video/mp4" />\n';
	// ALTERHTMLContent += '<track kind="subtitles" srclang="en" label="trolled" src="videos/' + videoId + '.vtt" default></track>\n';
	// ALTERHTMLContent += '</video>\n';
	// ALTERHTMLContent += '</div>\n';
	// ALTERHTMLContent += '</body>\n'
	// ALTERHTMLContent += '<html>\n';
	// var data = new FormData();
	// data.append("data" , HTMLContent);
	// data.append("filename", 'video');
	// var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	// xhr.open('POST', 'php/prepareHTML.php', true);
	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState == 4) {
	// 		alert(xhr.responseText);
	// 		var win = window.open("video.html", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=960, height=540, top=" + (screen.height/2 - 270) + ", left=" + (screen.width/2 - 480));
	// 	}
	// };
	//
	// xhr.send(data);

	// FUCKING NOT WORKING EITHER ???
	var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=960, height=540, top=" + (screen.height/2 - 270) + ", left=" + (screen.width/2 -480));
	var newDocument = win.document;
	newDocument.write(HTMLContent);
	// newDocument.write(ALTERHTMLContent);
	newDocument.close();
}

function sleep(miliseconds) {
	var currentTime = new Date().getTime();
	while (currentTime + miliseconds >= new Date().getTime()) {
	}
}

function emptyVideoDiv() {
	document.getElementById("video-player").innerHtml = "";
}

function loadPlayr() {
	$.load("libs/playr.js");
}
function reloadPlayr() {
	var body = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'libs/playr.js';
	body.appendChild(script);
}
