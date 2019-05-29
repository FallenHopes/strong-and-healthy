<?php
    $name = $_GET['name'];
    $email = $_GET['email'];
    $idea = $_GET['idea'];
    $subject = "=?utf-8?B?".base64_encode("Администрация Strong And Healthy")."?=";
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
    $success = mail("vlad.serebrow@yandex.ru", $subject, $idea, $headers);
    echo $success;
?>