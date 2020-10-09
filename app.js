/**Global Events */
//Set imgs on DOM load
document.addEventListener('DOMContentLoaded', () =>{
    //array containing images srcs
    const src = ['/img/dog.jpg', '/img/fish.png', '/img/cat.png', '/img/dolphin.png', '/img/owl.png', '/img/giraffe.png'];
    //array containing images
    const imgs = document.querySelectorAll('.card img');
    //array to contain images srcs index
    const arr = [];

    //assign img srcs to three imgs
    while(arr.length < 3){
        //store random numbers generated. one for index of imgs, one for index of img srcs
        let ind = parseInt(Math.random()*10) % 6;
        let int = parseInt(Math.random()*10) % 6;
        if(!arr.includes(int)){ //if the src is not in the array already then add
            arr.push(int);
            imgs[ind].src = src[int];
        }
    }
    //assign src using arr containing index for remaining three images
    let i = 0
    while(arr.length > 0){
        if(!imgs[i].hasAttribute('src')){ //if image has no source
            let int = parseInt(Math.random()*10) % (arr.length); //choose the index to get srcs randomly within bound of array
            imgs[i].src = src[arr[int]]; //assign
            arr.splice(int, 1); //remove src index so it won't be used again   
        }
        i++;
    }
});

//Show images when card is clicked
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', showImg);
});

//get Timer
const timer = document.querySelector('.timer'); //gets timer div
timer.textContent = '00:10';
    
//set interval
let interval = setInterval(() => { //sets 1s interval to update timer countdown
    //reduce timer count
    const time = document.querySelector('.timer').textContent;
    const arr = time.split(':'); //splits array to get the seconds
    timeValue = arr.pop(); //stores seconds in this variable
    timeValue--; //decrements time 
    document.querySelector('.timer').textContent = `00:${timeValue}`; //updates timer in UI
    if(timeValue === 0){ //if time is over without player finishing, stops interval and gives failed game over
        gameOverVerdict('failed');  
    }
}, 1000);

//Counter for the amount of cards showing images at a time. Max number is 2
let count = 0;

/**Functions */

//Show images on cards
function showImg(e){
    e.target.firstElementChild.style.display = 'block'; //show iamges
    e.target.classList.add('show'); //add show class to cards to indicate that their imgs are currently showing
    count++ //increase count of cards showing
    if(count === 2){ //when two cards are showing, check if theimages are the same
        checkImgs();
    }
}
//Check images on cards
function checkImgs(){
    const arr = Array.from(document.querySelectorAll('.show img')); //get images in array to compare their src
    if(arr[0].src === arr[1].src){ //if they have imgs on cards the same src
        //add match class to the showing cards
        document.querySelectorAll('.show').forEach(card =>{
            card.style.animation = 'match 1s';
        });
        checkWin(); //check win after each match is made
    }else{ //if they dont have the same source
        //hide the images back if not the same after 3 milliseconds
        setTimeout(() => {
            arr[0].style.display = 'none';
            arr[1].style.display = 'none';
        }, 300);
        
    }
    //remove show class
    arr[0].parentElement.classList.remove('show');
    arr[1].parentElement.classList.remove('show');
    //reset count
    count = 0;
}

//Check win
function checkWin(){
    let arr = Array.from(document.querySelectorAll('.card img')); //array to store imgs
    for(let i = 0; i< arr.length; i++){
        if(arr[i].style.display !== 'block'){ //if any image is not displayed return
            return;
        }else{
            continue; //if display is not equals to none then continue
        }
    }
    gameOverVerdict('passed'); //if it reaches this point, the player has passed
}
//Game Over Verdict 
function gameOverVerdict(verdict){
    //clear interval
    clearInterval(interval);

    //get body and end to insert game over modal before
    const body = document.querySelector('body'); 
    const end = document.querySelector('.end');

    //get container to change opacity
    const con = document.querySelector('.container-2');
    con.style.opacity = '0.4';

    if(verdict === 'failed'){ //if player failed create failed game over modal
        gameOver = document.createElement('div');
        gameOver.innerHTML = 
        '<p class="text">Sorry, game over.</p><button class="game-btn" id= "play-again">play again</button><button class="game-btn" id= "exit">exit game</button>';
        gameOver.className = 'game-over failed';   
    }else{ //if player passed create passed game over modal
        gameOver = document.createElement('div');
        gameOver.innerHTML = 
        `<p class="text-2">Yay! You finished the game in time.</p><button class="game-btn" id= "play-again">play again</button><button class="game-btn" id= "exit">exit game</button>`;
        gameOver.className = 'game-over passed';
    }
    
    body.insertBefore(gameOver, end); //insert modal
    document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', showImg); //remove click event on cards
        card.style.cursor = 'default' //remove pointer
    });
    addEventsToBtns(); //add events to btns on game over modal
}
//Add events to game over modal btns
function addEventsToBtns(){
    if(document.querySelector('#play-again')){ //if play again btn is present, play again event
        document.querySelector('#play-again').addEventListener('click', ()=>{
        location.reload(); //reload page
    });
    }
    if(document.querySelector('#exit')){ //if exit btn is present, exit game event. Go to home page
        document.querySelector('#exit').addEventListener('click', ()=>{
            location.pathname ='index.html';
        });
    }
}