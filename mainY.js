console.log("ok")
window.onload = () => {
    console.log("démarage")
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
    let cookieRdm = document.getElementById("cookieRdm");

    

    let onAutoclick = false;
    let onGigaButton = false;
    let B1Js = 1
    let multiplicateur = 1
    let Game = {
        scoreJs: 5000,
        possAutocl:  true,
        total: 0,
        multiplicateur: 1,
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

    score.innerHTML = "le score est de \n " + Game.scoreJs;

    cookieRdm.addEventListener("click", function(){
        if(Game.store[2].nbrRdm == 1) {
            Game.scoreJs = Game.scoreJs + (Game.multiplicateur * Game.store[2].multiplicateur);
        } else {
            Game.scoreJs = Game.scoreJs - (Game.multiplicateur * Game.store[2].multiplicateur);
        }
        score.innerHTML = "le score est de \n " + Game.scoreJs;
        cookieRdm.innerHTML = '';
        Game.store[2].times = 0;
    })

    setInterval(function(){
        Game.store[2].times++;
        if(Game.store[2].times > 9)
        {
            Game.store[2].nbrRdm = getRandomInt(1,3);
            if(Game.store[2].nbrRdm == 1) {
                cookieRdm.style.left = getRandomInt(0,1200)+"px";
                cookieRdm.style.top = getRandomInt(0,1000)+"px";
                cookieRdm.innerHTML = '<img id="imgCookie" src="cookie.png" alt="">';
            } else {
                cookieRdm.style.left = getRandomInt(0,1200)+"px";
                cookieRdm.style.top = getRandomInt(0,1000)+"px";
                cookieRdm.innerHTML = '<img id="imgCookie" src="cookie2.png" alt="">';
            }           
            Game.store[2].times = 0; 
            setTimeout(()=>{
                cookieRdm.innerHTML = '';
            },1000)
        }
        
    },1000)

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    cookie.addEventListener("click", function(){
        if(Game.store[0].available == true) {
            Game.scoreJs = Game.scoreJs + (multiplicateur * 20);
            score.innerHTML = "Le score est de \n " + Game.scoreJs 
        } else {
            console.log("ok")
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