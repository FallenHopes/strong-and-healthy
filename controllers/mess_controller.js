const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    console.log(messages.findAll());
    return messages.findAll();
}
module.exports = {
    appendMess,
    returnMess
}