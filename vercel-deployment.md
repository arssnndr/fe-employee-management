# Vercel Deployment untuk Employee Management Frontend (Subpath)

Dokumentasi untuk deploy aplikasi Angular Employee Management ke Vercel dengan subpath `/employee-management/`.

## 🎯 Solusi Subpath Deployment

Aplikasi ini dikonfigurasi untuk berjalan di subpath `/employee-management/` di Vercel, yang memerlukan penanganan khusus untuk asset routing.

### � Komponen Solusi:

1. **Post-build Script**: `scripts/vercel-postbuild.js`
   - Membuat duplikasi file di `/employee-management/` subdirectory
   - Memperbaiki asset paths di `index.html`
   - Memastikan file tersedia di kedua lokasi (root dan subpath)

2. **Advanced Routing**: `vercel.json`
   - Route `/employee-management/file.js` → `/file.js` (untuk asset di root)
   - Route `/employee-management/*` → `/employee-management/index.html` (untuk Angular routing)
   - Proper MIME type headers untuk JS/CSS files

3. **Build Configuration**:
   - Build dengan `--base-href /employee-management/`
   - Post-processing untuk asset path rewriting

## 🚀 Deployment Steps

### 1. Konfigurasi File

File yang sudah disiapkan untuk Vercel:
- ✅ `vercel.json` - Konfigurasi routing dan build
- ✅ `package.json` - Updated dengan `vercel-build` script

### 2. Deploy via Vercel Dashboard

1. **Login ke Vercel**: https://vercel.com
2. **Import Project**: Klik "New Project"
3. **Connect Repository**: Pilih repository GitHub Anda
4. **Configure Project**:
   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/fe-employee-management/browser`
   - Install Command: `npm install`

### 3. Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

## ⚙️ Konfigurasi Vercel

### `vercel.json` Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/fe-employee-management/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/employee-management$",
      "dest": "/employee-management/"
    },
    {
      "src": "/employee-management/(.*)",
      "dest": "/$1"
    },
    {
      "src": "/(.*\\.(js|css|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))$",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Scripts

- `npm run build` - Build untuk Docker/Nginx (dengan base-href)
- `npm run build:vercel` - Build untuk Vercel (tanpa base-href)
- `npm run vercel-build` - Script yang dijalankan Vercel

## 🌐 URL Structure

Setelah deploy, aplikasi akan tersedia di:
- **Vercel URL**: `https://your-app-name.vercel.app/employee-management/`
- **Custom Domain**: `https://yourdomain.com/employee-management/` (jika menggunakan custom domain)

## 🔧 Troubleshooting

### 1. MIME Type Errors
**Problem**: JavaScript files returning `text/html` instead of `application/javascript`

**Solution**:
- Pastikan `vercel.json` routes sudah benar
- Build menggunakan `vercel-build` script
- Static assets harus accessible di root path

### 2. 404 Errors for Assets
**Problem**: CSS/JS files tidak ditemukan

**Solution**:
```json
// Pastikan route ini ada di vercel.json
{
  "src": "/(.*\\.(js|css|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))$",
  "dest": "/$1"
}
```

### 3. Angular Routing Issues
**Problem**: Refresh page mengembalikan 404

**Solution**:
```json
// Fallback route untuk SPA
{
  "src": "/(.*)",
  "dest": "/index.html"
}
```

### 4. Build Failures
**Problem**: Vercel build gagal

**Solution**:
- Check build logs di Vercel dashboard
- Pastikan semua dependencies ada di `package.json`
- Verify Node.js version compatibility

## 📈 Performance Optimization

### 1. Static Asset Caching
```json
// Di vercel.json headers
{
  "source": "/(.*\\.(js|css|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))$",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

### 2. Security Headers
```json
{
  "source": "/(.*)",
  "headers": [
    {
      "key": "X-Frame-Options",
      "value": "SAMEORIGIN"
    },
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    }
  ]
}
```

## 🔄 CI/CD Integration

Vercel secara otomatis akan:
- Build dan deploy setiap push ke main branch
- Create preview deployments untuk pull requests
- Rollback ke versi sebelumnya jika ada error

## 📱 Environment Variables

Jika aplikasi membutuhkan environment variables:

1. **Via Vercel Dashboard**:
   - Project Settings → Environment Variables
   - Add key-value pairs

2. **Via Vercel CLI**:
   ```bash
   vercel env add API_URL production
   ```

## 🎯 Best Practices

1. **Build Optimization**:
   - Use production build (`--configuration production`)
   - Enable tree shaking
   - Minimize bundle size

2. **Routing**:
   - Test all routes after deployment
   - Verify static assets load correctly
   - Check Angular routing works on refresh

3. **Monitoring**:
   - Check Vercel Analytics
   - Monitor Core Web Vitals
   - Set up error tracking

## 📞 Support

Jika ada masalah:
1. Check Vercel build logs
2. Verify `vercel.json` configuration
3. Test locally dengan `vercel dev`
4. Contact Vercel support untuk masalah platform

---

**Deployment Date**: August 31, 2025  
**Version**: Angular 19.2.0  
**Platform**: Vercel
