const main = require('./main.js');

module.exports = rules_local = {
    gameboard: {
        board: document.getElementById('rules_game_board'),
        cells: {},
        progressbar: document.getElementById('rules_progressbar')
    },
    panel: {
        replay: document.getElementById('rules_replay_button')
    },
    init: function () {
        main.nav.rules.addEventListener('click', async function () {
            while (rules_local.animation.isrunning) {
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
    animation: {
        isrunning: false,
        cancelled: false
    },
    tabAlreadyActive: false
};
// Add cells on rules_game_board Object
for (let i = 0; i < 9; i++) {
    rules_local.gameboard.cells[`cell` + (i + 1)] = rules_local.gameboard.board.children[i];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animationRun() {
    rules_local.animation.isrunning = true;

    if (!rules_local.tabAlreadyActive) {
        const play_order = [8, 4, 5, 2, 9, 1, 7];
        const player1 = '<i class="icon ion-close"></i>';
        const player2 = '<i class="icon ion-ios-circle-outline"></i>';

        rules_local.gameboard.progressbar.setAttribute('value', 0);
        rules_local.gameboard.progressbar.setAttribute('max', play_order.length);

        let switchplayer = true;

        for (let i = 0; i < play_order.length; i++) {
            if (rules_local.animation.cancelled) {
                break;
            }
            await sleep(1000);
            rules_local.gameboard.cells['cell' + play_order[i]].innerHTML = switchplayer ? player1 : player2;
            rules_local.gameboard.progressbar.setAttribute('value', i+1);
            switchplayer = !switchplayer;
        }
    }
    return rules_local.animation.isrunning = false;
}

async function animationClean() {
    rules_local.tabAlreadyActive = false;
    while (rules_local.animation.isrunning) {
        rules_local.animation.cancelled = true;
        await sleep(10);
        console.log('test');
    }
    rules_local.animation.cancelled = false;
    let cellsList = Object.keys(rules_local.gameboard.cells);
    for (let i = 0; i < 9; i++) {
        rules_local.gameboard.cells[cellsList[i]].innerHTML = "";
    }
}