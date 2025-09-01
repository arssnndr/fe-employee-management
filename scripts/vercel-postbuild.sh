#!/bin/bash

# Post-build script untuk Vercel - menangani asset path untuk subpath deployment
echo "🔧 Post-build processing for subpath deployment..."

# Create directory structure for employee-management subpath
mkdir -p dist/fe-employee-management/browser/employee-management

# Copy all files to both root and subpath
echo "📁 Copying files to subpath structure..."
cp -r dist/fe-employee-management/browser/* dist/fe-employee-management/browser/employee-management/

# Update index.html base href to point to correct asset paths
echo "🔄 Updating asset paths in index.html..."
sed -i 's|src="|src="/employee-management/|g' dist/fe-employee-management/browser/employee-management/index.html
sed -i 's|href="|href="/employee-management/|g' dist/fe-employee-management/browser/employee-management/index.html

# Fix base href to maintain routing
sed -i 's|<base href="/employee-management/">|<base href="/employee-management/">|g' dist/fe-employee-management/browser/employee-management/index.html

echo "✅ Post-build processing completed!"
echo "📍 Assets available at both / and /employee-management/ paths"
