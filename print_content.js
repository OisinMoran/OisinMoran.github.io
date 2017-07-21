var tagList = '';
var piece;
var selections = [];

function print(message, id) {
	var outputDiv = document.getElementById(id);
	outputDiv.innerHTML = message;
}

// Print Tag List
for (var i = 0; i < tags.length; i += 1) {
	tagList += '<button id = "' + tags[i] + '" class="button" onclick="displayList(id)">' + tags[i] + '</button>';
}
print(tagList, 'tags');


// Print Content List
function printContent() {
	var contentList = '';
	for (var i = 0; i < content.length; i += 1) {
		piece = content[i];
		// If piece has every tag selected
		if (selections.every(selection => piece.tags.indexOf(selection) !== -1)){
			contentList += '<a href="' + piece.link + '.html">' + piece.title + '</a><br>';
		}
	}
	print(contentList, 'content');
}

printContent();

function displayList(id) {
	var element = document.getElementById(id);
	index = selections.indexOf(id);
    if (index > -1){
    	element.style.backgroundColor = "#4a9eda";
    	selections.splice(index, 1);
    } else {
    	element.style.backgroundColor = "#006bb7";
    	selections.push(id);
    }
    printContent();
}