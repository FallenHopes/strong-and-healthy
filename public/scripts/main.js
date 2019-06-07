document.addEventListener('DOMContentLoaded', () => {
    var messColor;
    switch (Math.floor(Math.random() * (20 - 1)) + 1) {
        case 1:
            messColor = "one";
            break;
        case 2:
            messColor = "two";
            break;
        case 3:
            messColor = "three";
            break;
        case 4:
            messColor = "four";
            break;
        case 5:
            messColor = "five";
            break;
        case 6:
            messColor = "six";
            break;
        case 7:
            messColor = "seven";
            break;
        case 8:
            messColor = "eight";
            break;
        case 9:
            messColor = "nine";
            break;
        case 10:
            messColor = "ten";
            break;
        case 11:
            messColor = "eleven";
            break;
        case 12:
            messColor = "twelve";
            break;
        case 13:
            messColor = "thirteen";
            break;
        case 14:
            messColor = "fourteen";
            break;
        case 15:
            messColor = "fifteen";
            break;
        case 16:
            messColor = "sixteen";
            break;
        case 17:
            messColor = "seventeen";
            break;
        case 18:
            messColor = "eighteen";
            break;
        case 19:
            messColor = "nineteen";
            break;
        case 20:
            messColor = "twenty";
            break;
    }
    $('#sendIdea').on('click', (e) => {
        e.preventDefault();
        var name = $('#personname').val().trim();
        var email = $('#personemail').val().trim();
        var idea = $('#idea').val();
        if (name === "") {
            $('#errorIdea').text("Введите ваше имя");
            return false;
        }
        else if (email === "") {
            $('#errorIdea').text("Введите ваш email");
            return false;
        }
        else if (idea.length < 10) {
            $('#errorIdea').text("Введите сообщение не менее 10 символов")
            return false;
        }
        $('#errorIdea').text("");
        $.ajax({
            url: '/mail.php',
            type: 'POST',
            cache: false,
            data: { 'name': name, 'email': email, 'idea': idea },
            dataType: 'html',
            beforeSend: function () {
                $('#sendIdea').prop("hidden", true);
            },
            success: function (data) {
                if (!data) {
                    alert('Не удалось отправить запрос на сервер!');
                }
                else {
                    $('form').trigger("reset");
                    alert("Спасибо за ваш отзыв!");
                }
                $('#sendIdea').prop("hidden", false);
            }
        });
    });
    var dangerBlock = document.getElementById('dangersMessages');
    document.getElementById('nick').addEventListener('input', (e) => {
        dangerBlock.style.height = ".01px";
        dangerBlock.textContent = "";
        if (e.target.value.length >= 15) {
            e.target.value = e.target.value.splice(15, 1);
        }
    });
    document.getElementById('message').addEventListener('input', (e) => {
        dangerBlock.style.height = ".01px";
        dangerBlock.textContent = "";
        if (e.target.value.length >= 100) {
            e.target.value = e.target.value.splice(100, 1);
        }
    });
    var socket = io.connect();
    document.getElementsByTagName('nav')[0].addEventListener('click', (e) => {
        e.preventDefault();
        var el = e.target;
        var calculate = document.getElementsByClassName('calculate')[0];
        var news = document.getElementsByClassName('news')[0];
        var lifehacks = document.getElementsByClassName('lifehacks')[0];
        var forum = document.getElementsByClassName('forum')[0];
        var ideas = document.getElementsByClassName('ideas')[0];
        var head = document.getElementsByClassName('wrap')[0];
        if (el.id === "diets") {
            document.getElementsByClassName('selected')[0].removeAttribute('class');
            el.className = "selected";
            calculate.removeAttribute('hidden');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++) {
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "black";
            }
            document.body.style.backgroundColor = "wheat";
            head.style.backgroundColor = "wheat";
            head.style.borderColor = "black";
            document.getElementsByTagName('header')[0].style.color = "#5a1430";
            document.body.style.transition = "1s ease";
        }
        else if (el.id === "news") {
            document.getElementsByClassName('selected')[0].removeAttribute('class');
            el.className = "selected";
            calculate.setAttribute('hidden', 'true');
            news.removeAttribute('hidden');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++) {
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "black";
            }
            document.body.style.backgroundColor = "white";
            head.style.backgroundColor = "white";
            head.style.borderColor = "black";
            document.getElementsByTagName('header')[0].style.color = "black";
            document.body.style.transition = "1s ease";
        }
        else if (el.id === "lifehacks") {
            document.getElementsByClassName('selected')[0].removeAttribute('class');
            el.className = "selected";
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.removeAttribute('hidden');
            forum.setAttribute('hidden', 'true');
            ideas.setAttribute('hidden', 'true');
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++) {
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "wheat";
            }
            document.body.style.backgroundColor = "#5a1430";
            head.style.backgroundColor = "#5a1430";
            head.style.borderColor = "wheat";
            document.getElementsByTagName('header')[0].style.color = "wheat";
            document.body.style.transition = "1s ease";
        }
        else if (el.id === "forum") {
            document.getElementsByClassName('selected')[0].removeAttribute('class');
            el.className = "selected";
            el.textContent = "ФОРУМ";
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.removeAttribute('hidden');
            ideas.setAttribute('hidden', 'true');
            document.body.style.backgroundColor = "#76c248";
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++) {
                document.getElementsByTagName('nav')[0].getElementsByTagName('span')[i].style.borderColor = "wheat";
            }
            head.style.backgroundColor = "#76c248";
            head.style.borderColor = "black";
            document.getElementsByTagName('header')[0].style.color = "black";
            head.style.borderColor = "wheat";
            blockofmess.scrollTo(100, blockofmess.scrollHeight);
        }
        else if (el.id === "ideas") {
            document.getElementsByClassName('selected')[0].removeAttribute('class');
            el.className = "selected";
            calculate.setAttribute('hidden', 'true');
            news.setAttribute('hidden', 'true');
            lifehacks.setAttribute('hidden', 'true');
            forum.setAttribute('hidden', 'true');
            ideas.removeAttribute('hidden');
            document.body.style.backgroundColor = "white";
            head.style.backgroundColor = "white";
            head.style.borderColor = "black";
            document.getElementsByTagName('header')[0].style.color = "black";
            for (var i = 0; i < document.getElementsByTagName('nav')[0].getElementsByTagName('span').length; i++) {
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
        if (mass.value.match(/^([2-9]\d{1}){1}$|^([1-2]\d{2}){1}$/) === null) {
            document.getElementsByClassName('massdiv')[0].classList.add('danger');
            possible[0] = 1;
        }
        else {
            document.getElementsByClassName('massdiv')[0].classList.remove('danger');
            possible[0] = 0;
        }
        if (heigth.value.match(/^1[3-9][0-9]$|^2[0-5][0-9]$/) === null) {
            document.getElementsByClassName('heigthdiv')[0].classList.add('danger');
            possible[1] = 1;
        }
        else {
            document.getElementsByClassName('heigthdiv')[0].classList.remove('danger');
            possible[1] = 0;
        }
        if (check1.checked === false && check2.checked === false) {
            document.getElementById('gender').classList.add('danger');
            possible[2] = 1;
        }
        else {
            document.getElementById('gender').classList.remove('danger');
            possible[2] = 0;
        }
        for (var i = 0; i < possible.length; i++) {
            if (possible[i] === 0) {
                go = true;
            }
            else {
                go = false;
            }
        }
        if (go) {
            document.getElementById('calC').style.padding = "5px";
            document.getElementById('calC').style.height = "25px";
            document.getElementById('calC').style.borderTop = "1px solid black";
            document.getElementById('predupr').style.height = ".1px";
        }
        else {
            document.getElementById('calC').style.padding = "0";
            document.getElementById('calC').style.height = ".01px";
            document.getElementById('calC').style.borderTop = "none";
            document.getElementById('predupr').style.height = "15px";
        }
    });
    document.getElementById('calC').addEventListener('click', () => {
        var mass = document.getElementById('mass').value;
        mass = parseInt(mass, 10);
        var height = document.getElementById('heigth').value;
        var gender = Gender();
        var index = IndexOfMass(mass, height, gender);
        var plan;
        switch (index) {
            case "norma":
                plan = "Ваши пропорции в рамках нормы. Составлена диета для поддержания формы.";
                break;
            case "distrof":
                plan = "Судя по всему, вам необходимо набрать вес. Соcтавлена диета для набора массы.";
                break;
            case "polnota":
                plan = "У вас лёгкая полнота. Соcтавлена диета для похудения.";
                break;
            case "ojirenie":
                plan = "Судя по данным, вы страдаете ожирением. Составлена диета для сброса веса.";
                break;
        }
        alert(plan + Kuper(height, gender));
    });
    document.getElementById('footer_btn').addEventListener('click', () => {
        var el = document.getElementById('footer_contacts_href');
        if (el.className === "footer_contacts_href close") {
            el.className = "footer_contacts_href open";
        }
        else {
            el.className = "footer_contacts_href close";
        }
    });
    document.getElementById('male').addEventListener('change', (e) => {
        if (e.target.checked === true) {
            document.getElementById('female').checked = false;
        }
    });
    document.getElementById('female').addEventListener('change', (e) => {
        if (e.target.checked === true) {
            document.getElementById('male').checked = false;
        }
    });
    var spam = new Date();
    spam.setSeconds(spam.getSeconds() + 30);
    var blockofmess = document.getElementsByClassName('container_for_mess')[0];
    document.getElementById('send').addEventListener('click', (e) => {
        e.preventDefault();
        var blockofmess = document.getElementsByClassName('container_for_mess')[0];
        var nick = document.getElementsByClassName('forum')[0].getElementsByTagName('input')[0].value;
        var mess = document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value;
        var current = new Date();
        if (nick === "") {
            dangerBlock.style.height = "20px";
            dangerBlock.textContent = "Введите никнейм не более 15 символов";
        }
        else if (mess === "") {
            dangerBlock.style.height = "20px";
            dangerBlock.textContent = "Введите сообщение не более 100 символов";
        }
        else {
            if (spam.getHours() === current.getHours() && spam.getMinutes() === current.getMinutes() && Math.abs(current.getSeconds() - spam.getSeconds()) < 3) {
                dangerBlock.style.height = "20px";
                dangerBlock.textContent = "Отправка сообщений разрешена с интервалом 3 сек.";
            }
            else {
                socket.emit('send', { mess: mess, nick: nick, colorClass: messColor });
                document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value = "";
                blockofmess.scrollTo(100, blockofmess.scrollHeight);
                spam = new Date();
            }
        }
    });
    var counterOfMess = 0;
    socket.on('add', (data) => {
        blockofmess.insertAdjacentHTML('beforeend',data.textForBlock);
        blockofmess.scrollTo(100, blockofmess.scrollHeight);
        if (document.getElementsByClassName('forum')[0].getAttribute('hidden') === "true") {
            counterOfMess++;
            document.getElementById('forum').textContent = "ФОРУМ(" + counterOfMess + ")";
        }
        else {
            document.getElementById('forum').textContent = "ФОРУМ";
            counterOfMess = 0;
        }
    });
    document.getElementsByClassName('forum')[0].addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            var blockofmess = document.getElementsByClassName('container_for_mess')[0];
            var nick = document.getElementsByClassName('forum')[0].getElementsByTagName('input')[0].value;
            var mess = document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value;
            var current = new Date();
            if (nick === "") {
                dangerBlock.style.height = "20px";
                dangerBlock.textContent = "Введите никнейм не более 15 символов";
            }
            else if (mess === "") {
                dangerBlock.style.height = "20px";
                dangerBlock.textContent = "Введите сообщение не более 100 символов";
            }
            else {
                if (spam.getHours() === current.getHours() && spam.getMinutes() === current.getMinutes() && Math.abs(current.getSeconds() - spam.getSeconds()) < 3) {
                    dangerBlock.style.height = "20px";
                    dangerBlock.textContent = "Отправка сообщений разрешена с интервалом 3 сек.";
                }
                else {
                    socket.emit('send', { mess: mess, nick: nick, colorClass: messColor });
                    document.getElementsByClassName('forum')[0].getElementsByTagName('textarea')[0].value = "";
                    blockofmess.scrollTo(100, blockofmess.scrollHeight);
                    spam = new Date();
                }
            }
        }
    });
    $.ajax({
        url: '/loadMess',
        beforeSend: () => {
            console.log('Запрос отправлен!');
        },
        success: data => {
            var massOfMess = JSON.parse(data);
            for (var i = 0; i < massOfMess.length; i++)
            {
                blockofmess.insertAdjacentHTML('beforeend',massOfMess[i]);
                blockofmess.scrollTo(100, blockofmess.scrollHeight);
            }
        }
    });
});

function IndexOfMass(mass, height, gender) {
    height = height.split('');
    height.splice(1, 0, '.');
    height = height.join('');
    height = parseFloat(height, 10);
    var coef = mass / (height * height);
    coef = coef.toFixed(1);
    if (gender === "male") {
        if (coef < 19) {
            return "distrof";
        }
        else if (coef > 25 && coef < 30) {
            return "polnota";
        }
        else if (coef > 30) {
            return "ojirenie";
        }
        else {
            return "norma";
        }
    }
    else if (gender === "female") {
        if (coef < 19) {
            return "distrof";
        }
        else if (coef > 24.9 && coef < 30) {
            return "polnota";
        }
        else if (coef > 30) {
            return "ojirenie";
        }
        else {
            return "norma";
        }
    }
}
function Gender() {
    if (document.getElementById('male').checked === true) {
        return "male";
    }
    else if (document.getElementById('female').checked === true) {
        return "female";
    }
}
function Kuper(height, gender) {
    height = parseInt(height, 10);
    if (gender === "male") {
        return "Ваш идеальный вес: " + Math.round((0.713 * height) - 58.0);
    }
    else if (gender === "female") {
        return "Ваш идеальный вес: " + Math.round((0.624 * height) - 48.9);
    }
}
