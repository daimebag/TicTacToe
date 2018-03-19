panel = {
    mode: {
        pvp: document.getElementById('game_panel_mode_pvp'),
        pve: document.getElementById('game_panel_mode_pve')
    },
    reset: document.getElementById('game_panel_reset_button'),
    score: document.getElementById('game_panel_score')
};

panel.reset.onclick = function () {
    panel.score.innerText = "0 - 0";
    return console.log("TicTacToe Message: Game was reinitialized.");
};

function switchGameMode() {
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

panel.mode.pvp.addEventListener('click', switchGameMode);
panel.mode.pve.addEventListener('click', switchGameMode);