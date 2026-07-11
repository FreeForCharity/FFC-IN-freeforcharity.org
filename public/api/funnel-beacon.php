<?php
/**
 * Free For Charity — consent-free intake-funnel counter (epic #676, issue #684).
 * Runs as PHP on the cPanel/Apache server (same box as /hub), deployed via public/.
 *
 * The WHMCS hub's six_ffc theme fires navigator.sendBeacon() here from cart pages:
 *   GET /api/funnel-beacon.php?s=view&p=<pid>   — an order form was opened
 *   GET /api/funnel-beacon.php?s=complete       — an order was completed
 *
 * Privacy: stores ONLY daily counters (date → pid → step → count). No cookies,
 * no IP, no user agent, no identifiers — so no consent banner is required.
 * Counts live outside the web root; completions can be cross-checked against
 * WHMCS order reports (the authoritative submission count).
 */

header('Cache-Control: no-store');

$step = isset($_GET['s']) ? $_GET['s'] : '';
$pid = isset($_GET['p']) ? $_GET['p'] : 'all';

if (!in_array($step, ['view', 'complete'], true) || !preg_match('/^(all|[0-9]{1,4})$/', $pid)) {
    http_response_code(204); // never make the storefront care about beacon errors
    exit;
}

// Outside the web root: sibling of public_html, invisible to HTTP.
$file = dirname($_SERVER['DOCUMENT_ROOT']) . '/ffc_funnel_counts.json';
$date = gmdate('Y-m-d');

$fh = fopen($file, 'c+');
if ($fh !== false && flock($fh, LOCK_EX)) {
    $raw = stream_get_contents($fh);
    $data = json_decode($raw ?: '{}', true);
    if (!is_array($data)) {
        $data = [];
    }
    $data[$date][$pid][$step] = ($data[$date][$pid][$step] ?? 0) + 1;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($data));
    fflush($fh);
    flock($fh, LOCK_UN);
}
if ($fh !== false) {
    fclose($fh);
}

http_response_code(204);
