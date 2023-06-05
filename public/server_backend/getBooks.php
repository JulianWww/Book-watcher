<?php
  include_once "vendor/autoload.php";

  $username = "";

  if (checkCredentials($_REQUEST)) {
    $username = $_REQUEST["username"];
  }

  $files = glob("./data/books/*.json");

  $out = [];

  foreach ($files as &$file) {
    $data = json_decode(file_get_contents($file), true);

    if (in_array($username, $data["watchers"])) {
      $data["watching"] = true;
    }
    else {
      $data["watching"] = false;
    }

    unset($data["watchers"]);
    unset($data["updater"]);
    array_push($out, $data);
  }

  print(json_encode($out));

?>