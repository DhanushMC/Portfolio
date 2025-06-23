#!/bin/bash

echo "🚀 Setting up Dhanush M C Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start development server
echo "🎯 Starting development server..."
echo "📍 The website will be available at http://localhost:3000"
echo ""
echo "🎨 To customize the portfolio:"
echo "  - Edit JSON files in src/data/ directory"
echo "  - Replace images in public/assets/ directory"
echo "  - Update personal information in src/data/personal.json"
echo ""
echo "🚀 To deploy to Vercel:"
echo "  1. Push to GitHub"
echo "  2. Connect GitHub repo to Vercel"
echo "  3. Vercel will auto-deploy on every push"
echo ""

npm run dev
