const GameModel = require('./gamemodel.js');

module.exports = play_local = {
    gameboard: new GameModel(document.getElementById('play_game_board')),
    session: {
        cellsPlayed: [],
        mode: 'pve',
        currentPlayer: 0
    },
    panel: {
        mode: {
            pvp: document.getElementById('game_panel_mode_pvp'),
            pve: document.getElementById('game_panel_mode_pve')
        },
        reset: document.getElementById('game_panel_reset_button'),
        score: {
            player1: document.getElementById('game_panel_score_player1'),
            player2: document.getElementById('game_panel_score_player2')
        }
    },
    init: function () {
        this.panel.mode.pve.classList.add('is-link');
        cellsToggleEvent(true);
        this.panel.reset.addEventListener('click', reset);
        this.panel.mode.pvp.addEventListener('click', function (e) {
            switchGameMode(e, 'pvp');
        });
        this.panel.mode.pve.addEventListener('click', function (e) {
            switchGameMode(e, 'pve');
        });
    }
};

// ADD LISTENER FOR ALL CELLS
function cellsToggleEvent(eventOn) {
    if (eventOn) {
        for (let cell of play_local.gameboard.cells) {
            cell.addEventListener('click', play);
        }
    } else {
        for (let cell of play_local.gameboard.cells) {
            cell.removeEventListener('click', play);
        }
    }
}
// PANEL SECTION - RESET BUTTON
async function reset() {
    play_local.gameboard.animation_states.cancelled = true;
    cleanSession();
    cellsToggleEvent(true);
    play_local.panel.score.player1.innerHTML = 0;
    play_local.panel.score.player2.innerHTML = 0;
    await play_local.gameboard._sleep(500);
    play_local.gameboard.animation_states.cancelled = false;
    return console.log("TicTacToe Message: Game was reinitialized.");
}

function cleanSession () {
    play_local.gameboard.clean();
    play_local.session.cellsPlayed = [];
    play_local.session.currentPlayer = 0;
}

//PANEL SECTION - GAMEMODE BUTTONS
function switchGameMode(e, mode) {
    let element = e.target;
    if (!element.classList.contains('is-link')) {
        reset();
        element.classList.toggle('is-link');
        element.nextElementSibling ?
            element.nextElementSibling.classList.toggle('is-link') :
            element.previousElementSibling.classList.toggle('is-link');
        play_local.session.mode = mode;
    }
}



// GAME SECTION
async function play() {
    cellsToggleEvent(false);
    const currentCell = this.id.slice(-1);
    let scoreCurrentPlayer = Object.values(play_local.panel.score)[play_local.session.currentPlayer];
    const scoreAnimation = ['animated', 'flipInX'];

    scoreCurrentPlayer.classList.remove(...scoreAnimation);

    if (play_local.session.cellsPlayed.includes(currentCell)) {
        return false;
    }
    this.innerHTML = Object.values(play_local.gameboard.players)[play_local.session.currentPlayer];

    const endgame = await play_local.gameboard.detectCombination();
    if (play_local.gameboard.animation_states.cancelled) {
        return;
    }
    if (endgame) {
        cleanSession();
        if (endgame != 'draw') {
            scoreCurrentPlayer.innerHTML ++;
            scoreCurrentPlayer.classList.add(...scoreAnimation);
        }
    }
    else {
        play_local.session.cellsPlayed.push(currentCell);
        play_local.session.currentPlayer ^= true;
        if (play_local.session.currentPlayer && play_local.session.mode == 'pve') {
            bot();
        }
    }
    cellsToggleEvent(true);
}

function bot() {
    return true;
}
