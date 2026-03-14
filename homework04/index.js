import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain'
};

const server = http.createServer(async (req, res) => {
    let filePath;

    if (req.url === '/') {
        filePath = path.join(import.meta.dirname, 'index.html');
    } else {
        filePath = path.join(import.meta.dirname, 'public', req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname];

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');

    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                const content404 = await fs.readFile(path.join(import.meta.dirname, '404.html'));
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content404, 'utf-8');
            } catch (err404) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            }
        } else {
            res.writeHead(500);
            res.end(`Server Error: ${error.code}`);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Root directory: ${import.meta.dirname}`);
});