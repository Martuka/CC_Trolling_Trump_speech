var displayed_text;
var text_content;

var textarea;
var nounInput;
var nounThresh;
var verbInput;
var verbThresh;

function preload() {
	// text_content = loadStrings('text/textfile.txt');
	displayed_text = '';
	text_content = loadStrings('text/captions.sbv');
}

function setup() {
	for (var i = 0; i < text_content.length; i++) {
		displayed_text += text_content[i] + '<br>';
	}
	prepareHTML();
}

function draw() {
}

// This function builds the web page HTML elements
function prepareHTML() {
	var title = createElement('h1', 'Trolling Trump');

	textarea = createDiv(displayed_text);
	textarea.id('text');
	textarea.class('text-display');

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

	nounThresh = createInput('');
	nounThresh.id('thresh_noun')
	nounThresh.type = 'number';
	nounThresh.attribute('placeholder', '%');
	nounThresh.attribute('min', '0');
	nounThresh.attribute('max', '100');
	nounThresh.attribute('value', '50');
	nounThresh.attribute('size', '3');
	nounThresh.style('border', '0');

	verbInput = createInput('');
	verbInput.id('verb');
	verbInput.type = 'text';
	verbInput.attribute('placeholder', 'verb');
	verbInput.attribute('value', '');
	verbInput.style('border', '0');

	verbThresh = createInput('');
	verbThresh.id('thresh_verb')
	verbThresh.type = 'number';
	verbThresh.attribute('placeholder', '%');
	verbThresh.attribute('min', '0');
	verbThresh.attribute('max', '100');
	verbThresh.attribute('value', '50');
	verbThresh.attribute('size', '3');
	verbThresh.style('border', '0');

	var buttonDiv = createDiv('');
	buttonDiv.id('input');

	var submit = createButton('Submit');
	submit.mousePressed(submition);

	nounInput.parent(nounDiv);
	nounThresh.parent(nounDiv);
	verbInput.parent(verbDiv);
	verbThresh.parent(verbDiv);
	submit.parent(buttonDiv);

	title.style('margin-top', '2cm');
	title.parent('sketchContainer');
	nounDiv.style('margin-top', '2cm');
	nounDiv.parent('sketchContainer');
	verbDiv.parent('sketchContainer');
	buttonDiv.style('margin-top', '1cm');
	buttonDiv.parent('sketchContainer');

	var areaWidth = (windowWidth / 6) * 4;
	textarea.style('max-width', areaWidth);
	textarea.style('margin-top', '2cm');
	textarea.parent('sketchContainer');

}

function submition() {

	var new_text = troll(textarea.html(), nounInput.value(), (100 - (+nounThresh.value()))/100, ['nn', 'nns']);
	new_text = troll(new_text, verbInput.value(), (100 - (+verbThresh.value()))/100, ['vb', 'vbp', 'vbg']);
		textarea.html(new_text);
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
