const { messages } = require('../models');

function appendMess(nick, mess, color, date){
    messages.create({nick: nick, mess: mess, date: date, color: color});
}
function returnMess(){
    messages.findAll().then(data => {
        if (data)
        {
            console.log(Promise.resolve(data));
            console.log(data);
            return Promise.resolve(data);
        }
    })
}
module.exports = {
    appendMess,
    returnMess
}