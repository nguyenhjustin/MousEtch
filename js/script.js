var gridRow = 16;
var gridCol = 16;
var gridBox = 30; // width=30px and height=30px
var containerSize = 576;

var paintRed = "#ff0000";
var paintOrange = "#ff7f00";
var paintYellow = "#ffff00";
var paintGreen = "#00ff00";
var paintBlue = "#0000ff";
var paintPurple = "#8f00ff";
var rainbowColors = [paintRed, paintOrange, paintYellow, paintGreen, paintBlue, paintPurple];
var paintedColor = paintRed;

$(document).ready(function() {
	$("#container").width(containerSize);
	$("#container").height(containerSize);
	createGrid();
	paintHandler();

	// Event for a new grid
	var newGridButton = document.getElementById("newGridButton");
	if (newGridButton.addEventListener) {
		newGridButton.addEventListener("click", newGrid, false);
	}
	else if (newGridButton.attachEvent) {
		newGridButton.attachEvent("onClick", newGrid);
	}

	// Event for clearing grid
	var clearButton = document.getElementById("clearButton");
	if (clearButton.addEventListener) {
		clearButton.addEventListener("click", clearGrid, false);
	}
	else if (clearButton.attachEvent) {
		clearButton.attachEvent("onClick", clearGrid);
	}

	// Event for choosing a color
	var selectColorButton = document.getElementById("selectColorButton");
	if (selectColorButton.addEventListener) {
		selectColorButton.addEventListener("change", setColor, false);
	}
	else if (selectColorButton.attachEvent) {
		selectColorButton.attachEvent("onChange", setColor);
	}
	
});

function createGrid() {
	gridBox = ( containerSize - (gridCol*2*2) ) / gridCol;
	$("#container").append('<div id="grid"></div>');

	// Create the grid in O(i*j)?
	// for (var i = 0; i < gridRow; i++) {
	// 	$("#grid").append('<div class="row"></div>');

	// 	for (var j = 0; j < gridCol; j++) {
	// 		var num = i+1;
	// 		$(".row:nth-child(" + num + ")").append('<div class="box"></div>');
	// 	}
	// }

	// Create the grid in O(i+j)?
	$("#grid").append('<div class="row"></div>');
	var $row = $(".row");

	for (var j = 0; j < gridCol; j++) {
		$(".row:nth-child(1)").append('<div class="box"></div>');
	}

	for (var i = 1; i < gridRow; i++) {
		$("#grid").append($row.clone());
	}

	// Initialize each square's CSS properties
	$(".box").width(gridBox + "px");
	$(".box").height(gridBox + "px");
}

function newGrid() {
	do {
		gridRow = prompt("Please enter a number for the ROWS");

		if (gridRow === null) {
			return;
		}
	} while (isNaN(gridRow));

	do {
		gridCol = prompt("Please enter a number for the COLUMNS");

		if (gridCol === null) {
			return;
		}
	} while (isNaN(gridCol));

	$("#grid").remove();
	createGrid();
	paintHandler();
}

function clearGrid() {
	$(".painted").removeClass("painted").addClass("box");
	$(".box").css("background-color", "white");
	$(".box").on("mouseenter", paint);
	paintHandler();
}

function paintHandler() {
	$(".box").one("mouseenter", paint);
}

function paint() {
		$(this).removeClass("box").addClass("painted");

		if (paintedColor === "random") {
			$(this).css("background-color", generateRandomColor());
		}
		else {
			$(this).css("background-color", paintedColor);
		}
}

function generateRandomColor() {
	var hexColor = rainbowColors[Math.floor(Math.random()*6)];
	return hexColor;
}

function setColor() {
	var value = selectColorButton.options[selectColorButton.selectedIndex].value;
	switch (value) {
		case "paintRed":
			paintedColor = paintRed;
			break;
		case "paintOrange":
			paintedColor = paintOrange;
			break;
		case "paintYellow":
			paintedColor = paintYellow;
			break;
		case "paintGreen":
			paintedColor = paintGreen;
			break;
		case "paintBlue":
			paintedColor = paintBlue;
			break;
		case "paintPurple":
			paintedColor = paintPurple;
			break;
		default:
			paintedColor = value;
			break;
	}
}