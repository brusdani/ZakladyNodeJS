import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const PORT = 3000;
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
    const relativePath = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(PUBLIC_DIR, relativePath);

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname];

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);

    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                const content404 = await fs.readFile(path.join(PUBLIC_DIR, '404.html'));
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content404);
            } catch (err404) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not found (404.html missing)');
            }
        } else {
            console.error(error);
            res.writeHead(500);
            res.end(`Server error: ${error.code}`);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});