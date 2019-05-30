document.addEventListener('DOMContentLoaded', ()=>{
    $('#sendIdea').on('click', (e) => {
        e.preventDefault();
        var name = $('#personname').val().trim();
        var email = $('#personemail').val().trim();
        var idea = $('#idea').val();
        if (name === "")
        {
            $('#errorIdea').text("Введите ваше имя");
            return false;
        }
        else if(email === "")
        {
            $('#errorIdea').text("Введите ваш email");
            return false;
        }
        else if (idea.length < 10)
        {
            $('#errorIdea').text("Введите сообщение не менее 10 символов")
            return false;
        }
        $('#errorIdea').text("");
        $.ajax({
            url: '/mail.php',
            type: 'POST',
            cache: false,
            data: { 'name': name, 'email': email, 'idea': idea },
            dataType: 'text',
            beforeSend: function(){
                $('#sendIdea').prop("hidden", true);
            },
            success: function(data) {
                if (!data)
                {
                    alert('Не удалось отправить запрос на сервер!');
                }
                else{
                    $('form').trigger("reset");
                    alert("Спасибо за ваш отзыв!");
                }
                $('#sendIdea').prop("hidden", false);
            }
        });
    });
    var socket = io.connect();
    document.getElementsByTagName('nav')[0].addEventListener('click', (e)=>{
        e.preventDefault();
        document.getElementsByClassName('selected')[0].removeAttribute("class");
        var el = e.target;
        var calculate = document.getElementsByClassName('calculate')[0];
        var news = document.getElementsByClassName('news')[0];
        var lifehacks = document.getElementsByClassName('lifehacks')[0];
        var forum = document.getElementsByClassName('forum')[0];
        var ideas = document.getElementsByClassName('ideas')[0];
        el.className = "selected";
        if (el.id === "diets")
        {
            calculate.removeAttribute('hidden');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++){
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "black";
            }
            document.body.style.backgroundColor = "wheat";
            document.getElementsByTagName('header')[0].style.color = "#5a1430";
            document.body.style.transition = "1s ease";
        }
        else if(el.id === "news")
        {
            calculate.setAttribute('hidden', 'true');
            news.removeAttribute('hidden');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++){
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "black";
            }
            document.body.style.backgroundColor = "white";
            document.getElementsByTagName('header')[0].style.color = "#5a1430";
            document.body.style.transition = "1s ease";
        }
        else if (el.id === "lifehacks")
        {
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.removeAttribute('hidden');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++){
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "wheat";
            }
            document.body.style.backgroundColor = "#5a1430";
            document.getElementsByTagName('header')[0].style.color = "wheat";
            document.body.style.transition = "1s ease";
        }
        else if(el.id === "forum")
        {
            el.textContent = "ФОРУМ";
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.removeAttribute('hidden');
            ideas.setAttribute('hidden', 'true');
            document.body.style.backgroundColor = "#76c248";
            blockofmess.scrollTo(100, blockofmess.scrollHeight);
        }
        else if(el.id === "ideas")
        {
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.removeAttribute('hidden');
            document.body.style.backgroundColor = "white";
            document.getElementsByTagName('header')[0].style.color = "black";
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++){
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "black";
            }
        }
    });
    document.getElementsByClassName('calculate')[0].addEventListener('input', () => {
        var possible = [];
        var go = false;
        var mass = document.getElementById('mass');
        var heigth = document.getElementById('heigth');
        var check1 = document.getElementById('male');
        var check2 = document.getElementById('female');
        var sport = document.getElementById('sportsmen');
        var middle = document.getElementById('middle');
        var fade = document.getElementById('fade');
        var drish = document.getElementById('drish');
        if (mass.value.match(/^([2-9]\d{1}){1}$|^([1-2]\d{2}){1}$/) === null){
            document.getElementsByClassName('massdiv')[0].classList.add('danger');
            possible[0] = 1;
        }
        else{
            document.getElementsByClassName('massdiv')[0].classList.remove('danger');
            possible[0] = 0;
        }
        if (heigth.value.match(/^1[3-9][0-9]$|^2[0-5][0-9]$/) === null){
            document.getElementsByClassName('heigthdiv')[0].classList.add('danger');
            possible[1] = 1;
        }
        else{
            document.getElementsByClassName('heigthdiv')[0].classList.remove('danger');
            possible[1] = 0;
        }
        if (check1.checked === false && check2.checked === false){
            document.getElementById('gender').classList.add('danger');
            possible[2] = 1;
        }
        else{
            document.getElementById('gender').classList.remove('danger');
            possible[2] = 0;
        }
        if (sport.checked === false && middle.checked === false && fade.checked === false && drish.checked === false){
            document.getElementById('i').classList.add('danger');
            possible[3] = 1;
        }
        else{
            document.getElementById('i').classList.remove('danger');
            possible[3] = 0;
        }
        for (var i = 0; i < possible.length; i++)
        {
            if (possible[i] === 0)
            {
                go = true;
            }
            else{
                go = false;
            }
        }
        if(go)
        {
            document.getElementById('calC').style.padding = "5px";
            document.getElementById('calC').style.height = "25px";
            document.getElementById('calC').style.borderTop = "1px solid black";
            document.getElementById('predupr').style.height = ".1px"; 
        }
        else{
            document.getElementById('calC').style.padding = "0";
            document.getElementById('calC').style.height = ".1px";
            document.getElementById('calC').style.borderTop = "none";       
            document.getElementById('predupr').style.height = "15px";
        }
    });
    document.getElementById('footer_btn').addEventListener('click', () => {
        var el = document.getElementById('footer_contacts_href');
        if (el.className === "footer_contacts_href close")
        {
            el.className = "footer_contacts_href open";
        }
        else{
            el.className = "footer_contacts_href close";
        }
    });
    document.getElementById('male').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('female').checked = false;
        }
    });
    document.getElementById('female').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('male').checked = false;
        }
    });
    document.getElementById('sportsmen').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('middle').checked = false;
            document.getElementById('fade').checked = false;
            document.getElementById('drish').checked = false;
        }
    });
    document.getElementById('middle').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('sportsmen').checked = false;
            document.getElementById('fade').checked = false;
            document.getElementById('drish').checked = false;
        }
    });
    document.getElementById('fade').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('middle').checked = false;
            document.getElementById('sportsmen').checked = false;
            document.getElementById('drish').checked = false;
        }
    });
    document.getElementById('drish').addEventListener('change', (e) => {
        if (e.target.checked === true)
        {
            document.getElementById('middle').checked = false;
            document.getElementById('fade').checked = false;
            document.getElementById('sportsmen').checked = false;
        }
    });
    var blockofmess = document.getElementsByClassName('container_for_mess')[0];
    document.getElementById('send').addEventListener('click', (e) => {
        e.preventDefault();
        var blockofmess = document.getElementsByClassName('container_for_mess')[0];
        var nick = document.getElementsByClassName('forum')[0].getElementsByTagName('input')[0].value;
        var mess = document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value;
        if (nick === "")
        {
            alert("Пожалуйста, введите никнейм!");
        }
        else if(mess === "")
        {
            alert("Пожалуйста, введите сообщение!");
        }
        else{
            socket.emit('send', {mess: mess, nick: nick});
            document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value = "";
            blockofmess.scrollTo(100, blockofmess.scrollHeight);
        }
    });
    var counterOfMess = 0;
    socket.on('add', (data) => {
        blockofmess.appendChild(createForumMessage(data.nick, data.mess));
        blockofmess.scrollTo(100, blockofmess.scrollHeight);
        if (document.getElementsByClassName('forum')[0].getAttribute('hidden') === "true")
        {
            counterOfMess++;
            document.getElementById('forum').textContent ="ФОРУМ(" + counterOfMess + ")";
        }
        else{
            document.getElementById('forum').textContent = "ФОРУМ";
            counterOfMess = 0;
        }
    });
    document.getElementsByClassName('forum')[0].addEventListener('keypress', (e) => {
        if (e.keyCode === 13)
        {
            e.preventDefault();
            var blockofmess = document.getElementsByClassName('container_for_mess')[0];
            var nick = document.getElementsByClassName('forum')[0].getElementsByTagName('input')[0].value;
            var mess = document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value;
            if (nick === "")
            {
                alert("Пожалуйста, введите никнейм!");
            }
            else if(mess === "")
            {
                alert("Пожалуйста, введите сообщение!");
            }
            else{
                socket.emit('send', {mess: mess, nick: nick});
                document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value = "";
                blockofmess.scrollTo(100, blockofmess.scrollHeight);
            }
        }
    });
});

function createForumMessage(nick, mess){
    var date = new Date();
    var monthStr;
    var minutsStr;
    if (date.getMonth() + 1 <= 9)
    {
        monthStr = "0" + (date.getMonth() + 1);
    }
    else{
        monthStr = (date.getMonth() + 1);
    }
    if (date.getMinutes() <= 9)
    {
        minutsStr = "0" + (date.getMinutes());
    }
    else{
        minutsStr = (date.getMinutes());
    }
    mess = mess.replace(/>/g,"&#62;");
    mess = mess.replace(/</g, "&#60;");
    nick = nick.replace(/>/g,"&#62;");
    nick = nick.replace(/</g, "&#60;");
    var block = document.createElement('div');
    block.className = "mess";
    block.innerHTML = `<div class="mess_wrap">
    <h2>${nick}</h2>
    <span>${date.getDate()}.${monthStr}.${date.getFullYear()} , ${date.getHours()}:${minutsStr}</span>
    </div>
    <p>${mess}</p>`;
    return block;
}
