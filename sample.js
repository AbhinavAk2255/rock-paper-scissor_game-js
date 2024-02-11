let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    ties: 0
};  // Here use Default operator || once the left side is false theb the right side is run

// change();
document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.win} - Loses : ${score.lose} - Ties : ${score.ties}`;

// if (!score){

//     score = {
//         win: 0,
//         lose: 0,
//         ties: 0
//     };
// }

let isAutoplaying = false;
let intervalid;

function autoplay() {
    if (!isAutoplaying) {
        intervalid = setInterval(function() {
            const playerMove = piccmp();
            play(playerMove);
        },1000);
        isAutoplaying = true;
        document.querySelector('.autoplay-js').innerHTML = 'Stop Playing';
    }else{
        clearInterval(intervalid);
        isAutoplaying = false;
        document.querySelector('.autoplay-js').innerHTML = 'AutoPlay';
    }

}

document.querySelector('.js-listener-rock').addEventListener('click', () =>{
    play('Rock');
})

document.querySelector('.js-listener-paper').addEventListener('click', () =>{
    play('Paper');
})
document.querySelector('.js-listener-scissor').addEventListener('click', () =>{
    play('Scissor');
})

document.querySelector('.autoplayButton').addEventListener('click' ,() => {
    autoplay();
})

document.querySelector('.js-reset-button').addEventListener('click', () => {
    confirmation();
})


function resetscore() {
    score.win = 0;
    score.lose = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    // change();
    document.querySelector('.js-score')
        .innerHTML = `Wins : ${score.win} - Loses : ${score.lose} - Ties : ${score.ties}`;

    document.querySelector('.js-result').innerHTML = '';    
    document.querySelector('.js-status').innerHTML = '';
}

function confirmation() {
    document.querySelector('.reset-para').innerHTML = 
    `Are You Want To Reset the score ? 
    <button 
    class="confirm-btn comfirmation-button-yes">
    Yes
    </button> 

    <button 
    class="confirm-btn2 comfirmation-button-no">
    No
    </button>
    `;

    document.querySelector('.comfirmation-button-yes').addEventListener('click', () => {
        resetscore();
        hideMessage();
        
    })
    document.querySelector('.comfirmation-button-no').addEventListener('click', () => {
        hideMessage();
    })
}

document.body.addEventListener('keydown', (event) => {
    
    if (event.key === 'r') {
        play('Rock');
    }
    else if(event.key === 'p'){
        play('Paper');
    }
    else if(event.key === 's'){
        play('Scissor');
    }
    else if(event.key ==='a'){
        autoplay();
    }
    else if(event.key === 'Backspace'){
        resetscore();
    }
})

function hideMessage() {
    document.querySelector('.reset-para').innerHTML = '';
}

function play(playerMove) {

    const compM = piccmp();
        
    let result = '';

    if(playerMove==='Rock'){

        if(compM === 'Rock'){

            result = 'Tie';
        }
        else if(compM === 'Paper'){
            result = 'you lose';
        }
        else if(compM === 'Scissor'){
            result = 'you won';
        }
    }
    else if(playerMove==='Paper'){

        if(compM === 'Rock'){
            result = 'you won';
        }
        else if(compM === 'Paper'){
            result = 'Tie';
        }
        else if(compM === 'Scissor'){
            result = 'you lose';
        }
        
    }
    else if(playerMove==='Scissor'){

        if(compM === 'Rock'){
            result = 'you lose';
        }
        else if(compM === 'Paper'){
            result = 'you won';
        }score
    }
    
    if(result==='you won'){
        score.win += 1;
    }
    else if(result==='you lose'){
        score.lose += 1;
    }
    else if(result==='Tie'){
        score.ties +=1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    // change();
    document.querySelector('.js-score')
        .innerHTML = `Wins : ${score.win} - Loses : ${score.lose} - Ties : ${score.ties}`;

    
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-status').innerHTML = `you 
    <img src="${playerMove}-emoji.png" alt="">
    <img src="${compM}-emoji.png" alt="">
    computer`;

    // alert(`you picked ${playerMove}. Computer picked ${compM} . ${result}
    // Wins : ${score.win} - Loses : ${score.lose} - Ties : ${score.ties}`);

    // function change() {
    //     document.querySelector('.js-score')
    //     .innerHTML = `Wins : ${score.win} - Loses : ${score.lose} - Ties : ${score.ties}`;
    // }
}
function piccmp() {

    const randomval = Math.random();
    let compM = '';

    if(randomval >=0 && randomval<=1/3) {

        compM = 'Rock';
    }
    else if (randomval>=1/3 && randomval<=2/3){
        compM = 'Paper';
    }
    else{
        compM = 'Scissor';
    }
    return compM;
}