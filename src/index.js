require('./assets/css/bulma.css');
require('./assets/css/main.scss');

const main = require('./assets/js/main.js');
const play = require('./assets/js/play.js');
const rules = require('./assets/js/rules.js');


window.onload = function () {
    console.log('Main init');
    main.init();

    console.log('Play init');
    play.init();

    console.log('Rules Init');
    rules.init();
};