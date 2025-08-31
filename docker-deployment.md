# Docker Deployment untuk Employee Management Frontend

File ini berisi konfigurasi Docker untuk menjalankan aplikasi Angular Employee Management menggunakan Nginx.

## Prerequisites

- Docker dan Docker Compose terinstall
- Node.js 18+ (untuk development)

## Struktur File Docker

```
fe-employee-management/
├── Dockerfile              # Multi-stage build untuk Angular + Nginx
├── docker-compose.yml      # Konfigurasi Docker Compose
├── nginx.conf              # Konfigurasi Nginx custom
├── .dockerignore           # File yang diabaikan saat build Docker
└── docker-deployment.md    # Dokumentasi ini
```

## Cara Menjalankan

### 1. Build dan Jalankan dengan Docker Compose

```bash
# Build dan jalankan container
docker-compose up --build

# Atau jalankan di background
docker-compose up -d --build
```

### 2. Akses Aplikasi

Aplikasi akan tersedia di:
- **Local**: http://localhost:3000/employee-management
- **Health Check**: http://localhost:3000/health

### 3. Mengelola Container

```bash
# Melihat status container
docker-compose ps

# Melihat logs
docker-compose logs -f fe-employee-management

# Menghentikan container
docker-compose down

# Menghentikan dan menghapus volumes
docker-compose down -v
```

## Konfigurasi

### Port Configuration
- Container menggunakan port 80 internal
- Dipetakan ke port 3000 pada host
- Dapat diubah di file `docker-compose.yml`

### Nginx Configuration
File `nginx.conf` dikonfigurasi untuk:
- ✅ Gzip compression untuk optimasi
- ✅ Caching untuk static assets
- ✅ Security headers
- ✅ Angular routing support (try_files)
- ✅ Health check endpoint
- ✅ Error handling

### Environment Variables
Dapat menambahkan environment variables di `docker-compose.yml`:
```yaml
environment:
  - NODE_ENV=production
  - API_URL=http://backend-api:8080
```

## Production Deployment

### 1. Build untuk Production
```bash
# Build image dengan tag
docker build -t employee-management-frontend:latest .

# Push ke registry (jika menggunakan registry)
docker tag employee-management-frontend:latest your-registry/employee-management-frontend:latest
docker push your-registry/employee-management-frontend:latest
```

### 2. Environment-specific Configuration
Buat file `docker-compose.prod.yml` untuk production:
```yaml
version: '3.8'
services:
  fe-employee-management:
    image: your-registry/employee-management-frontend:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

### 3. Dengan Reverse Proxy
Jika menggunakan reverse proxy seperti Traefik atau Nginx:
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.frontend.rule=Host(`your-domain.com`)"
  - "traefik.http.services.frontend.loadbalancer.server.port=80"
```

## Troubleshooting

### 1. Container tidak bisa start
```bash
# Check logs
docker-compose logs fe-employee-management

# Check container status
docker-compose ps
```

### 2. Aplikasi tidak bisa diakses
- Pastikan port 3000 tidak digunakan aplikasi lain
- Check firewall settings
- Verify nginx configuration

### 3. Build gagal
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose up --build --force-recreate
```

### 4. Performance Issues
- Increase nginx worker connections di `nginx.conf`
- Optimize Angular build dengan `--optimization=true`
- Enable gzip compression (sudah dikonfigurasi)

## Monitoring

### Health Check
Container dilengkapi health check yang akan:
- Check setiap 30 detik
- Timeout 10 detik
- Retry 3 kali
- Start period 40 detik

### Logs
```bash
# Real-time logs
docker-compose logs -f

# Logs dari waktu tertentu
docker-compose logs --since "2h"
```

## Security Considerations

1. **Security Headers**: Sudah dikonfigurasi di nginx.conf
2. **Port Exposure**: Hanya expose port yang diperlukan
3. **User Permissions**: Container tidak berjalan sebagai root
4. **Static File Serving**: Nginx serving static files secara optimal

## Optimizations

1. **Multi-stage Build**: Menggunakan Node untuk build, Nginx untuk serving
2. **Gzip Compression**: Mengurangi ukuran transfer
3. **Static File Caching**: Cache 1 tahun untuk assets
4. **Image Size**: Menggunakan Alpine images untuk ukuran minimal
