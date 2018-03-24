module.exports = {
    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
};