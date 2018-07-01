
$(document).ready(function(){
    
    var loses = 0;
    var wins = 0;
    var scissors = 3;
    var rock = 2;
    var paper = 1;
    var player1
   
    
    $("#nameForm").submit(function(e){
        e.preventDefault();
        console.log($(".nameInput").val());
        $("#nameForm").hide();
        $(".weclomeText").show()
        $(".weclomeText").text("Welcome " + e.target[0].value +" you are player 1!")

        // firebase.database().ref("hello").set('two');
        firebase.database().ref("/users").push({"username":e.target[0].value})
    });



    $(".btns1").click(function(e){
        
        $("playerChoices1").push(e.target.innerText);
        
    });

    $(".btns2").click(function(e){
        
       $("playerChoices2").html(e.target.innerText);
        
    });





    $(".submission").click(function(e){
        e.preventDefault();
        console.log($(".writeField").val());
        
        $(".talkField").append("<div class='self'>"+$(".writeField").val() +'</div>');   
        
    });



    // $("")













});




// $(".submission").on("click" (function(e){
//     console.log(this.value);
    
// })