require('./assets/css/bulma.css');
require('./assets/css/main.scss');

const main = require('./assets/js/main.js');
const game = require('./assets/js/game.js');
const rules = require('./assets/js/rules.js');


window.onload = function () {
    console.log('Main init');
    main.init();

    console.log('Game init');
    game.init();

    console.log('Rules Init');
    rules.init();
};