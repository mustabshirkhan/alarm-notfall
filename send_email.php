<?php
// Include PHPMailer classes
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format.");
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.sendgrid.net';      // SendGrid SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'apikey';                 // SendGrid API key username (always 'apikey')
        $mail->Password   = '';  // Your SendGrid API key
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port       = 587;                      // TCP port for TLS

        // Set the "From" email and name
        $mail->setFrom('from@email.com', 'Alarm Notfall Contact');  // A verified "From" email address

        // Add recipient
        $mail->addAddress('to@example.com');   // Add recipient's email address

        // Add Reply-To header
        $mail->addReplyTo($email, $name);             // Set Reply-To to the user's email

        // Email content
        $mail->isHTML(false);
        $mail->Subject = "Contact Form Submission from " . $name;
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send email
        $mail->send();
        echo 'Message sent successfully!';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}
?>
