<?php
/**
 * Orbiphera Technologies - Native Content & Products Showcase API Endpoint
 * Runs on Hostinger Apache / PHP Web Hosting
 * Handles GET, POST, and PUT requests to save and retrieve homepage content & products
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$storageFile = __DIR__ . '/content_store.json';

// Initialize storage file if not exists
if (!file_exists($storageFile)) {
    $initialData = [
        "products_showcase" => [
            "sectionKey" => "products_showcase",
            "title" => "Our Products & Digital Solutions.",
            "subtitle" => "Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.",
            "isActive" => true,
            "data" => [
                "badgeText" => "TURNKEY SOFTWARE SUITES",
                "exploreButtonText" => "Explore All Software",
                "exploreButtonLink" => "/software",
                "products" => [
                    [
                        "id" => "college-management",
                        "title" => "College Management System (CMS)",
                        "category" => "EDUCATION ERP",
                        "badge" => "Complete College ERP",
                        "desc" => "A powerful College Management System designed to simplify daily operations, student admissions, attendance, exams, fees, library, and academic records.",
                        "image" => "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=480&fit=crop&q=80",
                        "features" => [
                            "Online Student Portal",
                            "Student Attendance Management",
                            "Faculty & Staff Management",
                            "Class, Course & Department Management",
                            "Fees Collection & Online Payment",
                            "Examination & Result Generation",
                            "Admit Card & Marksheet Generation",
                            "Library Management"
                        ],
                        "detailsLink" => "/templates/eduprime-education-institute",
                        "demoLink" => "/request-demo?product=college",
                        "isActive" => true
                    ],
                    [
                        "id" => "erp-system",
                        "title" => "ERP Management System",
                        "category" => "ENTERPRISE ERP",
                        "badge" => "Multi-Branch & Finance",
                        "desc" => "Centralized enterprise platform streamlining multi-branch inventory, accounts, GST invoicing, supply chain, and staff permissions.",
                        "image" => "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80",
                        "features" => [
                            "Automated GST & Invoicing Engine",
                            "Multi-Warehouse Inventory Tracking",
                            "Real-Time Balance Sheet & P&L Ledgers",
                            "Granular Role-Based Access (RBAC)"
                        ],
                        "detailsLink" => "/software",
                        "demoLink" => "/request-demo?product=erp",
                        "isActive" => true
                    ],
                    [
                        "id" => "ems-workforce",
                        "title" => "Employee Management System (EMS)",
                        "category" => "WORKFORCE & PAYROLL",
                        "badge" => "GPS & Attendance OS",
                        "desc" => "Smart workforce administration featuring GPS geo-fenced mobile attendance, automated monthly payroll calculations, and leave approvals.",
                        "image" => "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=480&fit=crop&q=80",
                        "features" => [
                            "GPS Geo-Fenced Mobile Punch In/Out",
                            "Automated Salary, PF & Tax Computation",
                            "Shift Rosters & Leave Workflows",
                            "Live Field Staff Tracking & Reports"
                        ],
                        "detailsLink" => "/software",
                        "demoLink" => "/request-demo?product=ems",
                        "isActive" => true
                    ],
                    [
                        "id" => "institute-management",
                        "title" => "Institute & School Management Software",
                        "category" => "EDUCATION & ACADEMICS",
                        "badge" => "Campus Operating System",
                        "desc" => "End-to-end campus software managing student admissions, automated fee reconciliation, class schedules, exams, and parent communications.",
                        "image" => "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=480&fit=crop&q=80",
                        "features" => [
                            "Online Admissions & Verification",
                            "Automated Fee Dues & Payment Links",
                            "Exam Result Cards & Grade Ledgers",
                            "Student & Guardian Mobile Apps"
                        ],
                        "detailsLink" => "/templates/eduprime-education-institute",
                        "demoLink" => "/request-demo?product=institute",
                        "isActive" => true
                    ]
                ]
            ]
        ]
    ];
    file_put_contents($storageFile, json_encode($initialData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function loadContentStore($file) {
    if (!file_exists($file)) return [];
    $raw = file_get_contents($file);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function saveContentStore($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// Determine section key from query or URI
$sectionKey = isset($_GET['key']) ? trim($_GET['key']) : '';
if (empty($sectionKey)) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (preg_match('/\/api\/content\/(?:admin\/)?([^\/]+)/', $uri, $matches)) {
        $sectionKey = $matches[1];
    }
}
if (empty($sectionKey)) {
    $sectionKey = 'products_showcase';
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: Retrieve section
if ($method === 'GET') {
    $store = loadContentStore($storageFile);
    if (isset($store[$sectionKey])) {
        echo json_encode(['success' => true, 'section' => $store[$sectionKey]], JSON_UNESCAPED_SLASHES);
    } else {
        echo json_encode([
            'success' => true,
            'section' => [
                'sectionKey' => $sectionKey,
                'title' => '',
                'subtitle' => '',
                'isActive' => true,
                'data' => []
            ]
        ], JSON_UNESCAPED_SLASHES);
    }
    exit;
}

// Handle POST or PUT: Update section
if ($method === 'POST' || $method === 'PUT') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON payload received']);
        exit;
    }

    $store = loadContentStore($storageFile);
    $existing = isset($store[$sectionKey]) ? $store[$sectionKey] : ['sectionKey' => $sectionKey];

    if (isset($payload['title'])) $existing['title'] = $payload['title'];
    if (isset($payload['subtitle'])) $existing['subtitle'] = $payload['subtitle'];
    if (isset($payload['isActive'])) $existing['isActive'] = (bool)$payload['isActive'];
    if (isset($payload['data'])) $existing['data'] = $payload['data'];

    $store[$sectionKey] = $existing;
    saveContentStore($storageFile, $store);

    echo json_encode([
        'success' => true,
        'message' => 'Content section saved successfully',
        'section' => $existing
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed. Use GET, POST or PUT.']);
