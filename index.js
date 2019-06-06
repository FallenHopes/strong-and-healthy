var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
const Mess = require('./controllers/mess_controller');
server.listen(port);

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', (socket) => {
    const allMess = async () => {
        var all = await Mess.returnMess();
        console.log(all);
    }
    allMess();
    // for (var i = 0; i < allmess.messages.length; i++)
    // {
    //     console.log(allmess.messages[i].dataValues.date);
    //     var allOfDate = JSON.parse(allmess.messages[i].dataValues.date);
    //     console.log(allmess.messages[i].dataValues);
    //     io.sockets.emit('add', {textForBlock: createForumMessage(allmess.messages[i].dataValues.nick, allmess.messages[i].dataValues.mess, allmess.messages[i].dataValues.color, allOfDate)});
    // }
    connections.push(socket);
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
    });
    socket.on('send', (data) => {
        var date = new Date();
        var elem = createForumMessage(data.nick, data.mess, data.colorClass, date);
        Mess.appendMess(data.nick, data.mess, data.colorClass, date.toString());
        io.sockets.emit('add', {textForBlock: elem});
    });
});

function createForumMessage(nick, mess, colorClass, date){
    var monthStr;
    var minutsStr;
    var hoursStr;
    var daysStr;
    if (date.getMonth() + 1 <= 9)
    {
        monthStr = "0" + (date.getMonth() + 1);
    }
    else{
        monthStr = (date.getMonth() + 1);
    }
    if (date.getMinutes() <= 9)
    {
        minutsStr = "0" + date.getMinutes();
    }
    else{
        minutsStr = date.getMinutes();
    }
    if (date.getDate() <= 9)
    {
        daysStr = "0" + date.getDate();
    }
    else{
        daysStr = date.getDate();
    }
    if (date.getHours() + 3 <= 9)
    {
        hoursStr = "0" + (date.getHours() + 3);
    }
    else{
        hoursStr = (date.getHours() + 3);
    }
    mess = mess.replace(/>/g,"&#62;");
    mess = mess.replace(/</g, "&#60;");
    nick = nick.replace(/>/g,"&#62;");
    nick = nick.replace(/</g, "&#60;");
    var block = `<div class = "mess">
    <div class="mess_wrap">
    <h2 class = "${colorClass}">${nick}</h2>
    <span>${daysStr}.${monthStr}.${date.getFullYear()} , ${hoursStr}:${minutsStr}</span>
    </div>
    <p>${mess}</p>
    </div>`;
    return block;
}

