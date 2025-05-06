<?php

// PHP Sign-in sample using Implicit flow

function httpPost($url, $data){
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function base64_url_decode($arg) {
    $res = $arg;
    $res = str_replace('-', '+', $res);
    $res = str_replace('_', '/', $res);
    switch (strlen($res) % 4) {
        case 0:
            break;
        case 2:
            $res .= "==";
            break;
        case 3:
            $res .= "=";
            break;
        default:
            break;
    }
    $res = base64_decode($res);
    return $res;
}


if(isset($_REQUEST['code'])){

    $code = $_REQUEST['code'];

    $requestData  = [
        'client_id' => getenv('MAC_AZURE_CLIENT_ID'),
        'code' => $code,
        'grant_type' => 'authorization_code',
        'scope' => 'User.Read',
        'client_secret' => getenv('MAC_AZURE_CLIENT_SECRET'),
    ];

    $response = httpPost("https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token", $requestData);

//echo($response);

    $dataObj = json_decode($response);

    $access_token = $dataObj->access_token;

//echo "access_token: ".$access_token."<br><br>";

    $token_parts = explode(".", $access_token);

    $decoded_token = base64_decode($token_parts[1]);

//echo ($decoded_token);

    $tokenObject = json_decode($decoded_token);

//echo json_encode($tokenObject, JSON_PRETTY_PRINT);

//echo "<br><br>";

//echo "family_name: ".$tokenObject->family_name."<br>";
//echo "given_name: ".$tokenObject->given_name."<br>";
//echo "name: ".$tokenObject->name."<br>";
//echo "unique_name: ".$tokenObject->unique_name."<br>";

    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => 'https://graph.microsoft.com/v1.0/me?$select=displayName,givenName,surname,mail,userPrincipalName,employeeid',
        CURLOPT_HEADER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => null,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_HTTPHEADER => array(
            'authorization: Bearer '.$access_token
        ) ,
    ));
    $response = curl_exec($ch);

// Close the cURL resource, and free system resources

    curl_close($ch);

//var_dump($response);

    $meObject = json_decode($response);

    echo "<br><br>employeeId: ".$meObject->employeeId;


} else {

    echo "<br>";
    $auth_url = "https://login.microsoftonline.com/" . getenv('MAC_AZURE_TENANT_ID') . "/oauth2/v2.0/authorize?client_id=" . getenv('MAC_AZURE_CLIENT_ID') . "&response_type=code&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2FUser.Read";
    echo "<a type='button' href='" . $auth_url . "'>MACID Login</a>";



}
?>
