document.addEventListener('DOMContentLoaded', ()=>{
    // Тут переключатель сайта по секциям. Так как переходить по ссылкам затратно и отнимает время, переключатель будет быстрее, думаю)
    document.getElementsByTagName('nav')[0].addEventListener('click', (e)=>{
        e.preventDefault();
        document.getElementsByClassName('selected')[0].removeAttribute("class");
        var el = e.target;
        var calculate = document.getElementsByClassName('calculate')[0];
        var news = document.getElementsByClassName('news')[0];
        var lifehacks = document.getElementsByClassName('lifehacks')[0];
        var forum = document.getElementsByClassName('forum')[0];
        el.className = "selected";
        if (el.id === "diets")
        {
            calculate.removeAttribute('hidden');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
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
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++){
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "wheat";
            }
            document.body.style.backgroundColor = "#5a1430";
            document.getElementsByTagName('header')[0].style.color = "wheat";
            document.body.style.transition = "1s ease";
        }
        else if(el.id === "forum")
        {
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.removeAttribute('hidden');
            document.body.style.backgroundColor = "#76c248";
            blockofmess.scrollTo(100, blockofmess.scrollHeight);
        }
    });
    // Здесь целый блок расчёта и выбора PDF. Я здесь реализовывал лишь доступ к кнопке расчёта и подсветку красными звёздочками недостающих
    // полей. На тебе выгрузка пдф, ну или чего-нибудь
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
        document.getElementById('predupr').style.height = "15px";
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
        }
        else{
            document.getElementById('calC').style.padding = "0";
            document.getElementById('calC').style.height = ".1px";
            document.getElementById('calC').style.borderTop = "none";        
        }
    });
    // Эта кнопка для выезжающих контактов в футере
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
    // Эти два обработчика для выбора пола. Тобишь для того, чтобы можно было тыркнуть только 1 галку
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
    // Следующие 4 обработчика для того, чтобы была возможность выбора только 1 чекбокса в категории (Я:)
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
    // Дальше происходит подгрузка сообщений из БД, ну в моём случае из объекта JSON.
    // Я создал заготовку, не думаю, что тебе многое придётся менять. Будет та же самая 
    // подгрузка из JSON, просто уже с серва.
    var blockofmess = document.getElementsByClassName('container_for_mess')[0];
    // Вот собственно сам объект JSON в формате строки
    var messages = '{"Messages":[{"nickName": "Nagibator3000", "message": "Сегодня вдул училке ;)", "date": "24.05.2019 , 14:58"}, {"nickName": "Vladidas", "message": "Твоей училке все вдували, долбик", "date": "24.05.2019 , 14:59"},{"nickName": "Hater", "message": "Хорош флудить, делом займитесь :с", "date": "24.05.2019 , 15:20"},{"nickName": "Nagibator3000", "message": "Он так-то первый начал", "date": "24.05.2019 , 16:00"},{"nickName": "Vlados", "message": "Идите в жопу короче, мне тут сайт верстать надо, а я сам с собой собачусь))", "date": "24.05.2019 , 18:00"},{"nickName": "Nagibator3000", "message": "Вот и иди", "date": "24.05.2019 , 19:58"}]}';
    messages = JSON.parse(messages);
    // Распарсил в объект, теперь могу с ним работать как с массивом/объектом
    for (var i = 0; i < messages.Messages.length; i++)
    {
        blockofmess.appendChild(loadForumMessages(messages.Messages[i].nickName, messages.Messages[i].message, messages.Messages[i].date));
    }
    // Обработчик для добавления сообщения на серв.
    document.getElementById('send').addEventListener('click', (e) => {
        e.preventDefault();
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
            blockofmess.appendChild(createForumMessage(nick, mess));
            document.getElementsByClassName('forum')[0].getElementsByTagName('input')[0].value = "";
            document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value = "";
            blockofmess.scrollTo(100, blockofmess.scrollHeight);
        }
    });
});

function createForumMessage(nick, mess){
    var date = new Date();
    var monthStr;
    if (date.getMonth() + 1 <= 9)
    {
        monthStr = "0" + (date.getMonth() + 1);
    }
    else{
        monthStr = (date.getMonth() + 1);
    }
    var block = document.createElement('div');
    block.className = "mess";
    block.innerHTML = `<div class="mess_wrap">
    <h2>${nick}</h2>
    <span>${date.getDate()}.${monthStr}.${date.getFullYear()} , ${date.getHours()}:${date.getMinutes()}</span>
    </div>
    <p>${mess}</p>`;
    return block;
}
function loadForumMessages(nick, mess, date){
    var block = document.createElement('div');
    block.className = "mess";
    block.innerHTML = `<div class="mess_wrap">
    <h2>${nick}</h2>
    <span>${date}</span>
    </div>
    <p>${mess}</p>`;
    return block;
}