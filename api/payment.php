<?php

if($_REQUEST['package'] && $_REQUEST['price']) {   

  // Вводим временно статичные данные у существующих тарифах
  $validSMMtrfs = ['Базовый пакет', 'Средний пакет', 'Полный пакет'];
  $validSMMtrfsPrices = ['Базовый пакет' => 25000, 'Средний пакет' => 50000, 'Полный пакет' => 15];
  
  // Собираем данные о тарифе
  $trf = trim($_REQUEST['package']);
  $price = trim($_REQUEST['price']);

  // Собираем инфу о покупателе
  $name = trim($_REQUEST['name']);
  $phone = trim($_REQUEST['phone']);
  $email = trim($_REQUEST['email']);

  // Минимальная проверка на правильность тарифов и их ценников
  if(!in_array($trf, $validSMMtrfs)) {

    echo json_encode(['status' => 'error', 'msg' => 'Выбран некорректный тариф!']);
    return;

  } else {
    if($price != $validSMMtrfsPrices[$trf]) {

      echo json_encode(['status' => 'error', 'msg' => 'Введена некорректная сумма!']);
      return;

    } 
  }  

  // Формируем номер заказа пока из текущей даты
  $orderId = time();

  // Массив с данными для инициализации платежа
  $data = [
    "Amount"      => $price*100,
    "Description" => 'Заказ с сайта CodeSeven на услугу SMM тариф: '.$trf,
    "OrderId"     => $orderId,
    "TerminalKey" => '1742973723732',
    "Password"    => 'P*IdENENC1sg5a$q',
    "DATA" => [
      "Phone" => $phone,
      "Email" => $email
    ]
  ];  

  ksort($data);
  
  // Получаем все значения из массива
  $values = array_values($data);

  // Конкатенируем все значения в одну строку
  $concatenatedString = implode('', $values);

  // Хэшируем
  $hashedString = hash('sha256', $concatenatedString);

  $data['Token'] = $hashedString;
  unset($data['Password']);
  
  $postDataJson = json_encode($data); 
  
  // Настройки cURL
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://securepay.tinkoff.ru/v2/Init');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postDataJson);

  // Добавляем заголовки для указания того, что тело запроса содержит JSON
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postDataJson)
  ]);  

  // Выполнение запроса и получение ответа
  $output = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  // Выполнение запроса и получение ответа
  if ($output === false || $httpCode !== 200) {
    json_encode('Не удалось выполнить запрос, HTTP код: ' . $httpCode);
    return false;
  }
  $outputArray = json_decode($output, true); // true означает декодирование в массив

  if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка при декодировании JSON: ' . json_last_error_msg()]);
    return false;
  }

  if (isset($outputArray['Success']) && $outputArray['Success'] === true && isset($outputArray['PaymentId'])) {
    generate_QR($outputArray['PaymentId']);
  } else {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Платёж не нинциализирован, попробуйте позже, пожалуйста.']);
    return false;
  } 
} else {
  echo json_encode('Не тест');
}

// ГЕНЕРАЦИЯ QR
function generate_QR($paymentId) {
  if(!isset($paymentId)) {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Ошибка генерации QR, попробуйте позже, пожалуйста.']);
    return false;
  }

  // Формируем данные для генерации QR
  $dataQR = [
    "TerminalKey" => '1742973723732',
    "Password"    => 'P*IdENENC1sg5a$q',
    "PaymentId" => $paymentId,
    "DataType" => "IMAGE"
  ];

  ksort($dataQR);

  // Получаем все значения из массива
  $values = array_values($dataQR);

  // Конкатенируем все значения в одну строку
  $concatenatedString = implode('', $values);

  // Хэшируем
  $hashedString = hash('sha256', $concatenatedString);

  $dataQR['Token'] = $hashedString;  
  unset($dataQR['Password']);

  $postDataQRJson = json_encode($dataQR);

  // Настройки cURL
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://securepay.tinkoff.ru/v2/GetQr');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postDataQRJson);

  // Добавляем заголовки для указания того, что тело запроса содержит JSON
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postDataQRJson)
  ]);  

  // Выполнение запроса и получение ответа
  $output = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  // // Выполнение запроса и получение ответа
  if ($output === false || $httpCode !== 200) {
    json_encode('Не удалось выполнить запрос, HTTP код: ' . $httpCode);
    return false;
  }

  $outputArray = json_decode($output, true); // true означает декодирование в массив

  if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка при декодировании JSON: ' . json_last_error_msg()]);
    return false;
  }  

  if (isset($outputArray['Success'])) {
    echo json_encode(['status' => 'success', 'data' => $outputArray['Data']]);
  } else {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Платёж не нинциализирован, попробуйте позже, пожалуйста.']);
    return false;
  }
}