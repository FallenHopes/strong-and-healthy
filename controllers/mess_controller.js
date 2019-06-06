const { Messages } = require('../models');

function appendMess(nick, mess, color, date){
    Messages.create({nick: nick, mess: mess, date: date, color: color});
}

module.exports = {
    appendMess
}