
var letters = [
	"Z","Z","H","H","A","A","N","N","G","G","H","H","U","U","A","A"
]

var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


var usedNums = [];

var firstNum = "";

var compareLetters = [];
var compareIds = [];

var clickCount = 0;

var nameCount = 0;


$(function(){
	$(".cell").on("click",showLetter);
	$("#footMsg span").hide();
});

function showLetter(){
	if("" == $(this).children()[0].innerText){
		clickCount++;
		$("#clickCount").text(clickCount);
		var letterNum = selectRandomLetter();
		$(this).children().html(letters[letterNum]);
		$(this).children().fadeIn("slow");
		compareIds.push(this.id);
		compareLetters.push(letters[letterNum]);

		if(clickCount%2 == 0){
			if(compareLetters[0] == compareLetters[1]){
				nameCount++;
				$("#" + compareIds[0]).off();
				$("#" + compareIds[1]).off();
				$("#" + compareIds[0]).addClass("changedTD");
				$("#" + compareIds[1]).addClass("changedTD");
				updateData(clickCount,nameCount);
				showHidenLetter(compareLetters[0]);
				if(nameCount == 8){
					$("#msgHeader").fadeIn(1000,function(){
						if(window.confirm("恭喜！您共点击" + clickCount + 
							"次。点击确认可以重新开始游戏。")){
							location.reload();
						}
					});
					
				}
			}else{
				usedNums.pop();
				usedNums.pop();
				numbers.push(letterNum);
				numbers.push(firstNum);
				$("#" + compareIds[0]).children().fadeOut(800,function(){
					$(this).empty();
				});
				$("#" + compareIds[1]).children().fadeOut(800,function(){
					$(this).empty();
				});				
			}
			compareLetters = [];
			compareIds = [];
		}else{
			firstNum = letterNum;
		}

	}
}

function updateData(clickCount,nameCount){
	if(clickCount / nameCount > 40){
		$("#lackyVal").text("20");
	}else if(clickCount / nameCount > 20){
		$("#lackyVal").text("50");
	}else if(clickCount / nameCount > 16){
		$("#lackyVal").text("70");
	}else if(clickCount / nameCount > 12){
		$("#lackyVal").text("80");
	}else if(clickCount / nameCount > 7){
		$("#lackyVal").text("90");
	}else if(clickCount / nameCount > 4){
		$("#lackyVal").text("92");
	}else{
		$("#lackyVal").text("95");
	}


}


function selectRandomLetter(){
	var randomNumber = Math.floor(Math.random() * numbers.length);
	var selectNum = numbers[randomNumber];
	usedNums.push(selectNum);
	numbers.remove(randomNumber);
	return selectNum;
	
}


function showHidenLetter(letter){
	$.each(letters,function(index,value){
		if (value == letter) {
			var l = Math.floor((index + 2)/2);
			$("#letter" + l).fadeIn(1000);
		};
	})
}


Array.prototype.remove=function(dx) { 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 




