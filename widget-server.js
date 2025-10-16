const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const WIDGET_DIR = path.join(__dirname, 'widget');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning, User-Agent');
    
    // Add ngrok skip browser warning header
    res.setHeader('ngrok-skip-browser-warning', 'true');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Determine file path
    let urlPath = req.url === '/' ? '/widget-iframe-isolated.html' : req.url;
    
    // Remove query string
    urlPath = urlPath.split('?')[0];
    
    let filePath = path.join(WIDGET_DIR, urlPath);

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            console.error(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
            return;
        }

        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }

            const ext = path.extname(filePath);
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            
            console.log(`✅ Served: ${filePath} (${contentType})`);
        });
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('🚀 BNPB Chat Widget Server');
    console.log('==========================');
    console.log(`📡 Server running at: http://localhost:${PORT}/`);
    console.log(`📂 Serving directory: ${WIDGET_DIR}`);
    console.log(`🔓 CORS enabled: *`);
    console.log(`✨ Ngrok skip header: enabled`);
    console.log('');
    console.log('📝 Available files:');
    console.log(`   - http://localhost:${PORT}/widget-iframe-isolated.html`);
    console.log(`   - http://localhost:${PORT}/css/widget-styles.css`);
    console.log(`   - http://localhost:${PORT}/js/widget-logic.js`);
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Keep this server running');
    console.log('   2. In another terminal, run: ngrok http 3333');
    console.log('   3. Copy ngrok URL and update your demo files');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: Port ${PORT} is already in use`);
        console.error(`   Try: lsof -ti:${PORT} | xargs kill -9`);
    } else {
        console.error(`❌ Server error: ${err.message}`);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('');
    console.log('🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});
