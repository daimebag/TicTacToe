const utils = require('./utils.js');

module.exports = class GameModel {
    constructor(board) {
        this.board = board;
        this.cells = Array.from(this.board.children);
        this.players = {
            player1: '<i class="icon ion-close"></i>',
            player2: '<i class="icon ion-ios-circle-outline"></i>'
        };
        this.winningCombinations = "012 345 678 036 147 258 048 246 ";
        this.endgameResultTypes = {
            win: ['game_board_cell__pop', 'game_board_cell__win'],
            lose: ['game_board_cell__pop', 'game_board_cell__lose'],
            draw: ['game_board_cell__pop', 'game_board_cell__draw'],
        };
        this.endgameResultAllTypes = Array.from(new Set([].concat.apply([], Object.values(this.endgameResultTypes))));
        this.animation_states = {
            isrunning: false,
            cancelled: false
        };
    }

    detectCombination() {
        let endgameResult;
        let cellsToAnimate;
        let boardFull = true;

        outer:
            for (let p = 0, player; player = Object.values(this.players)[p]; p++) {
                let combination = "";
                for (let cell of this.winningCombinations) {
                    switch (cell) {
                        case " ":
                            if (this.winningCombinations.includes(combination)) {
                                endgameResult = p ? this.endgameResultTypes.lose : this.endgameResultTypes.win;
                                cellsToAnimate = Array.from(combination, x => Number(x));
                                break outer;
                            }
                            combination = "";
                            break;
                        default:
                            if (!this.cells[cell].innerHTML) {
                                boardFull = false;
                                combination += "_";
                            } else if (this.cells[cell].innerHTML == player) {
                                combination += cell;
                            } else {
                                combination += "x";
                            }
                    }
                }
            }
        if (cellsToAnimate) {
            return this.endgameAnimation(cellsToAnimate, endgameResult);
        } else if (boardFull) {
            return this.endgameAnimation([0, 1, 2, 3, 4, 5, 6, 7, 8], this.endgameResultTypes.draw);
        }
        else {
            return false;
        }
    };

    async endgameAnimation(combination, endgameResult) {
        let endgame = true;
        if (combination.length <= 3) {
            for (let cell of combination) {
                if (this.animation_states.cancelled) {
                    return;
                }
                await utils.sleep(200);
                if (this.animation_states.cancelled) {
                    return;
                }
                this.cells[cell].classList.add(...endgameResult);
                await utils.sleep(200);
            }
        } else {
            endgame = 'draw';
            outer:
            for (let cs = 0; cs < 3; cs++) {
                for (let c = 0; c < 3; c++) {
                    let cell;
                    while (true) {
                        if (this.animation_states.cancelled) {
                            return;
                        }
                        cell = utils.getRandomInt(9);
                        if (combination.includes(cell)) {
                            this.cells[cell].classList.add(...endgameResult);
                            combination = combination.filter(e => e !== cell);
                            break;
                        }
                    }
                    await utils.sleep(100);
                }
            }
        }
        await utils.sleep(400);
        return endgame;
    }

    // CLEAN BOARD
    clean() {
        for (let cell of this.cells) {
            cell.innerHTML = "";
            cell.classList.remove(...this.endgameResultAllTypes);
        }
    }

};

async function play() {
    cellsToggleEvent(false);
    const currentCell = this.id.slice(-1);
    let scoreCurrentPlayer = Object.values(play_local.panel.score)[play_local.session.currentPlayer];
    const scoreAnimation = ['animated', 'flipInX'];

    scoreCurrentPlayer.classList.remove(...scoreAnimation);

    if (play_local.session.cellsPlayed.includes(currentCell)) {
        return false;
    }
    this.innerHTML = Object.values(play_local.game.players)[play_local.session.currentPlayer];

    const endgame = await play_local.game.detectCombination();
    if (play_local.game.animation_states.cancelled) {
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