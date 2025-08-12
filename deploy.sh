#!/bin/bash

echo "🚀 Building portfolio for deployment..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Portfolio is ready for deployment."
    echo "📁 Build output: dist/"
    echo "🌐 Deploy to: https://eswarsaiportfolio.org"
    echo ""
    echo "Next steps:"
    echo "1. Push changes to GitHub: git push origin main"
    echo "2. Netlify will auto-deploy from your repository"
    echo "3. Your site will be available at: https://eswarsaiportfolio.org"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
