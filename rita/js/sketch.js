var displayed_text;
var text_content;
var captions;

var textarea;
var nounInput;
var nounThresh;
var verbInput;
var verbThresh;
var uploadDiv;
var videoID;
var captionFile;
var videoTitle;

function preload() {
	displayed_text = '';
	text_content = [];
}

function setup() {
	prepareHTML();
}

function draw() {}

// This function builds the web page HTML elements
function prepareHTML() {
	var title = createElement('h1', 'Trolling Trump Speech');

	var nounDiv =  createDiv('');
	nounDiv.id('input');
	var verbDiv = createDiv('');
	verbDiv.id('input');

	nounInput = createInput('');
	nounInput.id('noun');
	nounInput.type = 'text';
	nounInput.attribute('placeholder', 'noun');
	nounInput.attribute('value', '');
	nounInput.style('border', '0');
	nounInput.style('background-color', 'blue');
	nounInput.style('color', 'black');

	nounThresh = createInput('');
	nounThresh.id('thresh_noun')
	nounThresh.type = 'number';
	nounThresh.attribute('placeholder', '%');
	nounThresh.attribute('min', '0');
	nounThresh.attribute('max', '100');
	nounThresh.attribute('size', '3');
	nounThresh.style('border', '0');
	nounThresh.style('background-color', 'blue');
	nounThresh.style('color', 'black');

	verbInput = createInput('');
	verbInput.id('verb');
	verbInput.type = 'text';
	verbInput.attribute('placeholder', 'verb');
	verbInput.attribute('value', '');
	verbInput.style('border', '0');
	verbInput.style('background-color', 'blue');
	verbInput.style('color', 'black');

	verbThresh = createInput('');
	verbThresh.id('thresh_verb')
	verbThresh.type = 'number';
	verbThresh.attribute('placeholder', '%');
	verbThresh.attribute('min', '0');
	verbThresh.attribute('max', '100');
	verbThresh.attribute('size', '3');
	verbThresh.style('border', '0');
	verbThresh.style('background-color', 'blue');
	verbThresh.style('color', 'black');

	var buttonDiv = createDiv('');
	buttonDiv.id('input');
	buttonDiv.style('padding-top', '10px');
	buttonDiv.style('padding-bottom', '10px');

	var submit = createButton('Submit');
	submit.mousePressed(submition);

	nounInput.parent(nounDiv);
	nounThresh.parent(nounDiv);
	verbInput.parent(verbDiv);
	verbThresh.parent(verbDiv);
	submit.parent(buttonDiv);

	title.parent('title');
	nounDiv.style('padding-top', '1cm');
	// nounDiv.style('padding-bottom', '1cm');
	nounDiv.parent('sketchContainer');
	verbDiv.parent('sketchContainer');
	// buttonDiv.style('margin-top', '1cm');
	buttonDiv.parent('sketchContainer');

	uploadDiv = createDiv('');
	uploadDiv.id('input');
	var uploadBtn = createButton('Upload');
	uploadBtn.mousePressed(uploadCaptionFile);
	uploadBtn.parent(uploadDiv);
	uploadDiv.style('padding-bottom', '0.5cm');
	// uploadDiv.style('display', 'none');
	uploadDiv.style('visibility', 'hidden');
	uploadDiv.parent('sketchContainer');
}

function submition() {
	var new_text = troll(textarea.html(), nounInput.value(), (100 - (+nounThresh.value()))/100, ['nn', 'nns']);
	new_text = troll(new_text, verbInput.value(), (100 - (+verbThresh.value()))/100, ['vb', 'vbp', 'vbg']);
	textarea.html(new_text);
	displayed_text = new_text;
	console.info('displayed text =\n', displayed_text);
	console.info('text_content before recreate function = ',text_content);
	uploadDiv.style('visibility', 'visible');
	recreateCaptionFile();
}

// This function replaces words in a text by a specified word using RiTa library
function troll(text, noun, thresh, pos_to_replace) {
	function toTitleCase(str) {
		return str.replace(/\w+/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	var suffixes = ["ac", "acity", "ocity", "ade", "age", "aholic", "oholic", "al", "algia", "an", "ian", "ance", "ant", "ar", "ard", "arian", "arium", "orium", "ary", "ate", "ation", "ative", "cide", "cracy", "crat", "cule", "cy", "cycle", "dom", "dox", "ectomy", "ed", "ee", "eer", "emia", "en", "ence", "ency", "ent", "er", "ern", "escence", "ese", "esque", "ess", "est", "etic", "ette", "ful", "fy", "gam", "gamy", "gon", "gonic", "hood", "ial", "ian", "iasis", "iatric", "ible", "ic", "ical", "ile", "ily", "ine", "ing", "ion", "ious", "ish", "ism", "ist", "ite", "itis", "ity", "ive", "ization", "ize", "less", "let", "like", "ling", "loger", "logist", "log", "ly", "ment", "ness", "oid", "ology", "oma", "onym", "opia", "opsy", "or", "ory", "osis", "ostomy", "otomy", "ous", "path", "pathy", "phile", "phobia", "phone", "phyte", "plegia", "plegic", "pnea", "scopy", "scope", "scribe", "script", "sect", "ship", "sion", "some", "sophy", "sophic", "th", "tion", "tome", "tomy", "trophy", "tude", "ty", "ular", "uous", "ure", "ward", "ware", "wise"];

	if (typeof pos_to_replace === 'undefined') {
		pos_to_replace = ['nnp', 'nn', 'nns', 'vb', 'vbp', 'vbg', 'rbr', 'jj'];
	}

	var graphs = text.split('<br>');

	graphs = graphs.map(function(text) {
		var pos = RiTa.getPosTags(text);
		var tokens = RiTa.tokenize(text);

		var out = '';

		for (var i = 0; i < tokens.length; i++) {
			var word = tokens[i];
			var tag = pos[i];

			// skip contractions
			if (word.indexOf("'") > -1) {
				out += ' ' + word;
				continue;
			}

			// skip punctuation
			if (RiTa.isPunctuation(word)) {
				out += word;
				continue;
			}

			var new_word = word;
			if (pos_to_replace.indexOf(tag) > -1) {
				new_word = noun;
				for (var j = 0; j < suffixes.length; j++) {
					if (word.search(suffixes[j] + '$') > -1) new_word += suffixes[j];
				}
			}

			if (word.charAt(0).toUpperCase() === word.charAt(0)) {
				new_word = toTitleCase(new_word);
			}

			if (new_word != word && Math.random() > thresh) {
				out += ' ' + new_word;
			} else {
				out += ' ' + word;
			}
		}

		return out;
	});

	return graphs.join('<br>');
}


function displayText() {
	textarea = createDiv(displayed_text);
	textarea.id('text');
	textarea.class('text-display');
	textarea.style('background-color', 'white');

	var areaWidth = (windowWidth / 6) * 4;
	// textarea.style('max-width', areaWidth);
	textarea.style('padding-top', '2cm');
	textarea.parent('sketchContainer');
}

function recreateCaptionFile() {
	var tmp = displayed_text.split('<br> ');
	var j = 0;
	var a = [];
	for (var i = 0; i < text_content.length; i++) {
		if (i % 4 == 2) {
			text_content[i] = tmp[j++];
		}
	}
	console.info('final file = ', text_content);
	captionFile = text_content.join('\n');
	console.log('captionFile = ', captionFile);
}

function uploadCaptionFile() {
	uploadFile(videoID);
}
