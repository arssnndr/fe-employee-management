#!/bin/bash

# Employee Management Frontend - Docker Deployment Script
# Skrip untuk memudahkan deployment aplikasi dengan Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker tidak terinstall. Silakan install Docker terlebih dahulu."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose tidak terinstall. Silakan install Docker Compose terlebih dahulu."
        exit 1
    fi

    print_success "Docker dan Docker Compose sudah terinstall"
}

# Build and start containers
start_containers() {
    print_info "Building dan starting containers..."
    docker-compose up --build -d

    if [ $? -eq 0 ]; then
        print_success "Containers berhasil dijalankan!"
        print_info "Aplikasi tersedia di: http://localhost:3000/employee-management"
        print_info "Health check: http://localhost:3000/health"
    else
        print_error "Gagal menjalankan containers"
        exit 1
    fi
}

# Stop containers
stop_containers() {
    print_info "Stopping containers..."
    docker-compose down
    print_success "Containers berhasil dihentikan"
}

# Show logs
show_logs() {
    print_info "Menampilkan logs..."
    docker-compose logs -f fe-employee-management
}

# Show container status
show_status() {
    print_info "Status containers:"
    docker-compose ps
}

# Clean up
cleanup() {
    print_warning "Membersihkan containers, networks, dan volumes..."
    read -p "Apakah Anda yakin? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        docker system prune -f
        print_success "Cleanup selesai"
    else
        print_info "Cleanup dibatalkan"
    fi
}

# Rebuild containers
rebuild() {
    print_info "Rebuilding containers..."
    docker-compose down
    docker-compose up --build --force-recreate -d
    print_success "Rebuild selesai"
}

# Health check
health_check() {
    print_info "Melakukan health check..."

    # Wait for container to be ready
    sleep 5

    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        print_success "Health check berhasil - Aplikasi berjalan dengan baik"
    else
        print_error "Health check gagal - Aplikasi mungkin belum siap atau ada masalah"
    fi
}

# Show help
show_help() {
    echo "Employee Management Frontend - Docker Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Build dan jalankan containers"
    echo "  stop      Hentikan containers"
    echo "  restart   Restart containers"
    echo "  rebuild   Rebuild dan restart containers"
    echo "  logs      Tampilkan logs"
    echo "  status    Tampilkan status containers"
    echo "  health    Lakukan health check"
    echo "  cleanup   Bersihkan containers dan volumes"
    echo "  help      Tampilkan help ini"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs"
    echo "  $0 cleanup"
}

# Main script
main() {
    check_docker

    case ${1:-help} in
        start)
            start_containers
            sleep 10
            health_check
            ;;
        stop)
            stop_containers
            ;;
        restart)
            stop_containers
            start_containers
            ;;
        rebuild)
            rebuild
            ;;
        logs)
            show_logs
            ;;
        status)
            show_status
            ;;
        health)
            health_check
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Command tidak dikenal: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
