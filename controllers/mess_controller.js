const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    return messages.findAll().then(allmess => {
        return allmess;
    });
}
module.exports = {
    appendMess,
    returnMess
}