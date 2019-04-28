document.addEventListener("click",function(e){
    const user = e.target.id;
 
    switch(user){
        case "perso1" : 
        const opponent1 = document.querySelector('#score2');
        document.getElementById(user).onclick = reducePerso(opponent1);
        break;
        case "perso2" :
        const opponent2 = document.querySelector('#score1'); 
        document.getElementById(user).onclick = reducePerso(opponent2);
        break;
        case 'addHealth' :
            e.target.parentNode.id === 'player1' ? bonus.addHealth(document.querySelector('#score1'),10) : bonus.addHealth(document.querySelector('#score2'),10);
        break;
        case 'changePlace' : 
        e.target.parentNode.id === 'player1' ? bonus.changePlace(document.getElementById('perso1')) : bonus.changePlace(document.getElementById('perso2'));
        break;
        case 'hitTarget':
        e.target.parentNode.id === 'player1' ? bonus.hitPlayer(document.querySelector('#score2'),20) : bonus.hitPlayer(document.querySelector('#score1'),20);
        break;
        case "invincible":
        e.target.parentNode.id === 'player1' ? bonus.invinciblePlayer(document.getElementById('perso1')) : bonus.invinciblePlayer(document.getElementById('perso2'));
        break;
        case "wedding":
        e.target.parentNode.id === 'player1' ? bonus.mergeScores(document.querySelector('#score1'),document.querySelector('#score2')) : bonus.mergeScores(document.querySelector('#score2'),document.querySelector('#score1'));
        break;
        case 'snooker':
        e.target.parentNode.id === 'player1' ? bonus.snooker(document.querySelector('#score1')) : bonus.snooker(document.querySelector('#score2'));
        break;
    } 
})

function improveHealth(perso){
    return function(){
        bonus.addHealth(perso);
    }
}

function reducePerso(e){
    return function(){
        e.dataset.score > 50 ? e.style.color = "green" : e.style.color = "red";
        if(e.dataset.score < 1 || isNaN(e.dataset.score)){
            e.dataset.score = "rrrrrrrrrrrrrrrrrr";
            const newTimer = window.setInterval(function(){});
            for(var i = 0; i <= newTimer ; i++){
                window.clearInterval(i);
            }
        }else{
            e.dataset.score -= 1 
        }
    }
}

const bonus = {
    addHealth:function(perso,s){
        const score = Number(perso.dataset.score);
        perso.dataset.score = score +  s;
    },
    hitPlayer:function(perso,d){
        const score = Number(perso.dataset.score);
        perso.dataset.score = score - d;
    },
    changePlace:function(perso){
        return addClass(perso,'movePerso',5000);
    },
    invinciblePlayer:function(perso){
        return addClass(perso,'invinciblePerso',5000);
    },
    mergeScores:function(perso,perso2){
        const score = Number(perso.dataset.score);
        perso2.dataset.score = score;
    },
    snooker:function(perso){
        perso.dataset.score = 0;
    }
}

function getCoordonate(){
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);

    return [randomX,randomY];
}

function addClass(perso,classname,time){
    perso.classList.add(classname);
    setTimeout(() => {
        perso.classList.remove(classname);
    }, time);
}

/*
const place = setInterval(() => {createObject("🏎️","changePlace",5000)}, 3000);
const health = setInterval(() => {createObject("🏥","addHealth",5000);},2000);
const target = setInterval(() => {createObject("🎯","hitTarget",5000);},5000);
const invincible = setInterval(() => {createObject("🌈","invincible",5000);}, 8000);
const wedding = setInterval(() => {createObject("👰","wedding",5000)}, 60000);
const snooker = setInterval(() => {createObject("🎱","snooker",5000);}, 30000);
*/

window.addEventListener("load",function(){
    //setPerso();
    createCarousel();
});


function setPerso(){
    document.getElementById("perso1").innerHTML = personnages.kingkong.image;
    document.getElementById("perso2").innerHTML = personnages.mufasa.image;
}

const personnages = [
    {
        name:"ane",
        letter:"a",
        life:110,
        strong:1,
        image:"images/perso/ane.png",
        oneliner:"sssssss"
    },
    {
        name:"herisson",
        letter:"b",
        life:50,
        strong:0.5,
        image:"images/perso/herisson.png",
        oneliner:"rsrsrsrsrsrsrsr"
    },
    {
        name:"hamoud",
        letter:"c",
        life:65,
        strong:1.2,
        image:"images/perso/hamoud.png",
        oneliner:"hamoudddd"
    },
    {
        name:"folk",
        letter:"d",
        life:120,
        strong:1.5,
        image:"images/perso/folk.png",
        oneliner:"fffffffffffffff"
    },
    {
        name:"cat",
        letter:"e",
        life:40,
        strong:3,
        image:"images/perso/cat.png",
        oneliner:"cccccccccccccc"
    }
]


function createObject(element,id,time){
    const coordonate = getCoordonate();
    const obj = document.createElement("span");
    obj.innerHTML = element;
    obj.id = id;
    obj.className = "cube";
    obj.style.position = "absolute";
    obj.style.cursor = "pointer";
    obj.style.left = coordonate[0] + '%';
    obj.style.top = coordonate[1] + '%';
    const section = document.getElementsByTagName("section");
    section[0].appendChild(obj);
    setTimeout(() => {
        obj.parentNode.removeChild(obj);
    },time);
}

function createCarousel(){
    const carousel =  document.getElementById("carousel");
    personnages.map((obj) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const span = document.createElement("span");
        span.innerHTML = obj.life;
        img.src = obj.image;
        div.className = "item";
        div.className += " " + obj.letter;
        div.appendChild(img);
        div.appendChild(span);
        carousel.appendChild(div);
    })
}

document.getElementById("next").onclick = rotate({d:"n"});
document.getElementById("prev").onclick = rotate({d:"p"});

var carousel = document.getElementsByClassName("carousel");
var currdeg  = 0;

function rotate(e){
    return function(){
        if(e.d === "n"){
            currdeg -= 60;
        }
        if(e.d === "p"){
            currdeg += 60;
        }

        for(var x = 0; x < carousel.length;x++){
            carousel[x].style.transform = "rotateY("+currdeg+"deg)"
        }
        
    }
}
