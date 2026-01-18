#!/bin/bash

# SocialShine GitHub Upload Script
# This script will push the project in 30 meaningful commits

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== SocialShine GitHub Upload Script ===${NC}"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git first."
    exit 1
fi

# Prompt for GitHub repository URL if not already set
if [ -z "$GITHUB_REPO" ]; then
    echo "Enter your GitHub repository URL (e.g., https://github.com/username/SocialShine.git):"
    read GITHUB_REPO
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo -e "${GREEN}Initializing git repository...${NC}"
    git init
fi

# Function to commit with message
commit_files() {
    local message=$1
    shift
    local files=("$@")
    
    for file in "${files[@]}"; do
        if [ -e "$file" ]; then
            git add "$file"
        fi
    done
    
    if git diff --staged --quiet; then
        echo "Nothing to commit for: $message"
    else
        git commit -m "$message"
        echo -e "${GREEN}✓ Committed: $message${NC}"
    fi
}

# Start committing in logical chunks

# Commit 1: Initial project setup
echo -e "\n${BLUE}Commit 1/30${NC}"
commit_files "Initial commit: Add README and project documentation" "README.md"

# Commit 2: Python project configuration
echo -e "\n${BLUE}Commit 2/30${NC}"
commit_files "Setup: Add Python project configuration files" "setup.cfg" "requirements.txt"

# Commit 3: Error handling - invalid input
echo -e "\n${BLUE}Commit 3/30${NC}"
commit_files "Error handling: Add invalid input error handler" "errors/invalid_input_error.py"

# Commit 4: Error handling - runtime error
echo -e "\n${BLUE}Commit 4/30${NC}"
commit_files "Error handling: Add runtime error handler" "errors/runtime_error.py"

# Commit 5: Error handling - value error
echo -e "\n${BLUE}Commit 5/30${NC}"
commit_files "Error handling: Add value error handler" "errors/value_error.py"

# Commit 6: Database service
echo -e "\n${BLUE}Commit 6/30${NC}"
commit_files "Services: Implement database service layer" "services/db_service.py"

# Commit 7: Instagram service
echo -e "\n${BLUE}Commit 7/30${NC}"
commit_files "Services: Add Instagram integration service" "services/instagram_service.py"

# Commit 8: Search service
echo -e "\n${BLUE}Commit 8/30${NC}"
commit_files "Services: Implement search functionality service" "services/search_service.py"

# Commit 9: Main application entry point
echo -e "\n${BLUE}Commit 9/30${NC}"
commit_files "Core: Add main application entry point" "main.py"

# Commit 10: Server implementation
echo -e "\n${BLUE}Commit 10/30${NC}"
commit_files "Core: Implement server logic and API endpoints" "server.py"

# Commit 11: Client implementation
echo -e "\n${BLUE}Commit 11/30${NC}"
commit_files "Core: Add client-side connection handler" "client.py"

# Commit 12: LangFlow configuration
echo -e "\n${BLUE}Commit 12/30${NC}"
commit_files "Integration: Add LangFlow system flow configuration" "langflow/System Flow.json"

# Commit 13: Next.js configuration
echo -e "\n${BLUE}Commit 13/30${NC}"
commit_files "Frontend: Add Next.js configuration" "src/next.config.mjs"

# Commit 14: TypeScript configuration
echo -e "\n${BLUE}Commit 14/30${NC}"
commit_files "Frontend: Setup TypeScript configuration" "src/tsconfig.json"

# Commit 15: Package dependencies
echo -e "\n${BLUE}Commit 15/30${NC}"
commit_files "Frontend: Add npm package dependencies" "src/package.json"

# Commit 16: Tailwind CSS setup
echo -e "\n${BLUE}Commit 16/30${NC}"
commit_files "Styling: Configure Tailwind CSS" "src/tailwind.config.ts" "src/postcss.config.mjs"

# Commit 17: Component configuration
echo -e "\n${BLUE}Commit 17/30${NC}"
commit_files "Frontend: Add component configuration schema" "src/components.json"

# Commit 18: Global styles
echo -e "\n${BLUE}Commit 18/30${NC}"
commit_files "Styling: Add global CSS styles" "src/app/globals.css"

# Commit 19: Root layout
echo -e "\n${BLUE}Commit 19/30${NC}"
commit_files "Frontend: Implement root application layout" "src/app/layout.tsx"

# Commit 20: Homepage
echo -e "\n${BLUE}Commit 20/30${NC}"
commit_files "Frontend: Create homepage component" "src/app/page.tsx"

# Commit 21: Server actions
echo -e "\n${BLUE}Commit 21/30${NC}"
commit_files "Frontend: Add server actions for data fetching" "src/app/actions.ts"

# Commit 22: Chat page
echo -e "\n${BLUE}Commit 22/30${NC}"
commit_files "Feature: Implement chat interface page" "src/app/chat/page.tsx"

# Commit 23: Custom fonts
echo -e "\n${BLUE}Commit 23/30${NC}"
if [ -d "src/app/fonts" ] && [ "$(ls -A src/app/fonts)" ]; then
    commit_files "Assets: Add custom font files" "src/app/fonts/"*
else
    echo "Skipping fonts (directory empty or not found)"
fi

# Commit 24: UI Button component
echo -e "\n${BLUE}Commit 24/30${NC}"
commit_files "UI: Add reusable button component" "src/components/ui/button.tsx"

# Commit 25: UI Input component
echo -e "\n${BLUE}Commit 25/30${NC}"
commit_files "UI: Add input component with validation" "src/components/ui/input.tsx"

# Commit 26: UI Scroll area component
echo -e "\n${BLUE}Commit 26/30${NC}"
commit_files "UI: Implement scroll area component" "src/components/ui/scroll-area.tsx"

# Commit 27: Utility functions
echo -e "\n${BLUE}Commit 27/30${NC}"
commit_files "Utilities: Add helper utility functions" "src/lib/utils.ts"

# Commit 28: Add any remaining files
echo -e "\n${BLUE}Commit 28/30${NC}"
git add .
if git diff --staged --quiet; then
    echo "No additional files to commit"
else
    git commit -m "Chore: Add remaining project files and assets"
    echo -e "${GREEN}✓ Committed: Remaining files${NC}"
fi

# Commit 29: Add .gitignore
echo -e "\n${BLUE}Commit 29/30${NC}"
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
*.egg-info/
.pytest_cache/
.coverage

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/
EOF
    git add .gitignore
    git commit -m "Configuration: Add comprehensive .gitignore file"
    echo -e "${GREEN}✓ Committed: .gitignore${NC}"
else
    echo ".gitignore already exists, skipping"
fi

# Commit 30: Final documentation update
echo -e "\n${BLUE}Commit 30/30${NC}"
if [ -f README.md ]; then
    # Add deployment info to README if not present
    if ! grep -q "Deployment" README.md; then
        echo "" >> README.md
        echo "## Deployment" >> README.md
        echo "" >> README.md
        echo "This project is version controlled and deployed using Git." >> README.md
        echo "Last updated: $(date +%Y-%m-%d)" >> README.md
        git add README.md
        git commit -m "Docs: Update README with deployment information"
        echo -e "${GREEN}✓ Committed: Documentation updates${NC}"
    else
        echo "README already has deployment info"
    fi
fi

# Add remote if not already added
if ! git remote | grep -q origin; then
    echo -e "\n${GREEN}Adding GitHub remote...${NC}"
    git remote add origin "$GITHUB_REPO"
fi

# Ask before pushing
echo -e "\n${BLUE}=== Ready to push to GitHub ===${NC}"
echo "Repository: $GITHUB_REPO"
echo "Total commits: $(git rev-list --count HEAD)"
echo ""
echo "Do you want to push to GitHub now? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "\n${GREEN}Pushing to GitHub...${NC}"
    
    # Try to push to main first, fall back to master
    if git push -u origin main 2>/dev/null; then
        echo -e "${GREEN}✓ Successfully pushed to main branch!${NC}"
    elif git push -u origin master 2>/dev/null; then
        echo -e "${GREEN}✓ Successfully pushed to master branch!${NC}"
    else
        echo -e "\n${BLUE}Renaming branch to main and pushing...${NC}"
        git branch -M main
        git push -u origin main
        echo -e "${GREEN}✓ Successfully pushed to main branch!${NC}"
    fi
    
    echo -e "\n${GREEN}=== Upload Complete! ===${NC}"
    echo "Your project has been successfully pushed to GitHub!"
else
    echo -e "\n${BLUE}Push cancelled. You can push manually later using:${NC}"
    echo "git push -u origin main"
fi

echo -e "\n${GREEN}Script completed successfully!${NC}"
