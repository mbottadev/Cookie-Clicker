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
        cps : document.getElementById("cps"),
        cookieParSec : 0,
        scoreJs: 5000,
        scoreTotal: 0,        
        onAutoclick: false,
        B2Js: 200,
        autoIncr: 0,
        
        onMultiplCl: true,
        incrementeur: 1,
        multiplicateur: 1,
        B1Js: 50,
        x : 1,
        xVisu: false,
        
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
            Game.scoreTotal =  Game.scoreTotal + Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur);
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal            
        }else if(Game.store[1].available === true && Game.store[0].available == false) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus);
            score.innerHTML = "Le score est de \n " + Game.scoreJs
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus);
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal            
        }else if(Game.store[1].available === true && Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * ( Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus )
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * ( Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus )
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
        }else {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * Game.multiplicateur
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
        }        
    })

    /* Cookie par sec */

    function affichCPS(){
            Game.cookieParSec = Game.x * Game.autoIncr
            Game.cps.innerHTML = Game.cookieParSec + " cookies / par s "
    }

    Game.cps.innerHTML =  "   cookies / par s "
    


    /* Fonction et Click pour MULTIPLICATEUR */

    function executeB1(){
        if (Game.onMultiplCl === true){
            Game.multiplicateur ++
        }
    }

    function pricePlusMulti(){
        if (Game.onMultiplCl === true){
            Game.B1Js = Math.ceil(Game.B1Js * 1.7);
        }
    };

    Game.buttons[0].addEventListener("click", function(){
        if (Game.scoreJs >= Game.B1Js){
            Game.onMultiplCl = true;
            Game.scoreJs = Game.scoreJs - Game.B1Js
            Game.xVisu = true;
            Game.x++;
            affichCPS()
            executeB1();
            pricePlusMulti();
            displayButton(Game.buttons[0], Game.B1Js, Game.checks[0], 'lime');
        }
        displayScore(Game.score, Game.scoreJs)
        affichX();
        Game.checks[0].style.fontWeight = 'bold';
    });
    
    /* Fonction et Click pour AUTOCLICK */
    
    Game.buttons[1].addEventListener( "click", function (){        
        if (Game.scoreJs>= Game.B2Js){
            Game.onAutoclick = true
            Game.scoreJs = Game.scoreJs - Game.B2Js
            Game.autoIncr++
            Game.B2Js = Game.B2Js*2
            affichCPS()
            displayButton(Game.buttons[1], Game.B2Js, Game.checks[1], 'lime') 
        }       
        
        Game.score.innerHTML = "Le score est de \n " + Game.scoreJs
    });
   

    setInterval (function(){
        if (Game.onAutoclick == true){
            Game.scoreJs = Game.scoreJs+ Game.autoIncr * Game.incrementeur * Game.multiplicateur
            Game.score.innerHTML = "Le score est de " + Game.scoreJs;
            Game.checks[1].innerHTML = Game.autoIncr
            Game.checks[1].style.fontWeight = 'bold';
        }    
    },1000);

    /* Fonction et Click pour BOOST */

    Game.buttons[2].innerHTML ="500"
    Game.buttons[2].addEventListener("click",function(){
        if (Game.scoreJs>Game.store[1].price){
            Game.scoreJs = Game.scoreJs - Game.store[1].price
            Game.score.innerHTML = "Le score est de " + Game.scoreJs
            Game.store[1].available = true
        }
    })   
    
    setInterval(function(){
    if (Game.store[1].available == true) {
        Game.store[1].timer++
        Game.checks[2].style.backgroundColor='lime'
        Game.checks[2].innerHTML = "x" + Game.store[1].bonus
        Game.buttons[2].innerHTML = ":" + Game.store[1].timerinverse
        Game.store[1].timerinverse-- 
        console.log (Game.store[1].timer);
    }
    if(Game.store[1].timer > 29){
        Game.store[1].price = Math.ceil(Game.store[1].price*1.4)
        Game.store[1].timerinverse = 30
        Game.checks[2].style.backgroundColor='#3b404e'
        Game.store[1].timer = 0
        Game.buttons[2].innerHTML =  Game.store[1].price
        Game.store[1].available = false
        console.log(Game.buttons[2]);
    }       
    },1000)

    /* Fonction et Click pour GIGADICT */

    Game.buttons[3].innerHTML ="FREE"
    Game.buttons[3].addEventListener("click", function(){
        if(Game.store[0].times > 179){    
            Game.store[0].available = true;
            Game.store[0].times = 0;  
        }
    });
    
    setInterval (function(){
        Game.store[0].times++;
        console.log(Game.store[0].times)
        // Game.buttons[3].innerHTML = "B4 désactiver : "+Game.store[0].times+"/180s"
        if(Game.store[0].times > 179) {
            // Game.buttons[3].innerHTML = "B4 prêt"
            console.log("prêt")
        }
        if(Game.store[0].available == true) {
            Game.store[0].times = 0;
            Game.store[0].useTimes++;
            // Game.buttons[3].innerHTML = "Temps restant : "+Game.store[0].useTimes +"/10s";
            Game.checks[3].style.backgroundColor='lime'
            Game.checks[3].innerHTML = "x" + Game.store[0].multiplicateur
        }
        if(Game.store[0].useTimes > 9) {
            Game.store[0].useTimes = 0;
            Game.store[0].available = false;
            Game.checks[3].style.backgroundColor='#3b404e'
            // Game.buttons[3].innerHTML ="FREE"
        }
    },1000);

    /* Fonction et Click pour RANDOM COOKIE */

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
        if(Game.store[2].times > 9){
            Game.store[2].nbrRdm = getRandomInt(1,3);
            if(Game.store[2].nbrRdm == 1) {
                Game.cookieRdm.style.left = getRandomInt(0,800)+"px";
                Game.cookieRdm.style.top = getRandomInt(0,600)+"px";
                Game.cookieRdm.innerHTML = '<img id="imgCookie" src="cookie.png" alt="">';
            } else {
                Game.cookieRdm.style.left = getRandomInt(0,800)+"px";
                Game.cookieRdm.style.top = getRandomInt(0,600)+"px";
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

      /* Changements couleurs checkB */

      function displayButton(button, price, selector, color){
        button.innerText = price
        if(selector){
            selector.style.backgroundColor=color;
        }
    }
    function displayScore(selector, score){
        selector.innerHTML = "Le score est de \n " + score
    }
    
    function initalise(){
        displayButton(Game.buttons[0], Game.B1Js)
        displayButton(Game.buttons[1], Game.B2Js)
        // displayButton(B3, Game.store[1].price)
    }
    initalise()

    /* Affichage des x dans les checkB */

    function affichX(){
        if (Game.xVisu === true){
            checkB1.innerHTML = "x" + Game.x
        }
        /* else if (Game.store[1].available === true){
            checkB3.innerHTML = "x" + Game.store[1].bonus
        }
        else if (Game.store[0].available === true){
            checkB4.innerHTML = "x" + Game.store[0].multiplicateur
        } */
    }
}