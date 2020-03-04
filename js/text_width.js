// TO DO:
// [] Better text width measurement (svg outline perhaps?)
// [] Allcaps toggle
// [] different font options
//		[] width
//		[] font
// [] generate code
// [] Vertical spacing

// [] Figure out weird behaviour with monospace fonts

var font;
var canvas = document.createElement("canvas");
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */

function getTextMetrics(text, font) {
  var context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return {
    width: metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft,
    actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
  };
};

// function getTextWidthPixels(text, font) {
//     var context = canvas.getContext("2d");
//     context.font = font;
//     var metrics = context.measureText(text);
//     var width = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft;
//     return width;
// }

// function getCharAdvanceWidth(char) {
// 	glyph = Object.values(font.glyphs.glyphs).find(entry => entry.unicode === char.charCodeAt(0))
// 	return glyph.advanceWidth;
// }

// function getTextWidthFull(text) {
// 	var width = 0;
// 	for(let i=0;i<text.length;i++) {
// 		// width += getCharMetrics(text[i]).xMax;
// 		width += getCharAdvanceWidth(text[i]);
// 	}
// 	return width;
// }

// function getEdgesWidth(text) {
// 	var metrics = getCharMetrics(text[0])
// 	var width = metrics.leftSideBearing;
// 	metrics = getCharMetrics(text[text.length-1])
// 	width += metrics.rightSideBearing;
// 	return width;
// }

// function getRealWidth(text, font) {
// 	var width_1 = getTextWidthPixels(text, font);
// 	var width_2 = getTextWidthFull(text);
// 	var edge_width = getEdgesWidth(text, font);

// 	return (width_2 - edge_width) * (width_1 / width_2)
// }

// function getLeftEdgeWidthPixels(text, font) {
// 	var edge_1 = getCharMetrics(text[0]).leftSideBearing;
// 	var width_1 = getTextWidthPixels(text, font);
// 	var width_2 = getTextWidthFull(text);
// 	return edge_1 * width_1 / width_2;
// }

// Returns the font px to set string to to be goal_width pixels
function getPxForWidth(string, goal_width) {
	let tolerance = 0.5; // tolerance in pixels
	let difference = Infinity;
	let max_px = 10000;
	let min_px = 0;
	let font_px;
	let counter = 0;
	let font;

	while(Math.abs(difference) > tolerance && counter < 100) {
		font_px = (max_px + min_px)/2;
		font = font_px + "px fira";
		// font_width = getTextWidthPixels(string, font_px + "px fira");
		// font_width = getRealWidth(string, font);
		metrics = getTextMetrics(string, font);
		// console.log(font_width, font_width_2);
		// console.log(font_width);
		difference = goal_width - metrics.width;
		if (goal_width > metrics.width){
			min_px = font_px;
		} else {
			max_px = font_px;
		}
		counter++;
	}
    // margin = getLeftEdgeWidthPixels(string, font);
    // metrics = getTextMetrics(string, font);
    console.log("MATCH");
    return {font_px: font_px, margin: metrics.actualBoundingBoxLeft};
}

function display_line(string, width) {
	let deets = getPxForWidth(string, width);
	let html = '<p style="font-weight: bold; font-size: ' + deets.font_px + 'px; margin-left: ' + deets.margin + 'px">' + string + '</p>';
	// console.log(deets.margin)
	return html
}

function rectify(text, width) {
	let lines = text.split(/\r?\n/);
	lines = lines.filter(Boolean); // Remove empty lines
	let n = lines.length;
	// Reset
	// document.getElementById('rect_text').innerHTML = ''
	let html = '<p>';
	for(let i=0; i<n; i++){
		html += display_line(lines[i].trim(), width, html);
	}
	document.getElementById('rect_text').innerHTML = html + '</p>';
}

function main() {
	let text = document.getElementById('text_input').value.toUpperCase().trim();
	rectify(text, 300);
}

// function loadFont() {
// 	opentype.load('https://opentype.js.org/fonts/FiraSansMedium.woff', function(err, loadedFont) {
// 	    if (err) {
// 	        alert('Font could not be loaded: ' + err);
// 	    } else {
// 	    	font = loadedFont;
// 	    	main();
// 	    	// console.log(getCharMetrics("H"))
// 	    	// console.log(getCharMetrics("I"))

// 	    	// console.log(getTextWidthFull("H"))
// 	    	// console.log(getTextWidthFull("E"))

// 	    	// console.log(getCharAdvanceWidth("H"))
// 	    	// console.log(getCharAdvanceWidth("E"))
// 	    }
// 	});
// }

// function getCharMetrics(char) {
// 	glyph = Object.values(font.glyphs.glyphs).find(entry => entry.unicode === char.charCodeAt(0))
// 	metrics = glyph.getMetrics()
// 	// console.log(glyph)
// 	return metrics
// }

main();
// loadFont();



