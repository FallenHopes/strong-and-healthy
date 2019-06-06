const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    const allMess = async () => {
        var allmess = await messages.findAll();
        return allmess;
    }
    allMess();
}
module.exports = {
    appendMess,
    returnMess
}