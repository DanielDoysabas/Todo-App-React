<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DBConnect.php';
$objDb = new DBConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "GET":
        $sql = "SELECT * FROM tasks";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
        break;
        
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO tasks(id, task, date) VALUES(null, :task, :date)";
        $stmt = $conn->prepare($sql);
        // $created_at = date('Y-m-d');
        $stmt->bindParam(':task', $user->task);
        $stmt->bindParam(':date', $user->date);
        // $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM tasks WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}