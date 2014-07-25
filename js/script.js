var gridRow = 16;
var gridCol = 16;
var gridBox = 30; // width=30px and height=30px
var containerSize = 576;
var paintedColor = "cyan";

$(document).ready(function() {
	$("#container").width(containerSize);
	$("#container").height(containerSize);
	createGrid();
	paint();
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
	} while (isNaN(gridRow));

	do {
		gridCol = prompt("Please enter a number for the COLUMNS");
	} while (isNaN(gridCol));

	$("#grid").remove();
	createGrid();
	paint();
}

function paint() {
	$(".box").one("mouseenter", function() {
		$(this).removeClass("box").addClass("painted");
		$(this).css("background-color", generateRandomColor());
	});
}

function generateRandomColor() {
	var rainbowColors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#8f00ff"];
	var hexColor = rainbowColors[Math.floor(Math.random()*6)];
	
	return hexColor;
}