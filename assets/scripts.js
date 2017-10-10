function displayQuote() {
	var color = randomColor();

	$.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&key=1&lang=en&jsonp=?", function(json){
		// console.log(json["quoteText"]);
		// console.log(json["quoteAuthor"]);
		var quote = json["quoteText"].replace("â€”", "--");
		var quoteAuthor = json["quoteAuthor"].length == 0 ? "Unknown Author" : json["quoteAuthor"]
		var quoteLink = json["quoteText"].length > 115 ? encodeURIComponent("\"" + quote.substring(0,114) + "...\" - ") : encodeURIComponent("\"" + quote + "\" - ")
		// console.log(quote);
		changeColor(color);
		$(".wrapper").fadeOut(500, function() {

			$(".quote").html("<span class='quoteMark'>&ldquo;</span>" + quote + "<span class='quoteMark'>&rdquo;</span>");
			$(".author").html("- " + quoteAuthor);
			$(".twitter-share").attr("href", "https://twitter.com/intent/tweet?text=" + quoteLink + quoteAuthor);
			$(".wrapper").fadeIn(1500);
		});
	});
}
//
function randomNum() {
	return Math.floor(Math.random() * 255);
}

function randomColor() {
	var color1 = randomNum();
	var color2 = randomNum();
	var color3 = randomNum();

	while (color1 + color2 + color3 > 550) {
		color1 = randomNum();
		color2 = randomNum();
		color3 = randomNum();
	}

	var randomColor = `rgb(${color1}, ${color2}, ${color3})`;

	return randomColor;
}

function changeColor(color) {
	// console.log(randomColor);
	$("body").css({
		backgroundColor: color,
	});
	$(".card").css({
		color: color
	})
	$("button").css({
		color: color,
		backgroundColor: "white",
		border: `2px solid ${color}`
	})

	$("button").mouseenter(function(){
		$(this).css({
			color: "white",
			backgroundColor: color
		});
	});

	$("button").mouseleave(function(){
		$(this).css({
			color: color,
			backgroundColor: "white"
		});
	});
}


$("document").ready(displayQuote);
$(".new-quote").on("click", displayQuote);
