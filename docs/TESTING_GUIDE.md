# 🧪 Testing Guide - BNPB Chat Widget

## 📋 Prerequisites Checklist

- [x] Node.js installed
- [x] npm installed
- [x] ngrok installed and configured
- [x] GitHub Pages enabled
- [x] Repository pushed to GitHub

## 🚀 Quick Start Testing

### Step 1: Start Widget Server

```bash
cd /Users/alifndaru/Documents/project/bnpb/bnpb-github-pages/bnpb-chat-github-pages
npm run widget
```

Expected output:
```
Starting up http-server, serving widget
Available on:
  http://127.0.0.1:3333
  http://192.168.x.x:3333
Hit CTRL-C to stop the server
```

### Step 2: Start Ngrok

```bash
ngrok http 3333
```

Expected output:
```
Forwarding  https://99d371c5cf23.ngrok-free.app -> http://localhost:3333
```

**Current ngrok URL:** `https://99d371c5cf23.ngrok-free.app`

### Step 3: Verify Files

✅ Ngrok URL configured in:
- `public/external-website-demo.html` (iframe src)
- `public/assets/js/widget-integration.js` (WIDGET_ORIGIN)

### Step 4: Access GitHub Pages

Wait 2-3 minutes after push for deployment to complete, then access:

1. **Main Page:**
   ```
   https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/
   ```

2. **Demo Page (with widget):**
   ```
   https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/external-website-demo.html
   ```

## 🔍 Testing Checklist

### Browser Testing

1. **Open Demo Page**
   - [ ] Page loads without errors
   - [ ] CSS styles applied correctly
   - [ ] No 404 errors in Network tab

2. **Open Browser Console (F12 or Cmd+Option+I)**
   
   Expected logs:
   ```
   🚀 External website initialized
   📍 Chat widget URL: https://99d371c5cf23.ngrok-free.app/widget-iframe-isolated.html
   🔗 Widget origin: https://99d371c5cf23.ngrok-free.app
   💡 Try: window.BNPBChatWidget.changeLanguage("en")
   🖼️ Chat widget iframe loaded successfully
   📨 Received message from chat widget: {type: "WIDGET_READY", ...}
   ✅ Chat widget ready!
   ```

3. **Visual Check**
   - [ ] Chat widget visible in bottom-right corner
   - [ ] Widget iframe displays correctly
   - [ ] No CORS errors in console

4. **Interaction Testing**
   
   Run in browser console:
   ```javascript
   // Test 1: Change language to English
   window.BNPBChatWidget.changeLanguage("en")
   
   // Test 2: Get current language
   window.BNPBChatWidget.getCurrentLanguage()
   
   // Test 3: Update attributes
   window.BNPBChatWidget.updateAttributes({
       theme: 'light',
       backgroundColor: '#ffffff'
   })
   ```

5. **Test Buttons on Page**
   - [ ] "Bahasa Indonesia" button works
   - [ ] "English" button works
   - [ ] Other interactive elements respond

## 🐛 Troubleshooting

### Issue 1: Page Not Found (404)

**Symptoms:**
```
File not found
The site configured at this address does not contain the requested file.
```

**Solutions:**
1. Check GitHub Actions deployment status
2. Verify GitHub Pages is enabled in Settings > Pages
3. Ensure Source is set to "GitHub Actions"
4. Wait 2-3 minutes after push
5. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Issue 2: Widget Not Loading

**Symptoms:**
- Blank space where widget should be
- Console error: "Failed to load resource"

**Solutions:**
1. Verify ngrok is still running
2. Check ngrok URL hasn't changed
3. Open ngrok URL directly in browser to bypass warning page:
   ```
   https://99d371c5cf23.ngrok-free.app/widget-iframe-isolated.html
   ```
4. Click "Visit Site" on ngrok warning page

### Issue 3: CORS Errors

**Symptoms:**
```
Access to iframe blocked by CORS policy
```

**Solutions:**
1. Ensure widget server started with `--cors` flag:
   ```bash
   npx http-server widget -p 3333 --cors
   ```
2. Verify WIDGET_ORIGIN matches ngrok URL exactly
3. Check browser console for specific CORS error details

### Issue 4: Ngrok 403 Error

**Symptoms:**
- Ngrok warning page appears in iframe
- "You are about to visit" message

**Solutions:**

**Option A: Manual Bypass (Quick Fix)**
1. Open widget URL in new tab
2. Click "Visit Site"
3. Refresh main page

**Option B: Authenticate Ngrok**
```bash
ngrok config add-authtoken YOUR_TOKEN
```

**Option C: Deploy Widget to GitHub Pages**
Update URLs to use GitHub Pages instead of ngrok (see Production Setup below)

## 🎯 Expected Results

### Success Criteria

✅ **GitHub Pages loads successfully**
- Main page shows landing with "Lihat Demo" button
- Demo page displays full website with header, content, footer

✅ **Widget Integration works**
- Widget iframe visible in bottom-right
- Console shows "Chat widget ready!"
- No CORS or security errors

✅ **Cross-origin communication works**
- postMessage events flow between parent and iframe
- Language change commands work
- Widget responds to API calls

✅ **Performance**
- Page loads in < 3 seconds
- Widget loads in < 2 seconds
- No layout shifts or flashing

## 📊 Monitoring

### GitHub Actions

1. Go to: `https://github.com/alifndaru/alifndaru.bnpb-chat-github-pages.github.io/actions`
2. Check latest workflow run
3. Green checkmark = deployed successfully
4. Click on workflow for detailed logs

### Browser DevTools

**Console Tab:**
- Check for errors (red messages)
- Verify initialization logs appear

**Network Tab:**
- Check all resources load (200 status)
- Verify iframe loads from ngrok
- Check for failed requests

**Elements Tab:**
- Inspect iframe element
- Verify src attribute is correct
- Check iframe dimensions

## 🔄 Update Ngrok URL Process

When ngrok restarts and URL changes:

1. **Get new URL from ngrok output**
2. **Update files:**
   ```bash
   # Edit these files with new URL:
   # - public/assets/js/widget-integration.js (line 2: WIDGET_ORIGIN)
   # - public/external-website-demo.html (iframe src)
   ```
3. **Commit and push:**
   ```bash
   git add public/
   git commit -m "Update ngrok URL to https://NEW-URL.ngrok-free.app"
   git push origin main
   ```
4. **Wait for deployment** (check Actions tab)
5. **Test again**

## 🚀 Production Setup (Without Ngrok)

For production deployment without ngrok:

### Option 1: Deploy Widget to Same GitHub Pages

Update `.github/workflows/deploy.yml`:
```yaml
- name: Copy widget to public
  run: |
    cp -r widget public/
```

Update URLs to:
```
https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/widget/widget-iframe-isolated.html
```

### Option 2: Deploy Widget to Separate Domain

1. Deploy widget folder to a production server
2. Update WIDGET_ORIGIN to production URL
3. Configure CORS on widget server

## 📞 Support

If issues persist:
1. Check browser console for errors
2. Review GitHub Actions logs
3. Verify ngrok is accessible
4. Test widget URL directly in browser

## ✅ Final Verification

Run this checklist before considering deployment complete:

- [ ] ngrok running on port 3333
- [ ] Widget server running locally
- [ ] GitHub Pages accessible
- [ ] external-website-demo.html loads
- [ ] Widget iframe appears
- [ ] Console shows "Chat widget ready!"
- [ ] No CORS errors
- [ ] Language toggle works
- [ ] API commands work in console
- [ ] Mobile responsive (test on phone)
- [ ] Works in multiple browsers (Chrome, Firefox, Safari)

---

**Last Updated:** $(date)
**Ngrok URL:** https://99d371c5cf23.ngrok-free.app
**GitHub Pages:** https://alifndaru.github.io/alifndaru.bnpb-chat-github-pages.github.io/
