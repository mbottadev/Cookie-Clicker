window.onload = () => {

    let devNames = {
        names: [
            document.getElementById("elisaRenda"),
            document.getElementById("younesAfkir"),
            document.getElementById("maximeBotta"),
            document.getElementById("pilouPicard"),
        ],
        divNames: [
            document.getElementById("italienneElisa"),
            document.getElementById("youKiller"),
            document.getElementById("maxLaMenace"),
            document.getElementById("pilou"),
        ],

    }

     /* HOVER DEV NAMES BUTTON */

     devNames.divNames[0].addEventListener("mouseenter", function(instruBonus1){
        devNames.names[0].style.opacity = 1;     
    })
    devNames.divNames[0].addEventListener("mouseleave", function(instruBonus1){
        devNames.names[0].style.opacity = ""; 
    })

    devNames.divNames[1].addEventListener("mouseenter", function(instruBonus2){
        devNames.names[1].style.opacity = 1;     
    })
    devNames.divNames[1].addEventListener("mouseleave", function(instruBonus2){
        devNames.names[1].style.opacity = ""; 
    })

    devNames.divNames[2].addEventListener("mouseenter", function(instruBonus3){
        devNames.names[2].style.opacity = 1;     
    })
    devNames.divNames[2].addEventListener("mouseleave", function(instruBonus3){
        devNames.names[2].style.opacity = ""; 
    })

    devNames.divNames[3].addEventListener("mouseenter", function(instruBonus4){
        devNames.names[3].style.opacity = 1;     
    })
    devNames.divNames[3].addEventListener("mouseleave", function(instruBonus4){
        devNames.names[3].style.opacity = ""; 
    })
}
