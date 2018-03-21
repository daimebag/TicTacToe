module.exports = game_local = {
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

function resetScore() {
    game_local.panel.score.innerText = "0 - 0";
    return console.log("TicTacToe Message: Game was reinitialized.");
}

game_local.panel.reset.addEventListener('click', resetScore);

function switchGameMode() {
    resetScore();
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

game_local.panel.mode.pvp.addEventListener('click', switchGameMode);
game_local.panel.mode.pve.addEventListener('click', switchGameMode);

// GAME SECTION
let player1 = '<i class="icon ion-close"></i>';
let player2 = '<i class="icon ion-ios-circle-outline"></i>';