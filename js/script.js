var gridRow = 16;
var gridCol = 16;
var gridBox = 30; // width=30px and height=30px
var containerSize = 960;
var paintedColor = "cyan";

$(document).ready(function() {
	$("#container").width(containerSize);
	$("#container").height(containerSize);
	createGrid();
	paint();
});

function createGrid() {
	gridBox = ( containerSize - (gridCol*2*2) ) / gridCol;

	for (var i = 0; i < gridRow; i++) {
		$("#container").append('<div class="row"></div>');

		for (var j = 0; j < gridCol; j++) {
			var num = i+1;
			$(".row:nth-child(" + num + ")").append('<div class="box"></div>');
		}
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

	$(".row").remove();
	createGrid();
	paint();
}

function paint() {
	$(".box").hover(function() {
		$(this).removeClass("box");
		$(this).addClass("painted");
	});
}