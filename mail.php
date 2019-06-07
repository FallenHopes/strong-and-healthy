<?php
    $name = $_GET['name'];
    $email = $_GET['email'];
    $idea = $_GET['idea'];
    $subject = '=?UTF-8?B?'.Base64_encode("Идея или жалоба Strong And Healthy").'?=';
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
    $success = mail("vlad.serebrow@yandex.ru", $subject, $idea, $headers);
    echo $success;
?>