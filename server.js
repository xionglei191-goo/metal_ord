import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8081;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  // Decode URL to handle Chinese characters and spaces
  let filePath = path.join(DIST_DIR, decodeURIComponent(req.url.split('?')[0]));
  
  // SPA routing: if requesting a route that doesn't look like a file, fallback to index.html
  const ext = path.extname(filePath);
  
  const serveFile = (file) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Internal Server Error');
      } else {
        const mime = MIME_TYPES[path.extname(file)] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(content);
      }
    });
  };

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(filePath);
    } else if (!err && stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      fs.stat(indexFile, (errIdx, statsIdx) => {
        if (!errIdx && statsIdx.isFile()) {
          serveFile(indexFile);
        } else {
          // Fallback to main index.html for SPA
          serveFile(path.join(DIST_DIR, 'index.html'));
        }
      });
    } else {
      // For SPA, fallback to index.html if the requested path is not found
      // unless it looks like a static asset file that is missing.
      if (!ext || ext === '.html') {
        serveFile(path.join(DIST_DIR, 'index.html'));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      }
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
