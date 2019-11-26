$("body").ready(function () {
    
    $("#btnwrite").css({ 'background-color': 'rgb(255, 147, 5)' });
    $("#btncalc").css({ 'background-color': 'rgb(202, 116, 4)' });
    $("#btnwrite").val(1);
    $("#btncalc").val(0);
    $("#contentType").html("Press Start and then within 5 seconds write the word that will be displayed below.");
    let bestResultWriting = 'BestcoreWriting';
    let bestResult = sessionStorage.getItem(bestResultWriting); 
    $("#bestScore").html(bestResult);
});

$("#btnwrite").click(function () {
    $("#btnwrite").css({ 'background-color': 'rgb(255, 147, 5)' });
    $("#btncalc").css({ 'background-color': 'rgb(202, 116, 4)' });
    $("#btnwrite").val(1);
    $("#btncalc").val(0);
    $("#contentType").html("Press Start and then within 5 seconds write the word that will be displayed below.");
    let bestResultWriting = 'BestcoreWriting';
    let bestResult = sessionStorage.getItem(bestResultWriting); 
    $("#bestScore").html(bestResult);
});

$("#btncalc").click(function () {
    $("#btncalc").css({ 'background-color': 'rgb(255, 147, 5)' });
    $("#btnwrite").css({ 'background-color': 'rgb(202, 116, 4)' });
    $("#btncalc").val(1);
    $("#btnwrite").val(0);
    $("#contentType").html("Press Start and then within 5 seconds enter the result of the equation, which will be displayed below.");  
    let bestResultCalculation= 'Calculation';
    let bestResult = sessionStorage.getItem(bestResultCalculation); 
    $("#bestScore").html(bestResult); 

});

$("#startTask").click(function () {
    $("#startTask").attr("disabled", true);
    $("#answer").focus();
    if ($("#btnwrite").val() == 1) 
    {   
        let bestResultWriting = 'BestcoreWriting';
        let bestResult = sessionStorage.getItem(bestResultWriting); 
        $("#bestScore").html(bestResult);  
        test(words, bestResultWriting);   
    }
    else if ($("#btncalc").val() == 1)
    {
        let bestResultCalculation= 'Calculation';;
        let bestResult = sessionStorage.getItem(bestResultCalculation); 
        $("#bestScore").html(bestResult); 
        test(equations, bestResultCalculation);
    }
    else
        alert("SOMETHING GOES WRONG! \rPlease refresh this page.");
});

const test = (content, best) => {

    var bestResult = sessionStorage.getItem(best); 
      
    if (bestResult>0){
        var bestScore = bestResult
        $("#bestScore").html(bestResult);      
    }
    else{
        var bestScore = 0;
        $("#bestScore").html();    
    }

    let difficult = 0;
    let quest = content[difficult][Math.floor(content[difficult].length * Math.random())];
    let lastQuest = quest.word;

    $("#question").html(quest.word);
    let i=0;
    
    $("#answer").keyup(function () {
            var scoreVal = parseInt($("#score").html()); 
            
            if(i==0){               
                timer(true);
                timeBar(false);
                i=1;
            }
        
            let answVal =  $("#answer").val().toLowerCase();


            if (quest.result == answVal)
            {
                timer(false);
               // timeBar(true);

                $(".timeBar").remove();
               
                $("#answer").val("");

                scoreVal = scoreVal+1;
                $("#score").html(scoreVal);

                if(scoreVal%5==0 && scoreVal<=20)
                {
                    difficult = difficult+1;
                }

                //if który w przypadku posiadania powyżej 20 pkt bedzie losował słowo ze wszystkich słów(lub działań) w pliku data.js
                if(scoreVal>20)
                {
                    difficult = Math.floor(4*Math.random());
                }

                while(lastQuest==quest.word)
                {
                    quest = content[difficult][Math.floor(content[difficult].length * Math.random())];   
                }
                lastQuest=quest.word;
                
                $("#question").html(quest.word);
                 
                timer(true);
                //timeBar(false);
                
                //w ms edge nie działała w pełni poprawnie funkcja timebar dlaego został zastosowany sposób z remove i append
                $(".sideBarLeft").append('<div id="timeBar" class="timeBar"></div>');
                $(".sideBarRight").append('<div class="timeBar"></div>');

                if(scoreVal>bestScore){
                    $("#bestScore").html(scoreVal);
                    sessionStorage.setItem(best, scoreVal);
                }
            } 
        });
    }
    
const timeLeft = () =>{
    
    $("#yourScore").html("Your score: "+$("#score").html());
    $("#loseWindow").attr("hidden", false);
    $("#answer").attr("disabled", true);   
}

const timer = (start) =>{
    if(start==true){ timeStart = setTimeout(timeLeft, 5000);}
    if(start==false){clearTimeout(timeStart);}
}

const timeBar = (startBar) =>{
    if(startBar==true){$(".timeBar").attr("hidden", true);}
    if(startBar==false){$(".timeBar").attr("hidden", false);}
}

$("#playAgain").click(function () {     
    timeBar(true);
    $("#startTask").attr("disabled", false);
    $("#question").html("Be ready");
    $("#score").html("0"); 
    $("#answer").val(""); 
    $("#loseContent").animate({height: "0%"},3000)
    $(".lostInfo").animate({opacity: "0"},3000)
    setTimeout(function(){$("#loseWindow").attr("hidden", true); }, 3000)
    $("#loseContent").animate({height: "100%"})
    $(".lostInfo").animate({opacity: "100"})   
    $("#answer").attr("disabled", false);
});



