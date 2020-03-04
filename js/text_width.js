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
var context = canvas.getContext("2d");

function getTextMetrics(text, font) {
  context.font = font;
  const metrics = context.measureText(text);
  return {
    width: metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft,
    actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
  };
};

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
		metrics = getTextMetrics(string, font);
		difference = goal_width - metrics.width;
		if (goal_width > metrics.width){
			min_px = font_px;
		} else {
			max_px = font_px;
		}
		counter++;
	}
    // metrics = getTextMetrics(string, font);
    console.log("MATCH");
    return {font_px: font_px, margin: metrics.actualBoundingBoxLeft};
}

function display_line(string, width) {
	let deets = getPxForWidth(string, width);
	let html = '<p style="font-weight: bold; font-size: ' + deets.font_px + 'px; margin-left: ' + deets.margin + 'px">' + string + '</p>';
	return html
}

function rectify(text, width) {
	let lines = text.split(/\r?\n/);
	lines = lines.filter(Boolean); // Remove empty lines
	let n = lines.length;
	// Reset
	document.getElementById('rect_text').innerHTML = ''
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

main();
