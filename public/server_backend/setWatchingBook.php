<?php
  include_once "vendor/autoload.php";

  function processFile($file, $user, $add) {
    if (!is_file($file)) {
      http_response_code(404);
      print("{\"status\": \"fail\", \"reason\": \"Unknown Book\"}");
      die();
    }
    $data = json_decode(file_get_contents($file), true);

    if ($add) {
      if (!in_array($user, $data["watchers"]))
        array_push($data["watchers"], $user);
      
    }
    else {
      if (($key = array_search($user, $data["watchers"])) !== false) {
        unset($data["watchers"][$key]);
      }
    }

    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
  }

  if (checkCredentials($_REQUEST)) {
    $user = $_REQUEST["username"];
    $add = toBoolean($_REQUEST["value"]);

    if (isset($_REQUEST["book"])) {
      $file = "./data/books/" . $_REQUEST["book"] . ".json";
      processFile($file, $user, $add);
    }
    else {
      $files = glob("./data/books/*.json");
      foreach ($files as &$file) {
        processFile($file, $user, $add);
      }
    }


    print("{\"status\": \"success\"}");
    die();
  }
  http_response_code(403);
  print("{\"status\": \"fail\", \"reason\": \"Auth Failed\"}");
?>