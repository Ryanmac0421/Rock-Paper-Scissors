
$(document).ready(function(){
    
    var database = firebase.database();         //
    var chatData = database.ref("/chat");       //
    var playersRef = database.ref("players");   //
    var currentTurnRef = database.ref("turn");  //
    var username = "Guest";                     //
    var currentPlayers = null;                  //
    var currentTurn = null;                     //  
    var playerNum = false;                      //
    var playerOneExists = false;                //
    var playerTwoExists = false;                //
    var playerOneData = null;                   //
    var playerTwoData = null;                   //
    var wins = 0
    var losses =0

    var user 
    var userData
   
    //funcction hides user name box


    function showForm (count) {
    
        if (count <2 && userData== undefined) {
            $("#nameForm").show();  

        }
        else {
            $("#nameForm").hide();
        }
    };

    // This is stop playing
    function pause (count) {
        if (users <2) {
            $(".btns1, .btns2").hide()
        }
    }
    function reset() {
        $(".playerChoices1").hide()
        $(".btn").show()
        $("#winning").text(wins)
        $("#loser").text(losses)

    } 


    $(".wins1, .wins2, .loses1, .loses2 , .btn").hide();
    
    
    //first logon
    firebase.database().ref("/users").once('value').then(function(snap){
         //   console.log(snap.numChildren());//
            showForm(snap.numChildren());




            
    });
    //new data
    firebase.database().ref("/users").on("value", function(snap) {
       // console.log(snap.val());
        showForm(snap.numChildren());
        var people = []
        snap.forEach(element => {
            if(element.val().pick != undefined){
                people.push({key:element.key,pick:element.val().pick})
            }            
        });
        if(people.length > 1){
            reset()
            userData.update({pick:null})
        console.log(people[0].pick , people[1].pick );
        if(people[0].pick == people[1].pick){
            alert("tie")

        } else if(people[0].pick == "rock"){
            if (people[1].pick == "scissors") {
                // rock wins
                wins++
                userData.update({wins:wins})
            } else {
                // paper wins
                losses++
                userData.update({losses:losses})
            }
        }
        else if(people[0].pick == "paper"){
            if (people[1].pick == "rock") {
                // rock wins
                wins++
                userData.update({wins:wins})
            } else {
                // paper wins
                losses++
                userData.update({losses:losses})
            }
        }
        else{
            if (people[1].pick == "paper") {
                // rock wins
                wins++
                userData.update({wins:wins})
            } else {
                // paper wins
                didWin(people[0].key, false)
                
            }

        }
        
        }


      });
    

    $("#nameForm").submit(function(e){
        e.preventDefault();
       // console.log($(".nameInput").val());
        $("#nameForm").hide();
        $(".weclomeText").show()
        $(".weclomeText, .helloName, .helloName2").text("Welcome " + e.target[0].value +" you are player 1!")
        $("h3").hide("");
        $(".wins1, .wins2, .loses1, .loses2").show();

        
        $("#winLoses1").text("hello")

         userData = firebase.database().ref("/users").push({"username":e.target[0].value})
       // console.log(userData);
        user =e.target[0].value
        userData.onDisconnect().remove();
        $(".btn").show()

        
    });


    $(".btn").click(function(e){
        var st = e.target.innerText
        $(".playerChoices1").html(" You chose " + e.target.innerText + "!");
        $(".btn").hide();
        var x = {"pick" : st }
        userData.update(x)
    });
  

    $(".submission").click(function(e){
        e.preventDefault();
        //console.log($(".writeField").val());
        
        $(".talkField").append("<div class='self'>"+$(".writeField").val() +'</div>');   
        
    });


    function didWin(key ,WOrL) {
      if (key == user) {
          if (WOrL) {
              wins++
          }else {
              losses++
          }
          
      } else {
            if (WOrL) {
            losses++
        }   else {
            wins++
        }   
      }
    }

    userData.update({wins:wins, losses:losses})

});


