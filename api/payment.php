<?php

if($_REQUEST['package'] && $_REQUEST['price']) {   

  // Вводим временно статичные данные у существующих тарифах
  $validSMMtrfs = ['Базовый пакет', 'Средний пакет', 'Полный пакет'];
  $validSMMtrfsPrices = ['Базовый пакет' => 25000, 'Средний пакет' => 50000, 'Полный пакет' => 10];
  
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

  // Определяем устройство с которого пришел запрос
  $mobileDevice = $_REQUEST['mobileDevice'];

  // Формируем номер заказа пока из текущей даты
  $orderId = time();

  $receipt = [
    "Phone" => $phone,
    "Email" => $email,
    "Taxation" => 'usn_income_outcome',
    "Items" => [
      [
        "Name"      => 'Заказ с сайта CodeSeven, на услугу SMM, тариф: '.$trf,
        "Price"     => $price*100,
        "Quantity"  => 1.00,
        "Amount"    => $price*100,
        "Tax" => 'none'
      ]
    ]
  ];

  // Массив с данными для инициализации платежа
  $data = [
    "Amount"      => $price*100,
    "Description" => 'Заказ с сайта CodeSeven, на услугу SMM, тариф: '.$trf,
    "OrderId"     => $orderId,
    "TerminalKey" => '1742973723732',
    "Password"    => 'P*IdENENC1sg5a$q',
    "DATA" => [
      "Phone" => $phone,
      "Email" => $email
    ]
  ];  

  $token = generate_token($data);

  $data['Token'] = $token;
  unset($data['Password']);
  $data['Receipt'] = $receipt;
  
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
    generate_QR($outputArray['PaymentId'], $orderId, $mobileDevice);
  } else {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Платёж не инициализирован, попробуйте позже, пожалуйста.']);
    return false;
  } 
} elseif ($_GET['paymentId']) {

  $dataStatus = [
    "TerminalKey" => '1742973723732',
    "Password"    => 'P*IdENENC1sg5a$q',
    "PaymentId" => $_GET['paymentId']
  ];

  $token = generate_token($dataStatus);

  $dataStatus['Token'] = $token;  
  unset($dataStatus['Password']);

  $postDataStatusJson = json_encode($dataStatus);

  // Настройки cURL
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://securepay.tinkoff.ru/v2/GetState');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postDataStatusJson);

  // Добавляем заголовки для указания того, что тело запроса содержит JSON
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postDataStatusJson)
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
    echo json_encode(['status' => 'success', 'data' => $outputArray]);
  } else {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Платёж не нинциализирован, попробуйте позже, пожалуйста.']);
    return false;
  }

} else {  
  echo json_encode();
}

// ГЕНЕРАЦИЯ QR
function generate_QR($paymentId, $orderId, $mobileDevice) {
  if(!isset($paymentId)) {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Ошибка генерации QR, попробуйте позже, пожалуйста.']);
    return false;
  } 

  // Формируем DataType из устройства 
  if($mobileDevice == 'true') {
    $dataType = 'PAYLOAD';
  } else {
    $dataType = 'IMAGE';
  }

  // Формируем данные для генерации QR
  $dataQR = [
    "TerminalKey" => '1742973723732',
    "Password"    => 'P*IdENENC1sg5a$q',
    "PaymentId" => $paymentId,
    "DataType" => $dataType
  ];

  $token = generate_token($dataQR);

  $dataQR['Token'] = $token;  
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
    echo json_encode(['status' => 'success', 'data' => $outputArray['Data'], 'paymentId' => $paymentId, 'orderId' => $orderId, 'mobileDevice' => $mobileDevice]);
  } else {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Платёж не нинциализирован, попробуйте позже, пожалуйста.']);
    return false;
  }
}

// ГЕНЕРАЦИЯ ТОКЕНА
function generate_token($fields_data) {
  if(!isset($fields_data) || count($fields_data) < 1 ) {
    echo json_encode(['status' => 'error', 'msg' => 'Ошибка! Ошибка генерации QR, попробуйте позже, пожалуйста.']);

    return false;
  }

  ksort($fields_data);
  
  // Получаем все значения из массива
  $values = array_values($fields_data);

  // Конкатенируем все значения в одну строку
  $concatenatedString = implode('', $values);

  // Хэшируем
  $hashedString = hash('sha256', $concatenatedString);

  return $hashedString;
}
