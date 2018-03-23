module.exports = class GameModel {
    constructor(board) {
        this.board = board;
        this.cells = this.board.children;
        this.endgameResultTypes = {
            win: ['game_board_cell__pop', 'game_board_cell__win'],
            lose: ['game_board_cell__pop', 'game_board_cell__lose'],
            draw: ['game_board_cell__pop', 'game_board_cell__draw'],

        };
        this.endgameResultAllTypes = Array.from(new Set([].concat.apply([], Object.values(this.endgameResultTypes))));
        this.player1 = '<i class="icon ion-close"></i>';
        this.player2 = '<i class="icon ion-ios-circle-outline"></i>';
    }

    clean() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].innerHTML = "";
            this.cells[i].classList.remove(...this.endgameResultAllTypes);
        }
    }

    async endgameAnimation(combination, endgameResult, cancelled) {
        let animation;
        switch (endgameResult) {
            case 'win':
                animation = this.endgameResultTypes.win;
                break;
            case 'lose':
                animation = this.endgameResultTypes.lose;
                break;
            case 'draw':
                animation = this.endgameResultTypes.draw;
                break;
        }
        for (let i = 0; i < combination.length; i++) {
            if (cancelled) {
                break;
            }
            this.cells[combination[i]-1].classList.add(...animation);
            await this._sleep(400);
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};