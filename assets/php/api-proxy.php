<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://{{environment}}.qwil.io/entity-service/sys-api/entity-memberships/create/v2',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "created_by_entity_user_xref_uuid": "uuid", 
  "enum_profile_id": "integer", 
  "first_name": "string(min=1, max=500)", 
  "group_uuids": "list_uuids (optional)", 
  "identifier": "string", 
  "job_title": "string(min=0, max=500)", 
  "last_name": "string(min=0, max=500)", 
  "primary_email": "string(min=1, max=320)", 
  "primary_phone_number": "string(min=1, max=500)", 
  "send_invitation": "boolean() (optional)",
  "invitation_message:" : "string(min=0, max=5000",
  "new_group_name" : "string(min=0, max=500",
  "created_by_entity_user_xref_uuid": "uuid",
  "new_group_entity_user_xref_uuids" : "list_uuids"
}',
CURLOPT_HTTPHEADER => array(
    'X-SYS-API-KEY-SECRET: ' . getenv('X_SYS_API_KEY_SECRET'),
    'X-SYS-API-KEY: ' . getenv('X_SYS_API_KEY'),
    'Content-Type: application/json'
),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

?>