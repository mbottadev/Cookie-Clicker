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
    
    let onAutoclick = false;
    let onGigaButton = false;
    let B1Js = 1
    let multiplicateur = 1
    let Game = {
        scoreJs: 95,
        possAutocl:  true,
        total: 0,
        store:[

            {
                id:1,
                name: 'boost',
                timer: 0,
                price: 99,
                multiplicateur: 1.2,
                available: false,
                bonus: 5,
                timerinverse: 30,
            },
        ], 
    
    } 
    score.innerHTML = "Le score est de " + Game.scoreJs

    cookie.addEventListener("click",function(){
        if (Game.store[0].available == true){
            Game.scoreJs = Game.scoreJs + (multiplicateur * Game.store[0].bonus) ;
           score.innerHTML = "Le score est de " + Game.scoreJs
        }
        else {
           Game.scoreJs = Game.scoreJs + multiplicateur;
           score.innerHTML = "Le score est de " + Game.scoreJs
        }
       

    })    

    B3.addEventListener("click",function(){
        if (Game.scoreJs>Game.store[0].price){
            Game.scoreJs = Game.scoreJs - Game.store[0].price
            score.innerHTML = "Le score est de " + Game.scoreJs
            Game.store[0].available = true
        }
    })   
    
    setInterval(function(){
    if (Game.store[0].available == true) {
        Game.store[0].timer++
        B3.innerHTML = ":" + Game.store[0].timerinverse
        Game.store[0].timerinverse-- 
        console.log (Game.store[0].timer)
    }
    if(Game.store[0].timer > 29){
        Game.store[0].timer = 0
        Game.store[0].available = false
        console.log("desactiver")
    }       
    },1000)


    
 
        


}