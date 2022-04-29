<?php
require_once 'headers.php';
require_once 'Classes/CookieHelper.php';





// on creer la clé paire
$res = openssl_pkey_new();

// Recup clé public
$details = openssl_pkey_get_details($res);


// Clé privé
openssl_pkey_export($res, $privateKey);


$Key =  $details['key'] . $privateKey;




// Header du JWT
$header = [
    'typ' => 'JWT',
    'alg' => 'HS256'
];

// Payload JWT
$payload = [
    "sub" => "1234567890",
    "username" => "John Doe",
    "iat" => 1516239022,
    "roles" => [
        "ROLE_ADMIN",
        "ROLE_USER"
    ],
    "exp" => 123
];

// On encode en base64
$base64Header = base64_encode(json_encode($header));
$base64Payload = base64_encode(json_encode($payload));
// On clean
$base64Header = str_replace(['+','/','='], ['-','_',''], $base64Header);
$base64Payload = str_replace(['+','/','='], ['-','_',''], $base64Payload);

// var_dump($base64Header);
// var_dump($base64Payload);

// On génère la signature
$base64Secret = base64_encode($Key);
$Secret = str_replace(['+','/','='], ['-','_',''], $base64Secret);
$signature = hash_hmac('sha256',$base64Header . '.' . $base64Payload, $Secret, true);
$base64Signature = base64_encode(json_encode($signature));
echo $base64Signature;
$signature = str_replace(['+','/','='], ['-','_',''], $base64Signature);

echo $signature;