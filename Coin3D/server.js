const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000; // можете сменить на любой другой порт

const server = http.createServer((req, res) => {
    // Определяем путь к запрашиваемому файлу
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Получаем расширение файла для MIME-типа
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Читаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Файл не найден — 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 — Файл не найден</h1>', 'utf-8');
            } else {
                // Другая ошибка — 500
                res.writeHead(500);
                res.end(`Ошибка сервера: ${err.code}`, 'utf-8');
            }
        } else {
            // Успех
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Доступно с телефона по IP: http://<ваш_локальный_IP>:${PORT}`);
});