nav = {
    play: document.getElementById('nav_play'),
    rules: document.getElementById('nav_rules'),
    about: document.getElementById('nav_about')
};

tabs = {
    play: document.getElementById('tab_play'),
    rules: document.getElementById('tab_rules'),
    about: document.getElementById('tab_about'),
};

let navList = Object.keys(nav);

function showActiveTab() {
    if (!this.classList.contains('is-active')) {
        for (let i = 0; i < navList.length; i++) {
            if (nav[navList[i]] === this) {
                this.classList.add('is-active');
                tabs[navList[i]].classList.remove('is-hidden-mobile',  'is-hidden-tablet');
            } else {
                nav[navList[i]].classList.remove('is-active');
                tabs[navList[i]].classList.add('is-hidden-mobile', 'is-hidden-tablet');
            }
        }
    } else {
        return false;
    }
    return true
}

for (let key in nav) {
    nav[key].addEventListener('click', showActiveTab);
}