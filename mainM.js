window.onload = () => {

    let score = document.getElementById("score");
    let cps = document.getElementById("cps");
    let cookie = document.querySelector("#cookie");
    let checkB1 = document.getElementById("checkB1");
    let checkB2 = document.getElementById("checkB2");
    let checkB3 = document.getElementById("checkB3");
    let checkB4 = document.getElementById("checkB4");
    let B1 = document.getElementById("B1");
    let B2 = document.getElementById("B2");
    let B3 = document.getElementById("B3");
    let B4 = document.getElementById("B4");
    let total = document.getElementById("total");
    let Game = {
        scoreJs: 0,
        total: 0,
        
        possAutocl:  true,
        onAutoclick: false,
        B2Js: 200,
        
        onMultiplCl: true,
        incrementeur: 1,
        multiplicateur: 1,
        B1Js: 50,
        
        store:[
            {
                id: 0,
                multiplicateur: 20,
                times: 0,
                useTimes: 0,
                available: false,
                useAvailable: false
            }
        ],
    }

    /* Fonction et Click pour Cookie */

    cookie.addEventListener("click", function(){

        if(Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * 20);
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        } else {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        } 
    })

    /* Fonction et Click pour Multiplicateur */

    function executeB1(){
        if (Game.onMultiplCl === true){
            Game.multiplicateur ++
        }
    }

    function pricePlusMulti(){
        if (Game.onMultiplCl === true){
            Game.B1Js = Game.B1Js * 2
        }
    };

    B1.addEventListener("click", function(){
        if (Game.scoreJs >= Game.B1Js){
            Game.onMultiplCl = true
            Game.scoreJs = Game.scoreJs - Game.B1Js
            executeB1();
            pricePlusMulti();
        }
        score.innerHTML = "Le score est de \n " + Game.scoreJs
    });
    
    /* Fonction et Click pour Autoclick */

    B2.addEventListener( "click", function (){
        if (Game.possAutocl == true){
            if (Game.scoreJs>= Game.B2Js){
                Game.onAutoclick = true
                Game.possAutocl = false
                Game.scoreJs = Game.scoreJs - Game.B2Js
            }       
        }
        score.innerHTML = "Le score est de \n " + Game.scoreJs
    });
   

    setInterval (function(){
        if (Game.onAutoclick == true){
        Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
        score.innerHTML = "Le score est de " + Game.scoreJs;
        }    
    },1000);

    /* Fonction et Click pour GigaDict */

    B4.addEventListener("click", function(){
        if(Game.store[0].times > 179){    
            Game.store[0].available = true;
            Game.store[0].times = 0;
            
        }
    });
    
    setInterval (function(){
        Game.store[0].times++;
        total.innerHTML = "B4 désactiver : "+Game.store[0].times+"/180s"
        if(Game.store[0].times > 179) {
            total.innerHTML = "B4 prêt"
        }
        if(Game.store[0].available == true) {
            Game.store[0].times = 0;
            Game.store[0].useTimes++;
            total.innerHTML = "Temps restant : "+Game.store[0].useTimes +"/10s";
        }
        if(Game.store[0].useTimes > 9) {
            Game.store[0].useTimes = 0;
            Game.store[0].available = false;
        }
    },1000);
}

