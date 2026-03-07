const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'visualizemydata.in';
const API_KEY = '18b26e03c15d48bd860579e0ba14199c';
const KEY_LOCATION = `https://${SITE_URL}/${API_KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

async function pingIndexNow() {
    console.log('[IndexNow] Starting automated SEO ping...');

    // We attempt to read the sitemap. Next.js 14+ static sitemaps generated via app/sitemap.ts
    // might be built into `.next/server/app/sitemap.xml.body` or similar.
    // However, since it is a dynamic route we should fetch it or read it if exported.
    // Actually, `npm run build` with `force-static` will generate the sitemap during export if we have static outputs.
    // If it's a standard SSR next.js site, the sitemap is available via HTTP request instead.

    // Wait for the dev server or prod server to be up, but this runs POST build.
    // Let's fetch the sitemap locally if it was exported, or hit the live URL.
    // To be safe and since it runs POST build, let's fetch the local build output.
    const builtSitemapPath = path.join(__dirname, '..', '.next', 'server', 'app', 'sitemap.xml.body');

    let xmlContent = '';
    if (fs.existsSync(builtSitemapPath)) {
        xmlContent = fs.readFileSync(builtSitemapPath, 'utf-8');
    } else {
        console.log('[IndexNow] Could not find static sitemap body. If this is a dynamic deployment, falling back to basic critical paths.');
        // We can just fallback to pinging the homepage to let Bing discover the sitemap index
        xmlContent = `
            <loc>https://${SITE_URL}/</loc>
            <loc>https://${SITE_URL}/gallery</loc>
        `;
    }

    // Extract all <loc> URLs
    const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const urlList = urlMatches.map(tag => tag.replace(/<\/?loc>/g, '').trim());

    if (urlList.length === 0) {
        console.warn('[IndexNow] No URLs found to ping.');
        return;
    }

    // Limit to 10k URLs per IndexNow specs
    const batch = urlList.slice(0, 10000);

    const payload = JSON.stringify({
        host: SITE_URL,
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch
    });

    const options = {
        hostname: 'api.indexnow.org',
        path: '/IndexNow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    console.log(`[IndexNow] Pinging ${batch.length} URLs to Bing/Yandex/Seznam...`);

    const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 202) {
                console.log('[IndexNow] Successfully submitted URLs to IndexNow!');
            } else {
                console.error(`[IndexNow] Failed. HTTP Status: ${res.statusCode}`);
                console.error(`[IndexNow] Response: ${responseData}`);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`[IndexNow] Error pinging IndexNow: ${e.message}`);
    });

    req.write(payload);
    req.end();
}

pingIndexNow();
