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
        
        possAutocl:  true,
        onAutoclick: false;
        B2Js: 200,
        
        onMultiplCl: true,
        incrementeur: 1,
        multiplicateur: 1,
        B1Js: 50,
        // total: 0,
        /* store:[
            {
                id: 0,
                name: 'patate',
                price: 10,
                multiplicateur: 1.2,
                times: 0
            },
            {
                id:1,
                name: 'autruche',
                price: 10,
                multiplicateur: 1.2,
                times: 4,
            },
        ], */
    }

        
    
    cookie.addEventListener("click", function(){
        Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
        score.innerHTML = "Le score est de \n " + Game.scoreJs 
        
    })

    function executeB1(){
        if (Game.onMultiplCl === true){
            Game.multiplicateur ++
        }
    }

    function pricePlusMulti(){
        if (Game.onMultiplCl === true){
            Game.B1Js = Game.B1Js * 2
        }
    }

    B1.addEventListener("click", function(){
        if (Game.scoreJs >= Game.B1Js){
            Game.onMultiplCl = true
            Game.scoreJs = Game.scoreJs - Game.B1Js
            executeB1();
            pricePlusMulti();
        }
        score.innerHTML = "Le score est de \n " + Game.scoreJs
    })


    
    
    B2.addEventListener( "click", function (){
        if (Game.possAutocl == true){
            if (Game.scoreJs>= Game.B2Js){
                Game.onAutoclick = true
                Game.possAutocl = false
                Game.scoreJs = Game.scoreJs - Game.B2Js
            }       
        }
        score.innerHTML = "Le score est de \n " + Game.scoreJs
    })
   

    setInterval (function(){
        if (Game.onAutoclick == true){
        Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
        score.innerHTML = "Le score est de " + Game.scoreJs;
        }    
    },1000);


}