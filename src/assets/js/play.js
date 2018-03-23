module.exports = play_local = {
    gameboard: {
        board: document.getElementById('play_game_board'),
        cells: {}
    },
    gamesession: {
        round: undefined
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
    }
};
// Add cells on rules_local.gamezone Object
for (let i = 0; i < 9; i++) {
    play_local.gameboard.cells[`cell` + (i + 1)] = play_local.gameboard.board.children[i];
    play_local.gameboard.cells[`cell` + (i + 1)].addEventListener('click', undefined);
}

function reset() {
    play_local.panel.score.innerText = "0 - 0";
    return console.log("TicTacToe Message: Game was reinitialized.");
}

play_local.panel.reset.addEventListener('click', reset);

function switchGameMode() {
    reset();
    if (!this.classList.contains('is-link')) {
        this.classList.toggle('is-link');
        this.nextElementSibling ?
            this.nextElementSibling.classList.toggle('is-link') :
            this.previousElementSibling.classList.toggle('is-link');
    } else {
        return false;
    }
    return true;
}

play_local.panel.mode.pvp.addEventListener('click', switchGameMode);
play_local.panel.mode.pve.addEventListener('click', switchGameMode);

// GAME SECTION




function gameSession() {

}