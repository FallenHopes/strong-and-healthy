const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
    console.log("Объект в бд создан! Все объекты в бд: " + messages.findAll());
}

module.exports = {
    appendMess
}