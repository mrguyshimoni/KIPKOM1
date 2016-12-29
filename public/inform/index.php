<?php

$email = isset($_REQUEST['email']) ? $_REQUEST['email'] : null;

if (empty($email)) {
    echo 'NOT OK';
    exit;
}


$recepient = "hi@playkit.xyz";
$name = "Playkit landing page";
$sender = "landing@playkit.xyz";
$subject = "Inform when playkit in on";
$message = 'To this person: <a href="mailto:'.$email.'">'.$email.'</a>';


include_once('class.emailSender.php');

$mail = new emailSender();
$response = $mail->sendEmail(
    $recepient, 
    $sender, 
    $subject, 
    $message, 
    $name
);

if ($response) {
    echo 'OK';
}
else {
    echo 'NOT OK';
}
