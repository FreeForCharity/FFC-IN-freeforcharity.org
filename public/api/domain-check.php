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

$q = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';
$q = preg_replace('~^https?://~', '', $q);          // strip a pasted protocol
$q = preg_replace('~^www\.~', '', $q);              // strip a www. subdomain
$q = preg_replace('~[/?#].*$~', '', $q);            // strip a path, query string, or fragment
if (preg_match('/([a-z0-9-]+)\.(?:org|com|net)$/', $q, $m)) {
    $q = $m[1];                                     // second-level label (drops any subdomain)
}
$q = preg_replace('/[^a-z0-9-]/', '', $q);          // DNS label chars only
if ($q === '' || strlen($q) > 63 || $q[0] === '-' || substr($q, -1) === '-') {
    http_response_code(400);
    header('Cache-Control: no-store'); // don't let caches keep an invalid-input error
    echo json_encode(['error' => 'invalid', 'message' => 'Enter 1–63 letters, numbers, or hyphens — not starting or ending with a hyphen.']);
    exit;
}

// Caching is handled at the edge: a definitive result sends Cache-Control below,
// so Cloudflare serves repeat queries without hitting this origin (or its 3 RDAP
// calls). No server-side file cache — nothing to prune, lock, or leak on shared hosting.
$rdap = [
    'org' => 'https://rdap.publicinterestregistry.org/rdap/domain/',
    'com' => 'https://rdap.verisign.com/com/v1/domain/',
    'net' => 'https://rdap.verisign.com/net/v1/domain/',
];

/** returns 'available' (404), 'registered' (200), or 'unknown' (other/error) */
function rdap_status(string $base, string $fqdn): string {
    $ch = curl_init($base . $fqdn);
    curl_setopt_array($ch, [
        CURLOPT_TIMEOUT         => 8,
        CURLOPT_FOLLOWLOCATION  => true,
        CURLOPT_PROTOCOLS       => CURLPROTO_HTTPS, // only fetch https
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS, // and only follow https redirects (SSRF guard)
        CURLOPT_USERAGENT       => 'FreeForCharity-DomainCheck/1.0 (+https://freeforcharity.org)',
        CURLOPT_HTTPHEADER      => ['Accept: application/rdap+json'],
        // We only need the status code — discard the body instead of buffering it.
        CURLOPT_WRITEFUNCTION   => function ($ch, $data) {
            return strlen($data);
        },
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

if ($org !== 'unknown' && $com !== 'unknown' && $net !== 'unknown') {
    header('Cache-Control: public, max-age=3600'); // edge-cacheable (Cloudflare)
} else {
    header('Cache-Control: no-store'); // transient RDAP failure — don't pin it
}
echo $out;
