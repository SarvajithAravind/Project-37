class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    background("yellow")
    question.hide();
    textSize(30);
    text("RESULT", 200, 50)
    //Contestant.getPlayerInfo();
    var contestantInfoRef = database.ref('contestants');
    contestantInfoRef.on("value",(data)=>{
      allContestants = data.val();
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
        {
        fill("Green")
        textSize(20);
        text(allContestants[plr].name +"...." + allContestants[plr].answer, 130, 330)
        }
        else
        {
          fill("red")
          textSize(20);
          text(allContestants[plr].name +"...." + allContestants[plr].answer, 130, 430)
        }
      }
  
      
      if(allContestants !== undefined){
        fill("blue")
        textSize(20);
        text("*NOTE: Contestant who answered correct are highlighted in green colour!", 130, 230)
      }
    })
   
    


   
    

    
    
    

    
  }

}
