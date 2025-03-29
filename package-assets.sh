#!/bin/bash
# Script to package assets for distribution

# Create a timestamp for the filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ASSETS_FILENAME="english_learning_app_assets_$TIMESTAMP.zip"

echo "Packaging assets into $ASSETS_FILENAME..."

# Navigate to the project root
cd "$(dirname "$0")"

# Create the assets zip file
zip -r "$ASSETS_FILENAME" LearnEng/src/assets/images/ LearnEng/src/assets/sounds/ -x "*.gitkeep"

echo "Assets packaged successfully!"
echo "File created: $ASSETS_FILENAME"
echo ""
echo "Upload this file to your preferred file sharing service and update the link in README.md" 