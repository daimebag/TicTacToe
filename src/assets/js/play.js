const GameModel = require('./gamemodel.js');

module.exports = play_local = {
    gameboard: new GameModel(document.getElementById('play_game_board')),
    gamesession_states: {
        cellPlayed: undefined,
        mode: 'pve',
        round: 0
    },
    panel: {
        mode: {
            pvp: document.getElementById('game_panel_mode_pvp'),
            pve: document.getElementById('game_panel_mode_pve')
        },
        reset: document.getElementById('game_panel_reset_button'),
        score: document.getElementById('game_panel_score')
    },
    init: function () {
        this.panel.mode.pve.classList.add('is-link');
        gameSession('pve')
    }
};

// ADD LISTENER FOR ALL CELLS
for (let i = 0; i < 9; i++) {
    play_local.gameboard.cells[i].addEventListener('click', function() {
        play_local.gamesession_states.cellPlayed = play_local.gameboard.cells[i];
    });
}

// PANEL SECTION - RESET BUTTON
function reset() {
    play_local.panel.score.innerText = "0 - 0";
    return console.log("TicTacToe Message: Game was reinitialized.");
}
play_local.panel.reset.addEventListener('click', reset);

//PANEL SECTION - GAMEMODE BUTTON
function switchGameMode(mode) {
    console.log('this = ', this);
    if (!this.classList.contains('is-link')) {
        reset();
        this.classList.toggle('is-link');
        this.nextElementSibling ?
            this.nextElementSibling.classList.toggle('is-link') :
            this.previousElementSibling.classList.toggle('is-link');
        this.gamesession_states.mode = mode;
    }
}
play_local.panel.mode.pvp.addEventListener('click', function() {
    switchGameMode('pvp');
});
play_local.panel.mode.pve.addEventListener('click', function() {
    switchGameMode('pve');
});


// GAME SECTION
function gameSession() {

}