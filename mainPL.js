window.onload = () => {

    /* Objet du Jeu et Variables */
    let Game = {
        // afficheCookieOnClick: document.querySelector(".afficheScoreOnClick"),
        score: document.getElementById("score"),
        cps: document.getElementById("cps"),
        cookie: document.querySelector("#cookie"),
        cookieRdm: document.getElementById("cookieRdm"),
        instruBonus1: document.getElementById("instructionsBonus1"),
        instruBonus2: document.getElementById("instructionsBonus2"),
        instruBonus3: document.getElementById("instructionsBonus3"),
        instruBonus4: document.getElementById("instructionsBonus4"),
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
        scoreJs: 5000,
        scoreTotal: 0, 
        possAutocl:  true,
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
                timePrice: 25,
                times: 0,
                posLeft: 0,
                posTop: 0,
                nbrRdm: null,
                available: false,
            },
        ],
    }

    // Affiche les boutons accessible 

    setInterval(function(){
        if(Game.scoreJs >= Game.B2Js) {
            Game.buttons[1].style.opacity = 1;
        } else {
            Game.buttons[1].style.opacity = 0.3;
        }
        if(Game.scoreJs >= Game.B1Js) {
            Game.buttons[0].style.opacity = 1;
        } else {
            Game.buttons[0].style.opacity = 0.3;
        }
        if(Game.scoreJs >= Game.store[1].price || Game.store[1].available == true) {
            Game.buttons[2].style.opacity = 1;
        } else {
            Game.buttons[2].style.opacity = 0.3;
        }
        if(Game.store[0].times > 179) {
            Game.buttons[3].style.opacity = 1;
        } else {
            Game.buttons[3].style.opacity = 0.3;
        }
    },100)



    /* Fonction et Click pour Cookie */
   
    cookie.addEventListener("click", function(e){
         
        if(Game.store[0].available == true && Game.store[1].available === false) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur);
            Game.score.innerHTML = "Le score est de \n " + Game.scoreJs 
            Game.scoreTotal =  Game.scoreTotal + Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur);
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
            afficheScoreOnClick(e, (Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur))) 
        }else if(Game.store[1].available === true && Game.store[0].available == false) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus);
            Game.score.innerHTML = "Le score est de \n " + Game.scoreJs
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus);
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
            afficheScoreOnClick(e, (Game.incrementeur * (Game.multiplicateur * Game.store[1].bonus)))
        }else if(Game.store[1].available === true && Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * ( Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus )
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * ( Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus )
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
            afficheScoreOnClick(e, (Game.incrementeur * (Game.multiplicateur * Game.store[0].multiplicateur * Game.store[1].bonus))) 
        }else {
            Game.scoreJs = Game.scoreJs + Game.incrementeur * Game.multiplicateur
            Game.score.innerHTML = "Le score est de \n " + Game.scoreJs 
            Game.scoreTotal = Game.scoreTotal + Game.incrementeur * Game.multiplicateur
            Game.total.innerHTML = "Score tot : "+Game.scoreTotal
            afficheScoreOnClick(e, (Game.incrementeur * Game.multiplicateur))
        }    
    })

    function afficheScoreOnClick(e, score){
        const times = Date.now();
        var div = document.createElement('div');
        div.style.left = e.clientX + 'px';
        div.style.top = e.clientY + 'px';
        div.classList.add("afficheScoreOnClick");
        div.innerText = '+' + score;
        div.id = times;
        console.log(div)
        document.getElementsByTagName('body')[0].appendChild(div);
        setTimeout(()=>{
            document.getElementById(times).remove()
        }, 900)
    }
    /* Cookie par sec */

    function affichCPS(){
        Game.cookieParSec = Game.x * Game.autoIncr
        Game.cps.innerHTML = Game.cookieParSec + " cookies / par s "
    }
    Game.cps.innerHTML =  "   cookies / par s "

    /* SetInterval pour Afficher le SCORE */

    setInterval (function(){
        Game.score.innerHTML = "Le score est de \n " + Game.scoreJs
    },0100);    

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
        affichMultiplicateur();
        Game.checks[0].style.fontWeight = 'bold';
    });
    
    /* Fonction et Click pour AUTOCLICK */

    Game.buttons[1].addEventListener( "click", function (){
        if (Game.possAutocl == true){
            if (Game.scoreJs>= Game.B2Js){
                Game.onAutoclick = true
                Game.possAutocl = true
                Game.scoreJs = Game.scoreJs - Game.B2Js
                Game.autoIncr++
                Game.B2Js = Game.B2Js*2
                affichCPS()
                displayButton(Game.buttons[1], Game.B2Js, Game.checks[1], 'lime') 
            }       
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
    }
    if(Game.store[1].timer > 29){
        Game.store[1].price = Math.ceil(Game.store[1].price*1.4)
        Game.store[1].timerinverse = 30
        Game.checks[2].style.backgroundColor='#3b404e'
        Game.store[1].timer = 0
        Game.buttons[2].innerHTML =  Game.store[1].price
        Game.store[1].available = false
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
        if(Game.store[0].times > 179) {
            console.log("prêt")
        }
        if(Game.store[0].available == true) {
            Game.store[0].times = 0;
            Game.store[0].useTimes++;
            Game.checks[3].style.backgroundColor='lime'
            Game.checks[3].innerHTML = "x" + Game.store[0].multiplicateur
        }
        if(Game.store[0].useTimes > 9) {
            Game.store[0].useTimes = 0;
            Game.store[0].available = false;
            Game.checks[3].style.backgroundColor='#3b404e'
        }
    },1000);

    /* Fonction et Click pour RANDOM COOKIE */

    Game.cookieRdm.addEventListener("click", function(){
        if(Game.store[2].nbrRdm == 1) {
            Game.scoreJs = Game.scoreJs + (Game.multiplicateur * Game.store[2].multiplicateur);
            if(Game.store[2].timePrice > 180) {
                Game.store[2].timePrice = 180;
            } else {
                Game.store[2].timePrice += 3;
            }
            
        } else {
            if(Game.scoreJs < (Game.multiplicateur * Game.store[2].multiplicateur)){
                Game.scoreJs = 1
            } else {
                Game.scoreJs = Game.scoreJs - (Game.multiplicateur * Game.store[2].multiplicateur);
            }
            if(Game.store[2].timePrice < 10) {
                Game.store[2].timePrice = 10;
            } else {
                Game.store[2].timePrice -= 3;
            }
        }
        
        Game.score.innerHTML = "le score est de \n " + Game.scoreJs;
        Game.cookieRdm.innerHTML = '';
        Game.store[2].times = 0;
    })

    setInterval(function(){
        Game.store[2].times++;
        if(Game.store[2].times > Game.store[2].timePrice){
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
    }
    initalise()

    /* Affichage des x dans les checkB */

    function affichMultiplicateur(){
        if (Game.xVisu === true){
            Game.checks[0].innerHTML = "x" + Game.x
        }
    }

    /* Hover bonus button */

    Game.buttons[0].addEventListener("mouseenter", function(instruBonus1){
        Game.instruBonus1.style.opacity = 1;     
    })
    Game.buttons[0].addEventListener("mouseleave", function(instruBonus1){
        Game.instruBonus1.style.opacity = ""; 
    })

    Game.buttons[1].addEventListener("mouseenter", function(instruBonus2){
        Game.instruBonus2.style.opacity = 1;     
    })
    Game.buttons[1].addEventListener("mouseleave", function(instruBonus2){
        Game.instruBonus2.style.opacity = ""; 
    })

    Game.buttons[2].addEventListener("mouseenter", function(instruBonus3){
        Game.instruBonus3.style.opacity = 1;     
    })
    Game.buttons[2].addEventListener("mouseleave", function(instruBonus3){
        Game.instruBonus3.style.opacity = ""; 
    })

    Game.buttons[3].addEventListener("mouseenter", function(instruBonus4){
        Game.instruBonus4.style.opacity = 1;     
    })
    Game.buttons[3].addEventListener("mouseleave", function(instruBonus4){
        Game.instruBonus4.style.opacity = ""; 
    })

}