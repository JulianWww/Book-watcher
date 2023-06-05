<?php
  include "vendor/autoload.php";
  
  $base_url = "https://wandhoven.ddns.net/book-watcher";

  signup($_REQUEST, "./data", $base_url, "Next Chaper Avilable Notifier", "denanu.pandovah@gmail.com", file_get_contents("./data/mail_api_key.txt"), "Denanu-login", $base_url, $base_url);
?>