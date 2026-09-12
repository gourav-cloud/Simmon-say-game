let gameSeq = [];
let userSeq = [];
let colorSeq = ["yellow","red","purple","green"];
let highScore = 0;

let h2 = document.querySelector("h2");

let gameStarted = false;
let level = 0;


document.addEventListener("keypress", function(){
    if(gameStarted==false){
        gameStarted = true;
        levelUp();
    }
})

function levelUp(){
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;
    let rndIdx = Math.floor(Math.random()*3);
    let rndColor = colorSeq[rndIdx];
    let rndbtn = document.querySelector(`.${rndColor}`);
    gameSeq.push(rndColor);
    flash(rndbtn);
}

function flash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function check(idx){

    if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(highScore<=level){
        highScore = level-1;
    }
        h2.innerHTML = `GAME OVER, your score was <b>${level-1}</b> <br> Press any key to restart. <br> highest score ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function userColor(){
    let btn = this;
    flash(btn);
    let btnColor = btn.getAttribute("id");
    userSeq.push(btnColor);
    console.log(userSeq);
    check(userSeq.length-1);
}

let btns = document.querySelectorAll(".box");

for(btn of btns){
    btn.addEventListener("click", userColor) 
}

function reset(){
    gameStarted = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}