const main = require('./main.js');
const GameModel = require('./gamemodel.js');
const utils = require('./utils.js');

module.exports = rules_local = {
    game: {
        gameboard: new GameModel(document.getElementById('rules_game_board')),
        progressbar: document.getElementById('rules_progressbar')
    },
    panel: {
        replay: document.getElementById('rules_replay_button')
    },
    init: function () {
        main.nav.rules.addEventListener('click', async function () {
            while (rules_local.game.gameboard.animation_states.isrunning) {
                await utils.sleep(1);
            }
            await animationRun();
            this.tabAlreadyActive = true;
        });
        main.nav.play.addEventListener('click', animationClean);
        main.nav.about.addEventListener('click', animationClean);
        this.panel.replay.addEventListener('click', async function () {
            await animationClean();
            animationRun();
        });
    },
    tabAlreadyActive: false
};

async function animationRun() {
    rules_local.game.gameboard.animation_states.isrunning = true;

    if (!rules_local.tabAlreadyActive) {
        const play_order = [8, 4, 5, 2, 9, 1, 7];

        rules_local.game.progressbar.setAttribute('value', 0);
        rules_local.game.progressbar.setAttribute('max', play_order.length);

        let switchplayer = true;

        for (let i = 0; i < play_order.length; i++) {
            if (rules_local.game.gameboard.animation_states.cancelled) {
                break;
            }
            await utils.sleep(1000);
            rules_local.game.gameboard.cells[play_order[i]-1].innerHTML = switchplayer ?
                                                                  rules_local.game.gameboard.players.player1 :
                                                                  rules_local.game.gameboard.players.player2 ;
            rules_local.game.progressbar.setAttribute('value', i+1);
            switchplayer = !switchplayer;
        }
        await utils.sleep(100);
        rules_local.game.gameboard.detectCombination();
    }
    return rules_local.game.gameboard.animation_states.isrunning = false;
}

async function animationClean() {
    rules_local.tabAlreadyActive = false;
    while (rules_local.game.gameboard.animation_states.isrunning) {
        rules_local.game.gameboard.animation_states.cancelled = true;
        await utils.sleep(10);
    }
    rules_local.game.gameboard.animation_states.cancelled = false;
    rules_local.game.gameboard.clean();
}