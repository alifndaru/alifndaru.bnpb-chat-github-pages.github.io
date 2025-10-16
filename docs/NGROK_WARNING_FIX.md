# Ngrok Warning Page - Solutions

## Problem
When accessing the widget through ngrok free tier, you see:
```
You are about to visit: 99d371c5cf23.ngrok-free.app
Website IP: 125.165.88.192
This website is served for free through ngrok.com
```

## Solutions

### ✅ Solution 1: Manual Bypass (Quickest - Do This Now!)

1. **Open widget URL in new tab:**
   ```
   https://99d371c5cf23.ngrok-free.app/widget-iframe-isolated.html
   ```

2. **Click "Visit Site" button**

3. **Go back to demo page and refresh:**
   ```
   https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/external-website-demo.html
   ```

4. **Widget should now load without warning!**

The warning only appears once per browser session. After you click "Visit Site", ngrok remembers your browser.

---

### ✅ Solution 2: Add Skip Header (For iframe loading)

Since iframe can't send custom headers easily, we need to modify the widget server to add the skip header.

Update your widget server startup:

```bash
# Instead of: npm run widget
# Use this custom command:
npx http-server widget -p 3333 --cors -P "https://99d371c5cf23.ngrok-free.app" -o
```

Or create a custom server that adds the header. Create `server.js`:

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const WIDGET_DIR = './widget';

const server = http.createServer((req, res) => {
    // Add ngrok skip header
    res.setHeader('ngrok-skip-browser-warning', '69420');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let filePath = path.join(__dirname, WIDGET_DIR, req.url === '/' ? 'widget-iframe-isolated.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
        };

        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Widget server running at http://localhost:${PORT}/`);
    console.log(`With ngrok skip header enabled`);
});
```

Then run:
```bash
node server.js
```

---

### ✅ Solution 3: Use ngrok with Auth Token (Reduces Warning)

1. **Sign up for free ngrok account:** https://dashboard.ngrok.com/signup

2. **Get your auth token:** https://dashboard.ngrok.com/get-started/your-authtoken

3. **Configure ngrok:**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
   ```

4. **Restart ngrok:**
   ```bash
   ngrok http 3333
   ```

This doesn't completely remove the warning for all visitors, but makes it less frequent.

---

### ✅ Solution 4: Deploy Widget to GitHub Pages (Production Solution)

For production, don't use ngrok. Deploy the widget to GitHub Pages as well.

**Update `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Copy widget to public
        run: |
          cp -r widget public/

      - name: List files
        run: |
          echo "Files to deploy:"
          ls -la public/

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './public'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Update widget URLs to:**
```javascript
// In widget-integration.js
const WIDGET_ORIGIN = "https://alifndaru.github.io";

// In external-website-demo.html
<iframe src="https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/widget/widget-iframe-isolated.html"
```

This is the best solution for production!

---

## Quick Comparison

| Solution | Effort | Works For | Best For |
|----------|--------|-----------|----------|
| Manual Bypass | 30 seconds | You only | Quick testing NOW |
| Custom Server | 5 minutes | All visitors | Development team |
| Ngrok Auth | 2 minutes | Reduces frequency | Solo development |
| GitHub Pages | 10 minutes | All visitors | Production use |

---

## Recommended Workflow

**For Testing Now (Use Solution 1):**
1. Open ngrok URL in tab
2. Click "Visit Site"
3. Refresh demo page
4. Test widget

**For Production (Use Solution 4):**
1. Deploy widget to GitHub Pages
2. Update all URLs
3. No more ngrok warnings!

---

## Current Status

- Ngrok URL: `https://99d371c5cf23.ngrok-free.app`
- Demo URL: `https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/external-website-demo.html`

**Action Required:** Choose a solution above and implement it! 🚀
