var  backgroundSound = new Audio("./media/backgroundSound.mp3")

let backgroundSoundIcon = document.getElementById("icon")

backgroundSoundIcon.style.textDecoration = "line-through";
let toggledIcon = false

// backgroundSound.play();
backgroundSoundIcon.addEventListener("click",(e)=>{
    if(!toggledIcon) {
        backgroundSoundIcon.style.textDecoration = "line-through";
        toggledIcon = true;
        backgroundSound.pause();
        // makeSomeNoise();
    }else {
        backgroundSoundIcon.style.textDecoration = "none";
        toggledIcon = false;
        backgroundSound.play();
    }
})

function makeSomeNoise(){
    backgroundSound.play();
}
console.log(backgroundSoundIcon)