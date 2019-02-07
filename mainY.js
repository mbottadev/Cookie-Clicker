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
        scoreJs: 0,
        possAutocl:  true,
        total: 0,
        store:[
            {
                id: 0,
                multiplicateur: 20,
                times: 0,
                useTimes: 0,
                available: false,
                useAvailable: false
            },
            {
                id:1,
                name: 'autruche',
                price: 10,
                multiplicateur: 1.2,
                times: 4,
            },
        ], 
    }

    cookie.addEventListener("click", function(){
        if(Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + (multiplicateur * 20);
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        } else {
            Game.scoreJs = Game.scoreJs + multiplicateur 
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        }
    })
    
    
    B4.addEventListener("click", function(){
        if(Game.store[0].times > 59){    
            Game.store[0].available = true;
            Game.store[0].times = 0;
            
        }
    })
    
    setInterval (function(){
        Game.store[0].times++;
        total.innerHTML = "B4 désactiver : "+Game.store[0].times+"/60"
        if(Game.store[0].times > 59) {
            total.innerHTML = "B4 prêt"
        }
        if(Game.store[0].available == true) {
            Game.store[0].times = 0;
            Game.store[0].useTimes++;
            total.innerHTML = "Temps restant : "+Game.store[0].useTimes +"/5";
        }
        if(Game.store[0].useTimes > 4) {
            Game.store[0].useTimes = 0;
            Game.store[0].available = false;
        }
    },1000);




    


}