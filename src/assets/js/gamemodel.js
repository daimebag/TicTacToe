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
            console.log(cellsToAnimate, 'combination');
            return this.endgameAnimation(cellsToAnimate, endgameResult);
        } else if (boardFull) {
            return this.endgameAnimation([0, 1, 2, 3, 4, 5, 6, 7, 8], this.endgameResultTypes.draw);
        }
    };

    async endgameAnimation(combination, endgameResult) {
        for (let cell of combination) {
            if (this.animation_states.cancelled) {
                break;
            }
            await this._sleep(200);
            this.cells[cell].classList.add(...endgameResult);
            await this._sleep(200);
        }
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