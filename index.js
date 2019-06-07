var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mailer = require("nodemailer");
var emailTransport = mailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "strongandhealthyruss@gmail.com",
        pass: "05v86a14d68"
    }
});
const port = process.env.PORT || 3000;
const Mess = require('./controllers/mess_controller');
server.listen(port);

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/loadMess', (req, res) => {
    var allmess = Mess.returnMess();
    var massBlocks = [];
    allmess.then(data => {
        if (data)
        {
            for (var i = 0; i < data.length; i++)
            {
                massBlocks[i] = createForumMessage(data[i].dataValues.nick, data[i].dataValues.mess, data[i].dataValues.color, data[i].dataValues.date);
            }
            res.send(JSON.stringify(massBlocks));
        }
    });
});

app.get('/mail', (req, res) => {
    var mail = {
        from: "Администрация Strong And Healthy",
        to: req.query.email,
        subject: "Ответ на ваш отзыв",
        text: "Уважаемый " + req.query.name + "! Ваш отзыв был принят! Спасибо!",
        html: "<b>Уважаемый " + req.query.name + "! Ваш отзыв был принят! Спасибо!</b>"
    }
    emailTransport.sendMail(mail, (error, response) => {
        if (error){
            console.log(error);
        }
        else{
            console.log("Сообещние отправлено! " + response.message);
        }
        emailTransport.close();
    });
});

connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
    });
    socket.on('send', (data) => {
        var date = new Date();
        var elem = createForumMessage(data.nick, data.mess, data.colorClass, generateDateString(date));
        Mess.appendMess(data.nick, data.mess, data.colorClass, generateDateString(date));
        io.sockets.emit('add', {textForBlock: elem});
    });
});

function createForumMessage(nick, mess, colorClass, date){
    mess = mess.replace(/>/g,"&#62;");
    mess = mess.replace(/</g, "&#60;");
    nick = nick.replace(/>/g,"&#62;");
    nick = nick.replace(/</g, "&#60;");
    var block = `<div class = "mess">
    <div class="mess_wrap">
    <h2 class = "${colorClass}">${nick}</h2>
    <span>${date}</span>
    </div>
    <p>${mess}</p>
    </div>`;
    return block;
}
function generateDateString(date){
    var monthStr;
    var minutsStr;
    var hoursStr;
    var daysStr;
    var fulldate;
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
    fulldate = daysStr + "." + monthStr + "." + date.getFullYear() + " , " + hoursStr + ":" + minutsStr;
    return fulldate;
}

