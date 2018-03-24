module.exports = class GameModel {
    constructor(board) {
        this.board = board;
        this.cells = Array.from(this.board.children);
        this.winningCombinations = "012 345 678 036 147 258 048 246 ";
        this.endgameResultTypes = {
            win: ['game_board_cell__pop', 'game_board_cell__win'],
            lose: ['game_board_cell__pop', 'game_board_cell__lose'],
            draw: ['game_board_cell__pop', 'game_board_cell__draw'],
        };
        this.endgameResultAllTypes = Array.from(new Set([].concat.apply([], Object.values(this.endgameResultTypes))));
        this.players = {
            player1: '<i class="icon ion-close"></i>',
            player2: '<i class="icon ion-ios-circle-outline"></i>'
        };
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
                await this._sleep(200);
                if (this.animation_states.cancelled) {
                    return;
                }
                this.cells[cell].classList.add(...endgameResult);
                await this._sleep(200);
            }
        } else {
            endgame = 'draw';
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            outer:
            for (let cs = 0; cs < 3; cs++) {
                for (let c = 0; c < 3; c++) {
                    let cell;
                    while (true) {
                        if (this.animation_states.cancelled) {
                            return;
                        }
                        cell = getRandomInt(9);
                        if (combination.includes(cell)) {
                            this.cells[cell].classList.add(...endgameResult);
                            combination = combination.filter(e => e !== cell);
                            break;
                        }
                    }
                    await this._sleep(100);
                }
            }
        }
        await this._sleep(400);
        return endgame;
    }

    // CLEAN BOARD
    clean() {
        for (let cell of this.cells) {
            cell.innerHTML = "";
            cell.classList.remove(...this.endgameResultAllTypes);
        }
    }

    // FUNCTION SLEEP USED FOR ANIMATION
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};