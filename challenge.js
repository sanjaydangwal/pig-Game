/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score, roundScore, activePlayer, gamePlaying, previousScore,winningScore;

init();
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice +'</em>';


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var diceDOM1 = document.querySelector('.dice1');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        //document.querySelector('.dice').style.display = 'block'
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        if (dice1 === 6 && previousScore === 6) {
            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        } else if (dice1 != 1) {
            roundScore = roundScore+dice1+dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            previousScore = dice1;
        } else {
            nextPlayer();
        }
    }
})


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        if (score[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }
    }
})



function nextPlayer() {
    previousScore = 0;
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)


function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousScore = 0; 
    winningScore = prompt("enter winning score")
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
