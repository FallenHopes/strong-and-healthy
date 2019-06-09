const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    return messages.findAll();
}
function clearMess(date){
    messages.destroy({
        where: {
            createdAt:{
                [Op.lt]: date
            }
        }
    });
}
module.exports = {
    appendMess,
    returnMess,
    clearMess
}