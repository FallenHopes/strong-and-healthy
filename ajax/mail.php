<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $idea = $_POST['idea'];
    $subject = "=?utf-8?B?".base64_encode("Администрация Strong And Healthy")."?=";
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
    $success = mail("admin@strongandhealthy.com", $subject, $message, $headers);
    echo $success;    
?>