<?php
require_once 'headers.php';


// on creer la clé paire
$res = openssl_pkey_new();

// Recup clé public
$details = openssl_pkey_get_details($res);


// Clé privé
openssl_pkey_export($res, $privateKey);


$Key =  $details['key'] . $privateKey;
echo $Key;