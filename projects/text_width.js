// TO DO:
// [] Better text width measurement (svg outline perhaps?)
// [] Allcaps toggle
// [] different font options
//		[] width
//		[] font
// [] generate code
// [] Vertical spacing

// [] Figure out weird behaviour with monospace fonts

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

// Returns the font pt to set string to to be goal_width pixels
function getPtForWidth(string, goal_width){
	let tolerance = 0.1; // tolerance in pixels
	let difference = Infinity;
	let max_pt = 10000;
	let min_pt = 0;
	let font_pt;

	while(Math.abs(difference) > tolerance){
		font_pt = (max_pt + min_pt)/2;
		font_width = getTextWidth(string, "bold " + font_pt + "pt arial");
		difference = goal_width - font_width;
		if (goal_width > font_width){
			min_pt = font_pt;
		} else {
			max_pt = font_pt;
		}
	}
	return font_pt;
}

function display_line(string, width){
	let pt = getPtForWidth(string, width);
	document.getElementById('front').innerHTML += '<span id="line" style="font:bold ' + pt + 'pt arial;background-color: white;">' + string + '</span><br>';
}

function rectify(text, width){
	let lines = text.split(/\r?\n/);
	lines = lines.filter(x => x); // Remove empty lines
	let n = lines.length;
	// Reset
	document.getElementById('front').innerHTML = '';
	for(let i=0; i<n; i++){
		display_line(lines[i], width);
	}
}

function main(){
	let text = document.getElementById('text_input').value.toUpperCase();
	rectify(text, 400);
}

main();