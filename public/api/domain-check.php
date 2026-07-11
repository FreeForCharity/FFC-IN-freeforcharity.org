<?php
/**
 * Free For Charity — domain availability + near-peer check (RDAP).
 * Runs as PHP on the cPanel/Apache server (same box as /hub), deployed via public/.
 * GET /api/domain-check.php?q=<label>   e.g. ?q=hopepantry
 * Returns JSON: { name, org, com, net, orgAvailable, nearPeer, warnings }.
 *
 * RDAP (Registration Data Access Protocol) is the structured successor to WHOIS.
 * Per query:  HTTP 404 = not registered = AVAILABLE ;  HTTP 200 = registered = TAKEN.
 * .org -> PIR registry ; .com/.net -> Verisign registry. Vendor-neutral (no eNom).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600'); // matches the 1h server-side cache below

$q = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';
$q = preg_replace('~^https?://~', '', $q);          // strip a pasted protocol
$q = preg_replace('~^www\.~', '', $q);              // strip a www. subdomain
$q = preg_replace('~[/?#].*$~', '', $q);            // strip a path, query string, or fragment
$q = preg_replace('/\.(org|com|net)$/', '', $q);    // tolerate a typed TLD
$q = preg_replace('/[^a-z0-9-]/', '', $q);          // DNS label chars only
if ($q === '' || strlen($q) > 63 || $q[0] === '-' || substr($q, -1) === '-') {
    http_response_code(400);
    echo json_encode(['error' => 'invalid', 'message' => 'Use letters, numbers, and hyphens (no spaces).']);
    exit;
}

// Server-side cache: one entry per label, 1h. Limits outbound RDAP and abuse
// (each request otherwise makes 3 registry calls); Cloudflare also caches via
// the Cache-Control header above.
$cacheFile = sys_get_temp_dir() . '/ffc-domcheck-' . md5($q) . '.json';
if (is_readable($cacheFile) && (time() - filemtime($cacheFile)) < 3600) {
    echo file_get_contents($cacheFile);
    exit;
}

$rdap = [
    'org' => 'https://rdap.publicinterestregistry.org/rdap/domain/',
    'com' => 'https://rdap.verisign.com/com/v1/domain/',
    'net' => 'https://rdap.verisign.com/net/v1/domain/',
];

/** returns 'available' (404), 'registered' (200), or 'unknown' (other/error) */
function rdap_status(string $base, string $fqdn): string {
    $ch = curl_init($base . $fqdn);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'FreeForCharity-DomainCheck/1.0 (+https://freeforcharity.org)',
        CURLOPT_HTTPHEADER     => ['Accept: application/rdap+json'],
    ]);
    curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code === 200) return 'registered';
    if ($code === 404) return 'available';
    return 'unknown';
}

$org = rdap_status($rdap['org'], "$q.org");
$com = rdap_status($rdap['com'], "$q.com");
$net = rdap_status($rdap['net'], "$q.net");

$warnings = [];
if ($com === 'registered') $warnings[] = "Someone already owns {$q}.com — donors could land there by mistake. A more distinctive name is safer.";
if ($net === 'registered') $warnings[] = "{$q}.net is taken — another near-match that can cause brand confusion.";

$out = json_encode([
    'name'         => $q,
    'org'          => $org,
    'com'          => $com,
    'net'          => $net,
    'orgAvailable' => ($org === 'available'),
    'nearPeer'     => ($com === 'registered' || $net === 'registered'),
    'warnings'     => $warnings,
], JSON_UNESCAPED_SLASHES);

@file_put_contents($cacheFile, $out);
echo $out;
