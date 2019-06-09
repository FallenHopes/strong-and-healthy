var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mailer = require("nodemailer");
var emailTransport = mailer.createTransport({
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
    var date = new Date();
    date = date.setDate(date.getDate() - 1);
    console.log(date);
    Mess.clearMess(date);
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
        subject: "Ответ на ваш отзыв. Администрация Strong And Healthy",
        text: "Уважаемый " + req.query.name + "! Ваш отзыв был принят! Спасибо!",
        html: htmlForResponse(req.query.name)
    }
    var mailToMe = {
        from: "Администрация Strong And Healthy",
        to: "strongandhealthyruss@gmail.com",
        subject: "Отзыв от " + req.query.name,
        text: "Отзыв: " + req.query.idea + "\n --------Конец отзыва------- \n Отвечать на ящик: " + req.query.email,
        html: "<b>Отзыв:</b><br> " + req.query.idea + " <br>--------<b>Конец отзыва</b>-------<br>Отвечать на ящик: <b>" + req.query.email + "</b>"
    }
    emailTransport.sendMail(mail, (error, response) => {
        if (error){
            console.log(error);
        }
        else{
            console.log("Сообещние отправлено!");
        }
        emailTransport.close();
    });
    emailTransport.sendMail(mailToMe, (error, response) => {
        if (error)
        {
            console.log(error);
        }
        else{
            console.log("Улетело на админ-ящик");
        }
        emailTransport.close();
    });
    res.send("Отзыв отправлен! Информация о доставке отправлена на ваш электронный ящик!");
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
        if ((date.getHours() + 3) === 24)
        {
            hoursStr = "00";
            if ((date.getDate() + 1) <= 9)
            {
                daysStr = "0" + (date.getDate() + 1);
            }
            else{
                daysStr = (date.getDate() + 1);
            }
        }
        else if ((date.getHours() + 3) === 25)
        {
            hoursStr = "01";
            if ((date.getDate() + 1) <= 9)
            {
                daysStr = "0" + (date.getDate() + 1);
            }
            else{
                daysStr = (date.getDate() + 1);
            }
        }
        else if((date.getHours() + 3) === 26)
        {
            hoursStr = "02";
            if ((date.getDate() + 1) <= 9)
            {
                daysStr = "0" + (date.getDate() + 1);
            }
            else{
                daysStr = (date.getDate() + 1);
            }
        }
        else if((date.getHours() + 3) === 27)
        {
            hoursStr = "03";
            if ((date.getDate() + 1) <= 9)
            {
                daysStr = "0" + (date.getDate() + 1);
            }
            else{
                daysStr = (date.getDate() + 1);
            }
        }
        else{
            hoursStr = (date.getHours() + 3);
        }
    }
    fulldate = daysStr + "." + monthStr + "." + date.getFullYear() + " , " + hoursStr + ":" + minutsStr;
    return fulldate;
}
function htmlForResponse(name)
{
    var date = new Date();
    return `<div style = "font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; width: 550px; height: 500px; padding: 10px; padding-top: 50px; background-color: #76c248; border-radius: 15px; border: 1px solid black">
    <img style = "display: block; width: 200px; height: 200px; margin: 0 auto; margin-bottom: 30px" src="http://strong-and-healthy.herokuapp.com/img/S&HfooterLogo.png">
    <h1 style = "display: block; text-align: center">Уважаемый ${name}!</h1>
    <h2 style = "display: block; text-align: center">Дата обращения: ${generateDateString(date)}</h2>
    <h1 style = "display: block; text-align: center">Спасибо за ваш отзыв!</h1>
    <span style = "font-size: 10px; font-weight: bold; display: block; text-align: right; margin-top: 100px">Администрация Strong And Healthy</span>
    </div>`
}

