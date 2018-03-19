require('./assets/css/bulma.css');
require('./assets/css/main.scss');

require('./assets/js/main.js');
require('./assets/js/game.js');


window.onload = function () {
    console.log('Main init');
    tabs.rules.classList.add('is-hidden-mobile', 'is-hidden-tablet');
    tabs.about.classList.add('is-hidden-mobile', 'is-hidden-tablet');
    nav.play.classList.add('is-active');
    console.log('Game init');
    panel.mode.pve.classList.add('is-link');
};

