/**
 * Verifica che un URL risponda (GET, segue redirect). Nessuna API esterna a pagamento.
 */

const https = require('https');
const http = require('http');

function verifyUrlResponds(urlString, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects < 0) return resolve(false);
    let u;
    try {
      u = new URL(urlString);
    } catch {
      return resolve(false);
    }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return resolve(false);

    const lib = u.protocol === 'https:' ? https : http;
    const opts = {
      hostname: u.hostname,
      port: u.port || (u.protocol === 'https:' ? 443 : 80),
      path: u.pathname + u.search,
      method: 'GET',
      timeout: 15000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; RaaS-Bandi-LinkCheck/1.0; +https://www.raasautomazioni.it) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8'
      }
    };

    const req = lib.request(opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let next;
        try {
          next = new URL(res.headers.location, urlString).href;
        } catch {
          res.resume();
          return resolve(false);
        }
        res.resume();
        return resolve(verifyUrlResponds(next, maxRedirects - 1));
      }
      const ok = res.statusCode >= 200 && res.statusCode < 400;
      res.resume();
      resolve(ok);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

module.exports = { verifyUrlResponds };
