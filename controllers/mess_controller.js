const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    console.log(nick + " " + mess + " " + color + " " + date);
}

module.exports = {
    appendMess
}