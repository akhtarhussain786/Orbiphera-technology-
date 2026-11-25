<?php
/**
 * Orbiphera Technologies - Native Media Upload API Endpoint
 * Runs on Hostinger Apache / PHP Web Hosting
 * Handles multipart file uploads and base64 images into /uploads/
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadsDir = dirname(__DIR__) . '/uploads';
if (!is_dir($uploadsDir)) {
    @mkdir($uploadsDir, 0755, true);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // 1. Check for standard multipart file upload
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $originalName = $file['name'];
        $tmpPath = $file['tmp_name'];
        $fileSize = $file['size'];

        // Max 10MB
        if ($fileSize > 10 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Image size exceeds maximum limit of 10MB']);
            exit;
        }

        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
        if (!in_array($ext, $allowed)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid file format. Allowed: JPG, PNG, WEBP, GIF, SVG']);
            exit;
        }

        $cleanBaseName = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
        $uniqueFilename = 'prod_' . time() . '_' . substr(md5(uniqid()), 0, 8) . '.' . $ext;
        $destination = $uploadsDir . '/' . $uniqueFilename;

        if (move_uploaded_file($tmpPath, $destination)) {
            echo json_encode([
                'success' => true,
                'media' => [
                    'url' => '/uploads/' . $uniqueFilename,
                    'filename' => $uniqueFilename,
                    'originalName' => $originalName,
                    'size' => $fileSize
                ]
            ], JSON_UNESCAPED_SLASHES);
            exit;
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to write uploaded image to disk']);
            exit;
        }
    }

    // 2. Check for JSON body with base64 encoded image
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $data = json_decode($rawInput, true);
        if (is_array($data) && !empty($data['base64'])) {
            $base64Data = $data['base64'];
            if (preg_match('/^data:image\/(\w+);base64,/', $base64Data, $type)) {
                $base64Data = substr($base64Data, strpos($base64Data, ',') + 1);
                $ext = strtolower($type[1]);
                if ($ext === 'jpeg') $ext = 'jpg';
                $decoded = base64_decode($base64Data);

                if ($decoded !== false) {
                    $uniqueFilename = 'prod_' . time() . '_' . substr(md5(uniqid()), 0, 8) . '.' . $ext;
                    $destination = $uploadsDir . '/' . $uniqueFilename;
                    if (file_put_contents($destination, $decoded)) {
                        echo json_encode([
                            'success' => true,
                            'media' => [
                                'url' => '/uploads/' . $uniqueFilename,
                                'filename' => $uniqueFilename
                            ]
                        ], JSON_UNESCAPED_SLASHES);
                        exit;
                    }
                }
            }
        }
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No image file was received for upload']);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed. Use POST to upload images.']);
