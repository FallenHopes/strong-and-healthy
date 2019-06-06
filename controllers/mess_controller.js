const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
module.exports = {
    appendMess
}