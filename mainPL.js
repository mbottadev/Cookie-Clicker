window.onload = () => {

    /* Objet du Jeu et Variables */
    let Game = {
        score: document.getElementById("score"),
        cps: document.getElementById("cps"),
        cookie: document.querySelector("#cookie"),
        cookieRdm: document.getElementById("cookieRdm"),
        checks:[
            document.getElementById("checkB1"),
            document.getElementById("checkB2"),
            document.getElementById("checkB3"),
            document.getElementById("checkB4"),
        ],
        buttons: [
            document.getElementById("B1"),
            document.getElementById("B2"),
            document.getElementById("B3"),
            document.getElementById("B4"),
        ],

        total: document.getElementById("total"),
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
            },
            {
                id:1,
                name: 'boost',
                timer: 0,
                price: 500,
                available: false,
                bonus: 5,
                timerinverse: 30,
            },
            {
                id:2,
                name: 'cookieRdm',
                multiplicateur: 50,
                times: 0,
                posLeft: 0,
                posTop: 0,
                nbrRdm: null,
                available: false,
            },
        ],
    }

    /* Fonction et Click pour Cookie */

    cookie.addEventListener("click", function(){

        if(Game.store[0].available == true && Game.store[1].available === false) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur);
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        }else if(Game.store[1].available === true && Game.store[0].available == false) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus);
            score.innerHTML = "Le score est de \n " + Game.scoreJs
        }else if(Game.store[1].available === true && Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus)
        }else{
            Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        } 
    })

    /* Fonction et Click pour MULTIPLICATEUR */

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

    Game.buttons[0].addEventListener("click", function(){
        if (Game.scoreJs >= Game.B1Js){
            Game.onMultiplCl = true
            Game.scoreJs = Game.scoreJs - Game.B1Js
            executeB1();
            pricePlusMulti();
        }
        score.innerHTML = "Le score est de \n " + Game.scoreJs
    });
    
    /* Fonction et Click pour AUTOCLICK */

    Game.buttons[1].addEventListener( "click", function (){
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

    /* Fonction et Click pour BOOST */

    Game.buttons[2].addEventListener("click",function(){
        if (Game.scoreJs>Game.store[1].price){
            Game.scoreJs = Game.scoreJs - Game.store[1].price
            score.innerHTML = "Le score est de " + Game.scoreJs
            Game.store[1].available = true
        }
    })   
    
    setInterval(function(){
    if (Game.store[1].available == true) {
        Game.store[1].timer++
        B3.innerHTML = ":" + Game.store[1].timerinverse
        Game.store[1].timerinverse-- 
        console.log (Game.store[1].timer)
    }
    if(Game.store[1].timer > 29){
        Game.store[1].timerinverse = 30
        B3.innerHTML ="Boost"
        Game.store[1].timer = 0
        Game.store[1].available = false
        console.log("desactiver")
    }       
    },1000)

    /* Fonction et Click pour GIGADICT */

    Game.buttons[3].addEventListener("click", function(){
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

    /* Fonction et Click pour GIGADICT */

    Game.cookieRdm.addEventListener("click", function(){
        if(Game.store[2].nbrRdm == 1) {
            Game.scoreJs = Game.scoreJs + (Game.multiplicateur * Game.store[2].multiplicateur);
        } else {
            Game.scoreJs = Game.scoreJs - (Game.multiplicateur * Game.store[2].multiplicateur);
        }
        Game.score.innerHTML = "le score est de \n " + Game.scoreJs;
        Game.cookieRdm.innerHTML = '';
        Game.store[2].times = 0;
    })

    setInterval(function(){
        Game.store[2].times++;
        if(Game.store[2].times > 9)
        {
            Game.store[2].nbrRdm = getRandomInt(1,3);
            if(Game.store[2].nbrRdm == 1) {
                Game.cookieRdm.style.left = getRandomInt(0,1200)+"px";
                Game.cookieRdm.style.top = getRandomInt(0,1000)+"px";
                Game.cookieRdm.innerHTML = '<img id="imgCookie" src="cookie.png" alt="">';
            } else {
                Game.cookieRdm.style.left = getRandomInt(0,1200)+"px";
                Game.cookieRdm.style.top = getRandomInt(0,1000)+"px";
                Game.cookieRdm.innerHTML = '<img id="imgCookie" src="cookie2.png" alt="">';
            }           
            Game.store[2].times = 0; 
            setTimeout(()=>{
                Game.cookieRdm.innerHTML = '';
            },1000)
        }
        
    },1000)

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}