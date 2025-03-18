<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';

    // Create new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.timeweb.ru';  // Specify your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'info@codeseven.ru';    // SMTP username
        $mail->Password = 'mg208y92c2';            // SMTP password
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Recipients
        $mail->setFrom('no-reply@no-reply', 'Contact Form');
        $mail->addAddress('info@codeseven.ru');     // Add recipient email

        // Content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Новая заявка с сайта';
        
        // Email body
        $emailBody = "
            <h2>Новая заявка с формы обратной связи</h2>
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Телефон:</strong> {$phone}</p>
            <p><strong>Сообщение:</strong><br>{$message}</p>
        ";

        $mail->Body = $emailBody;
        $mail->AltBody = strip_tags($emailBody);

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Сообщение успешно отправлено']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Ошибка отправки: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
}
?>
