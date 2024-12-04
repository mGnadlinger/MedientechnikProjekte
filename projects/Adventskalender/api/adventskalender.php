<?php

require('../components/debugging.php');

// Standardantwort
$answer = array(
    "code" => 404,
    "error" => "undefined error",
    "doorContent" => []
);
$data = file_get_contents("../data/doors.json");
$christmasCalender = json_decode($data);

if (!isset($_GET["day"])) {
    $answer["error"] = "Specify an id. (Used as day in December)";
} else if (isset($_GET["day"]) && filter_var($_GET["day"], FILTER_VALIDATE_INT) !== false
    && $_GET["day"] > 0 && $_GET["day"] < 25) {
    $dayId = $_GET["day"];

// Aktuelles Datum als DateTime-Objekt
    $today = new DateTime();

// Ziel-Datum (1. Dezember 2024) als DateTime-Objekt
    $targetDate = new DateTime('2024-11-' . $dayId);

// Überprüfen, ob das aktuelle Datum mindestens der 1. Dezember 2024 ist
    if ($today >= $targetDate) {

        if ($dayId <= count($christmasCalender)) {
            $answer["code"] = 200;
            $answer["doorContent"][] = $christmasCalender[$dayId - 1];
            $answer["error"] = "no error";
        }
    } else {
        $answer["error"] = "Make another try tomorrow ;-)!";
    }

}
// JSON senden
header("Content-type:application/json");
echo json_encode($answer);
?>

