<?php
/**
 * Orbiphera Technologies - High Availability Inquiries API Endpoint
 * Runs natively on Hostinger Apache / PHP Web Hosting
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$storageFile = __DIR__ . '/inquiries_store.json';

// Initialize storage file if not exists
if (!file_exists($storageFile)) {
    $initialData = [
        [
            "_id" => "inq_initial_1",
            "firstName" => "Rajesh",
            "lastName" => "Kumar",
            "email" => "rajesh.kumar@techcorp.in",
            "phone" => "+91 99887 76655",
            "companyName" => "TechCorp Solutions",
            "serviceType" => "Hospital management",
            "projectType" => "Hospital management",
            "budget" => "₹50,000 - ₹1,50,000",
            "projectDescription" => "We require a customized OPD and billing portal for our 50-bed healthcare clinic.",
            "status" => "Proposal Sent",
            "adminNotes" => "Spoke with client on phone. Sent initial feature checklist.",
            "quotedAmount" => 85000,
            "createdAt" => "2026-11-20T10:00:00Z"
        ]
    ];
    file_put_contents($storageFile, json_encode($initialData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function loadInquiries($file) {
    if (!file_exists($file)) return [];
    $raw = file_get_contents($file);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function saveInquiries($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: List inquiries for Admin Panel
if ($method === 'GET') {
    $inquiries = loadInquiries($storageFile);
    $status = isset($_GET['status']) ? trim($_GET['status']) : 'all';
    $search = isset($_GET['search']) ? strtolower(trim($_GET['search'])) : '';

    if ($status !== 'all' && !empty($status)) {
        $inquiries = array_values(array_filter($inquiries, function($i) use ($status) {
            return isset($i['status']) && strtolower($i['status']) === strtolower($status);
        }));
    }

    if (!empty($search)) {
        $inquiries = array_values(array_filter($inquiries, function($i) use ($search) {
            $haystack = strtolower(($i['firstName'] ?? '') . ' ' . ($i['lastName'] ?? '') . ' ' . ($i['email'] ?? '') . ' ' . ($i['phone'] ?? '') . ' ' . ($i['companyName'] ?? '') . ' ' . ($i['serviceType'] ?? ''));
            return strpos($haystack, $search) !== false;
        }));
    }

    echo json_encode([
        'success' => true,
        'inquiries' => $inquiries,
        'total' => count($inquiries)
    ]);
    exit;
}

// Handle POST: Create new Inquiry
if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $body = json_decode($input, true);
    if (!is_array($body)) {
        $body = $_POST;
    }

    $name = trim($body['name'] ?? '');
    $firstName = trim($body['firstName'] ?? '');
    $lastName = trim($body['lastName'] ?? '');
    if (empty($firstName) && !empty($name)) {
        $parts = preg_split('/\s+/', $name);
        $firstName = $parts[0] ?? 'Client';
        $lastName = implode(' ', array_slice($parts, 1));
    }
    if (empty($firstName)) $firstName = 'Client';

    $email = strtolower(trim($body['email'] ?? 'contact@orbiphera.in'));
    $phone = trim($body['phone'] ?? '+91 00000 00000');
    $serviceType = trim($body['serviceType'] ?? ($body['projectType'] ?? 'Website Development'));
    $companyName = trim($body['companyName'] ?? ($body['company'] ?? ''));
    $budget = trim($body['budget'] ?? ($body['budgetRange'] ?? 'Flexible'));
    $projectDescription = trim($body['projectDescription'] ?? ($body['message'] ?? 'Project Scope Inquiry'));

    $newInquiry = [
        '_id' => 'inq_' . round(microtime(true) * 1000),
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'companyName' => $companyName,
        'serviceType' => $serviceType,
        'projectType' => $serviceType,
        'budget' => $budget,
        'budgetRange' => $budget,
        'projectDescription' => $projectDescription,
        'status' => 'New',
        'createdAt' => date('c')
    ];

    $inquiries = loadInquiries($storageFile);
    array_unshift($inquiries, $newInquiry);
    saveInquiries($storageFile, $inquiries);

    // Send email alert to admin
    @mail(
        'contact@orbiphera.in',
        "New Project Inquiry from {$firstName} {$lastName} - {$serviceType}",
        "Name: {$firstName} {$lastName}\nEmail: {$email}\nPhone: {$phone}\nCompany: {$companyName}\nService: {$serviceType}\nBudget: {$budget}\n\nProject Scope:\n{$projectDescription}",
        "From: noreply@orbiphera.in\r\nReply-To: {$email}\r\nContent-Type: text/plain; charset=UTF-8"
    );

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry submitted successfully. Our engineering architects will contact you within 24 hours.',
        'inquiry' => $newInquiry
    ]);
    exit;
}

// Handle PATCH / DELETE for Admin Status & Notes
if ($method === 'PATCH' || $method === 'DELETE') {
    $inquiries = loadInquiries($storageFile);
    $pathParts = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $id = end($pathParts);

    if ($method === 'DELETE') {
        $filtered = array_values(array_filter($inquiries, function($i) use ($id) {
            return ($i['_id'] ?? '') !== $id;
        }));
        saveInquiries($storageFile, $filtered);
        echo json_encode(['success' => true, 'message' => 'Inquiry deleted']);
        exit;
    }

    if ($method === 'PATCH') {
        $input = file_get_contents('php://input');
        $body = json_decode($input, true) ?: [];
        foreach ($inquiries as &$inq) {
            if (($inq['_id'] ?? '') === $id) {
                if (isset($body['status'])) $inq['status'] = $body['status'];
                if (isset($body['adminNotes'])) $inq['adminNotes'] = $body['adminNotes'];
                if (isset($body['quotedAmount'])) $inq['quotedAmount'] = $body['quotedAmount'];
                break;
            }
        }
        saveInquiries($storageFile, $inquiries);
        echo json_encode(['success' => true, 'message' => 'Inquiry updated']);
        exit;
    }
}

echo json_encode(['success' => true]);
