const main = require('./main.js');
const GameModel = require('./gamemodel.js');

module.exports = rules_local = {
    gamezone: {
        gameboard: new GameModel(document.getElementById('rules_game_board')),
        progressbar: document.getElementById('rules_progressbar')
    },
    panel: {
        replay: document.getElementById('rules_replay_button')
    },
    init: function () {
        main.nav.rules.addEventListener('click', async function () {
            while (rules_local.animation_states.isrunning) {
                await sleep(1);
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
    animation_states: {
        isrunning: false,
        cancelled: false
    },
    tabAlreadyActive: false
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animationRun() {
    rules_local.animation_states.isrunning = true;

    if (!rules_local.tabAlreadyActive) {
        const play_order = [8, 4, 5, 2, 9, 1, 7];

        rules_local.gamezone.progressbar.setAttribute('value', 0);
        rules_local.gamezone.progressbar.setAttribute('max', play_order.length);

        let switchplayer = true;

        for (let i = 0; i < play_order.length; i++) {
            if (rules_local.animation_states.cancelled) {
                break;
            }
            await sleep(1000);
            rules_local.gamezone.gameboard.cells[play_order[i]-1].innerHTML = switchplayer ?
                                                                  rules_local.gamezone.gameboard.player1 :
                                                                  rules_local.gamezone.gameboard.player2 ;
            rules_local.gamezone.progressbar.setAttribute('value', i+1);
            switchplayer = !switchplayer;
        }
        rules_local.gamezone.gameboard.endgameAnimation([7, 8, 9], 'win', rules_local.animation_states.cancelled);
    }
    return rules_local.animation_states.isrunning = false;
}

async function animationClean() {
    rules_local.tabAlreadyActive = false;
    while (rules_local.animation_states.isrunning) {
        rules_local.animation_states.cancelled = true;
        await sleep(10);
    }
    rules_local.animation_states.cancelled = false;
    rules_local.gamezone.gameboard.clean();
}