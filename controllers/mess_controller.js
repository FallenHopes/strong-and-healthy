const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    messages.findAll().then(data => {
        if (data)
        {
            console.log("первый запрос");
            return data;
        }
    })
}
module.exports = {
    appendMess,
    returnMess
}