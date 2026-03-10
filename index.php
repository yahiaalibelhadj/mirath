<?php
$url = "https://www.cwoste-sba.dz/mirath/";

// Récupérer le contenu du site distant
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$content = curl_exec($ch);
curl_close($ch);

// Remplacer les liens absolus pour qu'ils passent par le proxy
$content = str_replace('https://www.cwoste-sba.dz/', '', $content);

// Envoyer le contenu modifié
echo $content;
?>
